// src/lib/visao.ts
/**
 * Agregação do painel /admin/visao (uso exclusivo do servidor).
 *
 * Fonte única: coleção `eventos` (gravada por POST /api/track) e coleção
 * `servicos` (catálogo do painel). Nada é estimado: cada número sai de uma
 * contagem dos documentos. Quando não há documento, o campo vem zero e o painel
 * mostra "sem dados" — nunca um número inventado.
 *
 * O período máximo de leitura é 90 dias (retenção). As colunas de 7 e 30 dias
 * do bloco de páginas são calculadas sempre, independentes do filtro escolhido.
 */
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { CATEGORIAS, MARCAS, type Servico } from "@/data/servicos";
import { ROTAS, type RotaSite, type TipoRota } from "@/data/rotas";

export const COLECAO_EVENTOS = "eventos";
export const COLECAO_SERVICOS = "servicos";
export const RETENCAO_DIAS = 90;

export const DIAS_PERMITIDOS = [7, 30, 90] as const;
export type Dias = (typeof DIAS_PERMITIDOS)[number];

export function diasValidos(valor: unknown): Dias {
  const n = Number(valor);
  return (DIAS_PERMITIDOS as readonly number[]).includes(n) ? (n as Dias) : 30;
}

const DIA_MS = 24 * 60 * 60 * 1000;
/** Teto de documentos por consulta: acima disso o painel avisa que truncou. */
const TETO_EVENTOS = 50000;

export interface LinhaPagina {
  path: string;
  rotulo: string;
  tipo: TipoRota | "nao_catalogada";
  indexavel: boolean | null;
  visitas: number;
  cliques: number;
  taxaClique: number | null;
  visitas7: number;
  visitas30: number;
}

export interface LinhaOrigem {
  source: string;
  medium: string;
  campaign: string;
  visitas: number;
  sessoes: number;
  cliques: number;
  taxaClique: number | null;
}

export interface LinhaReferrer {
  referrer: string;
  visitas: number;
}

export interface LinhaLanding {
  path: string;
  rotulo: string;
  /** Sessões cuja primeira página foi esta (contagem por sessão, não por pageview). */
  sessoes: number;
}

export interface LinhaSerie {
  dia: string;
  visitas: number;
  cliques: number;
}

export interface LinhaServicoGrupo {
  chave: string;
  rotulo: string;
  quantidade: number;
  ticketMedio: number | null;
}

export interface BlocoServicos {
  /** Origem do número: Firestore é o único aceito; "indisponivel" = sem leitura. */
  fonte: "firestore" | "indisponivel";
  total: number;
  ativos: number;
  ticketMedio: number | null;
  porCategoria: LinhaServicoGrupo[];
  porMarca: LinhaServicoGrupo[];
}

export interface Visao {
  periodo: { dias: Dias; de: string; ate: string };
  geradoEm: string;
  /** true quando nenhum evento caiu no período: o painel mostra vazio explícito. */
  vazio: boolean;
  truncado: boolean;
  resumo: {
    visitas: number;
    cliques: number;
    sessoes: number;
    taxaClique: number | null;
  };
  servicos: BlocoServicos;
  paginas: LinhaPagina[];
  origem: {
    fontes: LinhaOrigem[];
    referrers: LinhaReferrer[];
    landings: LinhaLanding[];
  };
  serie: LinhaSerie[];
}

interface DocumentoEvento {
  tipo?: string;
  path?: string;
  sessao?: string;
  data?: string;
  origem?: {
    source?: string;
    medium?: string;
    campaign?: string;
    referrer?: string;
    landing?: string;
  };
}

