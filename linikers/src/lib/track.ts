/**
 * Tracking first-party do site.
 *
 * Por que existe: o GA4 (src/lib/analytics.ts) só entrega número depois de
 * processado, some com bloqueador de anúncio e não responde "qual página trouxe
 * o clique no WhatsApp" com dado bruto. Aqui a medição é nossa: cada pageview e
 * cada clique no WhatsApp é enviado para `POST /api/track`, que grava na
 * coleção `eventos` do Firestore (ver docs/eventos.md).
 *
 * Regras que este arquivo garante:
 * - Sem PII: não envia nome, telefone, e-mail, IP nem texto digitado. O que sai
 *   é caminho, origem (UTM/referrer) e um id de sessão anônimo.
 * - Sessão anônima: id aleatório em localStorage, expira depois de 30 min sem
 *   atividade (mesma ideia de sessão do GA).
 * - First-touch: a origem é gravada na primeira visita; quando essa primeira
 *   visita é direta (sem UTM), a primeira visita COM UTM toma o lugar — assim
 *   quem chega por anúncio não fica marcado como "direto" para sempre.
 * - Silencioso: qualquer erro de rede/localStorage não pode quebrar a página.
 */

export interface OrigemSessao {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  /** Hostname de fora do site (ex.: google.com). Vazio = sem referrer externo. */
  referrer: string;
  /** Primeira página vista na sessão. */
  landing: string;
  /** Quando a origem foi capturada (ISO). */
  em: string;
}

export interface CorpoEvento {
  tipo: "pageview" | "clique_whatsapp";
  path: string;
  sessao: string;
  /** Sessão criada neste evento? */
  nova: boolean;
  origem: OrigemSessao;
  /** UTM do acesso atual (pode ser vazio mesmo com origem preenchida). */
  utm: {
    source: string;
    medium: string;
    campaign: string;
    term: string;
    content: string;
  };
  /** Só em clique_whatsapp: onde no layout o botão estava. */
  local?: string;
}

const ENDPOINT = "/api/track";
const CHAVE_SESSAO = "lk_sessao_v1";
const CHAVE_ORIGEM = "lk_origem_v1";
/** Sessão parada por 30 min vira sessão nova na próxima interação. */
const SESSAO_MS = 30 * 60 * 1000;

/** Rotas que não são navegação de visitante e não devem virar pageview. */
const IGNORAR = [/^\/admin(\/|$)/, /^\/api(\/|$)/, /^\/_next\//, /^\/ir(\/|$)/];

const VAZIO = { source: "", medium: "", campaign: "", term: "", content: "" };

function ignorar(path: string): boolean {
  return !path || IGNORAR.some((re) => re.test(path));
}

function podeMedir(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function novoId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    /* cai no fallback */
  }
  const hex = () => Math.floor(Math.random() * 0x100000000).toString(16).padStart(8, "0");
  return `${hex()}${hex()}-${hex()}-${hex()}`;
}

function texto(valor: string | null, limite = 120): string {
  return (valor || "").trim().slice(0, limite);
}

/** UTMs do endereço atual, já normalizadas. */
export function lerUtm(search = typeof window !== "undefined" ? window.location.search : "") {
  const p = new URLSearchParams(search);
  return {
    source: texto(p.get("utm_source"), 80),
    medium: texto(p.get("utm_medium"), 80),
    campaign: texto(p.get("utm_campaign"), 80),
    term: texto(p.get("utm_term"), 80),
    content: texto(p.get("utm_content"), 80),
  };
}

/** Referrer externo reduzido ao host — sem caminho nem parâmetro (evita PII). */
function referrerExterno(): string {
  const bruto = document.referrer;
  if (!bruto) return "";
  try {
    const url = new URL(bruto);
    if (!url.hostname || url.hostname === window.location.hostname) return "";
    return texto(url.hostname, 100);
  } catch {
    return "";
  }
}

