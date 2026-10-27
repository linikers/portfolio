/**
 * Medição de eventos de navegação (GA4).
 *
 * Por que existe: o site inteiro só tinha a tag do Google Ads (conversão de clique no
 * WhatsApp). Isso responde "quantos cliques viraram contato", mas não responde a
 * pergunta do começo do funil: quantas pessoas chegaram, de onde, e em qual página
 * clicaram no WhatsApp. Sem isso não existe tráfego orgânico medido — só impressão.
 *
 * Como ligar: definir `NEXT_PUBLIC_GA_ID` (ex.: `G-XXXXXXX`) no build. Sem a variável,
 * todos os eventos viram no-op silencioso e nada quebra.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

type Parametros = Record<string, string | number | boolean | undefined>;

/** Existe GA4 configurado e a tag carregada nesta página? */
export function ga4Ativo(): boolean {
  if (!GA_ID || typeof window === "undefined") return false;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  return typeof w.gtag === "function";
}

/** Dispara um evento no GA4. Silencioso quando não há tag. */
export function evento(nome: string, parametros: Parametros = {}): boolean {
  if (!ga4Ativo()) return false;
  const w = window as unknown as { gtag: (...args: unknown[]) => void };
  w.gtag("event", nome, parametros);
  return true;
}

/**
 * Listener global de clique no WhatsApp para as rotas da Bside.
 *
 * A família /bside tem número próprio e fica fora de `instalarConversaoWhatsApp`
 * (que faz o roteamento do portfólio). Aqui só medimos: o clique segue o fluxo
 * normal do navegador e abre o wa.me certo. O nome do evento leva o caminho da
 * página, que é o que permite comparar /bside com as páginas de serviço.
 */
export function instalarCliqueWhatsAppBside(): () => void {
  if (typeof document === "undefined") return () => {};
  const aoClicar = (ev: MouseEvent) => {
    const alvo = ev.target as HTMLElement | null;
    const link = alvo?.closest?.('a[href*="wa.me/"]') as HTMLAnchorElement | null;
    if (!link) return;
    evento("clique_whatsapp", {
      pagina: window.location.pathname,
      destino: link.href,
      local: (link.dataset.local || link.className || "").slice(0, 60),
    });
  };
  document.addEventListener("click", aoClicar, true);
  return () => document.removeEventListener("click", aoClicar, true);
}