/** Rota do inventário que corresponde ao caminho visto (suporta `[id]`). */
function rotaPara(path: string): RotaSite | undefined {
  const exata = ROTAS.find((r) => r.path === path);
  if (exata) return exata;
  const dinamicas = ROTAS.filter((r) => r.path.includes("["));
  for (const rota of dinamicas) {
    const padrao = new RegExp(
      "^" +
        rota.path
          .split("/")
          .map((parte) => (parte.startsWith("[") ? "[^/]+" : parte.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
          .join("/") +
        "$",
    );
    if (padrao.test(path)) return rota;
  }
  return undefined;
}

function media(valores: number[]): number | null {
  if (!valores.length) return null;
  return Math.round(valores.reduce((soma, v) => soma + v, 0) / valores.length);
}

function taxa(cliques: number, visitas: number): number | null {
  if (!visitas) return null;
  return Math.round((cliques / visitas) * 10000) / 10000;
}

/** Lê o catálogo e calcula o bloco de serviços. */
async function carregarServicos(): Promise<BlocoServicos> {
  let servicos: Servico[] = [];
  try {
    const snap = await getAdminFirestore().collection(COLECAO_SERVICOS).get();
    servicos = snap.docs.map((doc) => doc.data() as Servico);
  } catch (erro) {
    console.error("visao/servicos", erro instanceof Error ? erro.message : erro);
    return {
      fonte: "indisponivel",
      total: 0,
      ativos: 0,
      ticketMedio: null,
      porCategoria: [],
      porMarca: [],
    };
  }

  const ativos = servicos.filter((s) => s.status === "ativo");
  const porCategoria = CATEGORIAS.map((c) => {
    const doGrupo = servicos.filter((s) => s.categoria === c.valor);
    const ativosDoGrupo = doGrupo.filter((s) => s.status === "ativo").map((s) => Number(s.preco) || 0);
    return {
      chave: c.valor,
      rotulo: c.rotulo,
      quantidade: doGrupo.length,
      ticketMedio: media(ativosDoGrupo),
    };
  }).filter((linha) => linha.quantidade > 0);

  const porMarca = MARCAS.map((m) => {
    const doGrupo = servicos.filter((s) => s.marca === m.valor);
    const ativosDoGrupo = doGrupo.filter((s) => s.status === "ativo").map((s) => Number(s.preco) || 0);
    return {
      chave: m.valor,
      rotulo: m.rotulo,
      quantidade: doGrupo.length,
      ticketMedio: media(ativosDoGrupo),
    };
  }).filter((linha) => linha.quantidade > 0);

  return {
    fonte: "firestore",
    total: servicos.length,
    ativos: ativos.length,
    ticketMedio: media(ativos.map((s) => Number(s.preco) || 0)),
    porCategoria,
    porMarca,
  };
}

export async function carregarVisao(dias: Dias): Promise<Visao> {
  const agora = new Date();
  const inicioPeriodo = new Date(agora.getTime() - dias * DIA_MS);
  // Sempre busca 30 dias (colunas fixas do bloco de páginas) e no máximo 90.
  const janela = Math.min(RETENCAO_DIAS, Math.max(dias, 30));
  const inicioJanela = new Date(agora.getTime() - janela * DIA_MS);

  const snap = await getAdminFirestore()
    .collection(COLECAO_EVENTOS)
    .where("data", ">=", inicioJanela.toISOString())
    .limit(TETO_EVENTOS)
    .get();

  const documentos = snap.docs.map((doc) => doc.data() as DocumentoEvento);
  const truncado = documentos.length >= TETO_EVENTOS;

  const seteDias = agora.getTime() - 7 * DIA_MS;
  const inicioMs = inicioPeriodo.getTime();

  let visitas = 0;
  let cliques = 0;
  const sessoes = new Set<string>();

  const porPagina = new Map<
    string,
    { visitas: number; cliques: number; visitas7: number; visitas30: number }
  >();
  const porFonte = new Map<string, { source: string; medium: string; campaign: string; visitas: number; cliques: number; sessoes: Set<string> }>();
  const porReferrer = new Map<string, number>();
  const porLanding = new Map<string, Set<string>>();
  const porDia = new Map<string, { visitas: number; cliques: number }>();

  for (const evento of documentos) {
    const quando = Date.parse(evento.data || "");
    if (!Number.isFinite(quando)) continue;
    const dentroPeriodo = quando >= inicioMs;
    const path = (evento.path || "").slice(0, 200);
    if (!path) continue;
    const tipo = evento.tipo === "clique_whatsapp" ? "clique_whatsapp" : "pageview";

    const pagina = porPagina.get(path) || { visitas: 0, cliques: 0, visitas7: 0, visitas30: 0 };
    if (tipo === "pageview") {
      if (quando >= seteDias) pagina.visitas7 += 1;
      pagina.visitas30 += 1;
    }
    if (dentroPeriodo) {
      if (tipo === "pageview") pagina.visitas += 1;
      else pagina.cliques += 1;
    }
    porPagina.set(path, pagina);

    if (!dentroPeriodo) continue;

    if (tipo === "clique_whatsapp") cliques += 1;
    else visitas += 1;
    if (evento.sessao) sessoes.add(evento.sessao);

    const dia = (evento.data || "").slice(0, 10);
    const linhaDia = porDia.get(dia) || { visitas: 0, cliques: 0 };
    if (tipo === "pageview") linhaDia.visitas += 1;
    else linhaDia.cliques += 1;
    porDia.set(dia, linhaDia);

    const origem = evento.origem || {};
    const source = (origem.source || "").slice(0, 80);
    const medium = (origem.medium || "").slice(0, 80);
    const campaign = (origem.campaign || "").slice(0, 80);
    const chave = `${source}|${medium}|${campaign}`;
    const fonte = porFonte.get(chave) || { source, medium, campaign, visitas: 0, cliques: 0, sessoes: new Set<string>() };
    if (tipo === "pageview") fonte.visitas += 1;
    else fonte.cliques += 1;
    if (evento.sessao) fonte.sessoes.add(evento.sessao);
    porFonte.set(chave, fonte);

    const referrer = (origem.referrer || "").slice(0, 100);
    porReferrer.set(referrer, (porReferrer.get(referrer) || 0) + (tipo === "pageview" ? 1 : 0));

    const landing = (origem.landing || "").slice(0, 200);
    if (tipo === "pageview" && landing) {
      const sessoesDaPagina = porLanding.get(landing) || new Set<string>();
      if (evento.sessao) sessoesDaPagina.add(evento.sessao);
      porLanding.set(landing, sessoesDaPagina);
    }
  }

  // Inventário completo (inclusive rotas com zero) + caminhos fora do inventário.
  const paginas: LinhaPagina[] = [];
  const vistas = new Set<string>();
  for (const rota of ROTAS) {
    if (rota.path.includes("[")) continue; // dinâmicas entram pelas visitas reais abaixo
    const dados = porPagina.get(rota.path);
    const visitasDaRota = dados?.visitas || 0;
    const cliquesDaRota = dados?.cliques || 0;
    paginas.push({
      path: rota.path,
      rotulo: rota.rotulo,
      tipo: rota.tipo,
      indexavel: rota.indexavel,
      visitas: visitasDaRota,
      cliques: cliquesDaRota,
      taxaClique: taxa(cliquesDaRota, visitasDaRota),
      visitas7: dados?.visitas7 || 0,
      visitas30: dados?.visitas30 || 0,
    });
    vistas.add(rota.path);
  }

  porPagina.forEach((dados, path) => {
    if (vistas.has(path) || !path) return;
    const rota = rotaPara(path);
    paginas.push({
      path,
      rotulo: rota?.rotulo || "Fora do inventário",
      tipo: rota?.tipo || "nao_catalogada",
      indexavel: rota ? rota.indexavel : null,
      visitas: dados.visitas,
      cliques: dados.cliques,
      taxaClique: taxa(dados.cliques, dados.visitas),
      visitas7: dados.visitas7,
      visitas30: dados.visitas30,
    });
  });
  paginas.sort((a, b) => b.visitas30 - a.visitas30 || b.visitas - a.visitas || a.path.localeCompare(b.path));

  const fontes: LinhaOrigem[] = Array.from(porFonte.values())
    .map((f) => ({
      source: f.source,
      medium: f.medium,
      campaign: f.campaign,
      visitas: f.visitas,
      sessoes: f.sessoes.size,
      cliques: f.cliques,
      taxaClique: taxa(f.cliques, f.visitas),
    }))
    .sort((a, b) => b.visitas - a.visitas || b.cliques - a.cliques);

  const referrers: LinhaReferrer[] = Array.from(porReferrer.entries())
    .map(([referrer, visitasDoRef]) => ({ referrer, visitas: visitasDoRef }))
    .filter((linha) => linha.visitas > 0)
    .sort((a, b) => b.visitas - a.visitas);

  const landings: LinhaLanding[] = Array.from(porLanding.entries())
    .map(([path, sessoesDaPagina]) => ({
      path,
      rotulo: rotaPara(path)?.rotulo || "Fora do inventário",
      sessoes: sessoesDaPagina.size,
    }))
    .sort((a, b) => b.sessoes - a.sessoes);

  const serie: LinhaSerie[] = Array.from(porDia.entries())
    .map(([dia, dados]) => ({ dia, visitas: dados.visitas, cliques: dados.cliques }))
    .sort((a, b) => a.dia.localeCompare(b.dia));

  const servicos = await carregarServicos();

  return {
    periodo: {
      dias,
      de: inicioPeriodo.toISOString(),
      ate: agora.toISOString(),
    },
    geradoEm: agora.toISOString(),
    vazio: visitas === 0 && cliques === 0,
    truncado,
    resumo: {
      visitas,
      cliques,
      sessoes: sessoes.size,
      taxaClique: taxa(cliques, visitas),
    },
    servicos,
    paginas,
    origem: { fontes, referrers, landings },
    serie,
  };
}