function lerSessao(): { id: string; nova: boolean } {
  const agora = Date.now();
  try {
    const bruto = localStorage.getItem(CHAVE_SESSAO);
    if (bruto) {
      const salvo = JSON.parse(bruto) as { id?: unknown; ts?: unknown };
      if (
        typeof salvo?.id === "string" &&
        salvo.id.length >= 8 &&
        typeof salvo.ts === "number" &&
        agora - salvo.ts < SESSAO_MS
      ) {
        localStorage.setItem(CHAVE_SESSAO, JSON.stringify({ id: salvo.id, ts: agora }));
        return { id: salvo.id, nova: false };
      }
    }
    const id = novoId();
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify({ id, ts: agora }));
    return { id, nova: true };
  } catch {
    // localStorage bloqueado (modo privado/iframe): sessão efêmera por evento.
    return { id: novoId(), nova: true };
  }
}

function lerOrigem(utm: ReturnType<typeof lerUtm>): OrigemSessao {
  const atual: OrigemSessao = {
    ...utm,
    referrer: referrerExterno(),
    landing: window.location.pathname,
    em: new Date().toISOString(),
  };
  try {
    const bruto = localStorage.getItem(CHAVE_ORIGEM);
    if (bruto) {
      const salvo = JSON.parse(bruto) as Partial<OrigemSessao>;
      const temUtm = Boolean(salvo?.source || salvo?.medium || salvo?.campaign);
      const atualTemUtm = Boolean(utm.source || utm.medium || utm.campaign);
      // First-touch: mantém a origem salva — exceto quando ela é direta e agora
      // chegou uma visita identificada (upgrade de direto para campanha).
      if (temUtm || !atualTemUtm) {
        return { ...VAZIO, ...salvo } as OrigemSessao;
      }
    }
    localStorage.setItem(CHAVE_ORIGEM, JSON.stringify(atual));
  } catch {
    /* sem localStorage: usa a origem do acesso atual */
  }
  return atual;
}

function enviar(corpo: CorpoEvento): void {
  const json = JSON.stringify(corpo);
  try {
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
      keepalive: true,
      credentials: "same-origin",
      cache: "no-store",
    }).catch(() => {});
  } catch {
    try {
      navigator.sendBeacon(ENDPOINT, new Blob([json], { type: "application/json" }));
    } catch {
      /* medição nunca quebra a página */
    }
  }
}

/** Registra uma visita. Sem UTM, a origem continua sendo a do first-touch. */
export function registrarPageview(path: string = window.location.pathname): boolean {
  if (!podeMedir()) return false;
  const caminho = texto(path.split("?")[0], 200);
  if (ignorar(caminho)) return false;
  const utm = lerUtm();
  const sessao = lerSessao();
  enviar({
    tipo: "pageview",
    path: caminho,
    sessao: sessao.id,
    nova: sessao.nova,
    origem: lerOrigem(utm),
    utm,
  });
  return true;
}

/** Registra um clique em link do WhatsApp (qualquer rota, inclusive /bside). */
export function registrarCliqueWhatsapp(link?: HTMLAnchorElement | null): boolean {
  if (!podeMedir()) return false;
  const caminho = texto(window.location.pathname.split("?")[0], 200);
  if (ignorar(caminho)) return false;
  const utm = lerUtm();
  const sessao = lerSessao();
  const rotulo =
    link?.dataset?.local ||
    link?.getAttribute("aria-label") ||
    (link?.textContent || "").trim().slice(0, 40);
  enviar({
    tipo: "clique_whatsapp",
    path: caminho,
    sessao: sessao.id,
    nova: false,
    origem: lerOrigem(utm),
    utm,
    local: texto(rotulo, 60),
  });
  return true;
}

/**
 * Listener global de clique no WhatsApp.
 *
 * Fica em fase de captura para ver o clique antes do `preventDefault` da
 * conversão do Google Ads (src/lib/conversaoWhatsapp.ts) e cobre /bside também,
 * que tem número próprio e antes só media GA4.
 */
export function instalarTrackingWhatsapp(): () => void {
  if (typeof document === "undefined") return () => {};
  const aoClicar = (ev: MouseEvent) => {
    const alvo = ev.target as HTMLElement | null;
    const link = alvo?.closest?.('a[href*="wa.me/"]') as HTMLAnchorElement | null;
    if (!link) return;
    registrarCliqueWhatsapp(link);
  };
  document.addEventListener("click", aoClicar, true);
  return () => document.removeEventListener("click", aoClicar, true);
}
