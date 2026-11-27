/**
 * Fonte única do catálogo de serviços.
 *
 * Tudo o que é vendido (Bside, Bside Hot e Linikers) vive aqui, tipado, e é daqui
 * que as páginas públicas tiram o preço que mostram na tela. O painel
 * `/admin/servicos` lê e grava a coleção `servicos` no Firestore, semeada a partir
 * desta lista por `scripts/seed-servicos.mjs` — ou seja: o código define o catálogo
 * de lançamento, o Firestore guarda o que está valendo agora.
 *
 * Regra ao mexer aqui: preço mudou = muda aqui, roda o seed e confere a página.
 * Preço na página que não sai de `SERVICOS` é dívida (volta a divergir em silêncio).
 *
 * Este arquivo tem que continuar puro: sem import de React, sem Firestore, sem
 * `window` — ele é importado pelo cliente, pelo servidor e pelo script de seed.
 */

export type MarcaServico = "bside" | "linikers";

export type CategoriaServico =
  | "sites" // página, landing, loja
  | "sistemas" // sistema com painel, automação
  | "hot" // carteira Bside Hot (fotos, vídeo, página discreta)
  | "consultoria" // análise pontual
  | "software" // produto recorrente (Marketing OS)
  | "conteudo"; // copy, foto, vídeo avulso

export type StatusServico = "ativo" | "inativo" | "rascunho";

export type UnidadeRecorrencia = "mes" | "ano";

/** Como o preço de tabela é cobrado. `unico` = pagamento fechado. */
export type TipoCobranca = "unico" | "mensal" | "anual";

export interface RecorrenciaServico {
  /** Valor cobrado depois do período incluído. */
  valor: number;
  unidade: UnidadeRecorrencia;
  /** A partir de qual mês/ano a recorrência começa (quando não é imediata). */
  aPartirDe?: number;
  /** Texto livre curto para o que muda o valor (mensagens, fotos, suporte). */
  observacao?: string;
}

export interface Servico {
  /** Slug estável — é o id do documento no Firestore e a chave usada nas páginas. */
  id: string;
  marca: MarcaServico;
  categoria: CategoriaServico;
  nome: string;
  /** Uma linha, para tabela do admin e card de catálogo. */
  resumo: string;
  /** Em reais, sem centavos. */
  preco: number;
  /** `true` quando o preço de tabela é piso (mostra "a partir de"). */
  precoAPartirDe: boolean;
  /** `unico` = pagamento fechado; `mensal`/`anual` = o próprio preço é a mensalidade. */
  cobranca: TipoCobranca;
  /** `null` quando o preço de tabela não gera cobrança depois do período incluso. */
  recorrencia: RecorrenciaServico | null;
  /** Rota que vende este serviço (a página pública). */
  pagina: string;
  /** Prazo de entrega combinado, em texto curto. */
  prazo: string;
  status: StatusServico;
  /** Para quem é. */
  publico: string;
  /** O que o cliente recebe, em itens objetivos. */
  entrega: string[];
}

export const SERVICOS: Servico[] = [
  // ─── Bside Digital Studio (/bside) ─────────────────────────────────────────
  {
    id: "bside-pagina-profissional",
    marca: "bside",
    categoria: "sites",
    nome: "Página Profissional",
    resumo: "Uma página no ar, no Google, com botão para o WhatsApp.",
    preco: 397,
    precoAPartirDe: false,
    cobranca: "unico",
    recorrencia: { valor: 39, unidade: "mes", aPartirDe: 13 },
    pagina: "/bside",
    prazo: "3 a 5 dias úteis",
    status: "ativo",
    publico: "Negócio local que precisa existir no Google e receber pedido no WhatsApp.",
    entrega: [
      "1 página no ar com fotos, serviços, horários, endereço e mapa",
      "Botão de WhatsApp fixo na página",
      "Domínio próprio e ficha do Google atualizada",
      "Hospedagem e manutenção do 1º ano inclusas",
    ],
  },
  {
    id: "bside-vitrine-que-vende",
    marca: "bside",
    categoria: "sites",
    nome: "Vitrine que Vende",
    resumo: "Site completo com cardápio digital ou agenda online e 1 ano de manutenção.",
    preco: 997,
    precoAPartirDe: false,
    cobranca: "unico",
    recorrencia: { valor: 49, unidade: "mes", aPartirDe: 13 },
    pagina: "/bside",
    prazo: "5 a 7 dias úteis",
    status: "ativo",
    publico: "Quem já vende e precisa de cardápio digital ou agenda online no próprio site.",
    entrega: [
      "Site completo, até 5 páginas",
      "Cardápio digital OU agendamento online",
      "Ficha do Google otimizada",
      "12 meses de hospedagem e manutenção inclusos",
      "1 rodada de ajustes depois de publicado",
    ],
  },
  {
    id: "bside-operacao-automatica",
    marca: "bside",
    categoria: "sistemas",
    nome: "Operação no Automático",
    resumo: "Sistema com painel, agenda, cardápio e WhatsApp automático num lugar só.",
    preco: 2497,
    precoAPartirDe: true,
    cobranca: "unico",
    recorrencia: {
      valor: 79,
      unidade: "mes",
      aPartirDe: 13,
      observacao: "mensagens automáticas cobradas a preço de custo",
    },
    pagina: "/bside",
    prazo: "Combinado por escrito na proposta",
    status: "ativo",
    publico: "Operação com volume que já perde venda por responder no braço.",
    entrega: [
      "Sistema com painel: clientes, produtos e relatórios",
      "Agendamento, cardápio e automação no WhatsApp oficial",
      "Treinamento de 1 hora",
      "12 meses de manutenção com prioridade",
    ],
  },
  {
    id: "bside-sistema-sob-medida",
    marca: "bside",
    categoria: "sistemas",
    nome: "Sistema sob medida",
    resumo: "Só o sistema, com painel e cadastros, escopo fechado em proposta.",
    preco: 1997,
    precoAPartirDe: true,
    cobranca: "unico",
    recorrencia: null,
    pagina: "/bside",
    prazo: "Escopo fechado em proposta",
    status: "ativo",
    publico: "Quem já tem site e precisa só do sistema que roda a operação.",
    entrega: ["Sistema com painel e cadastros", "Escopo fechado em proposta", "Sem site incluso"],
  },

  // ─── Bside Hot (/bside/hot) — carteira discreta, noindex ───────────────────
  {
    id: "hot-fotos",
    marca: "bside",
    categoria: "hot",
    nome: "Fotos",
    resumo: "1 hora de ensaio no seu local, 20 fotos tratadas.",
    preco: 300,
    precoAPartirDe: false,
    cobranca: "unico",
    recorrencia: null,
    pagina: "/bside/hot",
    prazo: "48 horas",
    status: "ativo",
    publico: "Quem anuncia e ainda usa foto de celular.",
    entrega: [
      "1 hora de ensaio no seu local",
      "20 fotos tratadas, todas na vertical",
      "3 imagens extras para story",
      "Entrega em 48 horas",
    ],
  },
  {
    id: "hot-video",
    marca: "bside",
    categoria: "hot",
    nome: "Vídeo",
    resumo: "4 vídeos curtos verticais prontos para story e anúncio.",
    preco: 300,
    precoAPartirDe: false,
    cobranca: "unico",
    recorrencia: null,
    pagina: "/bside/hot",
    prazo: "48 horas",
    status: "ativo",
    publico: "Quem só tem foto e perde clique para quem tem vídeo.",
    entrega: [
      "4 vídeos curtos de 15 a 30 segundos",
      "Formato vertical, pronto para story e anúncio",
      "6 capas para usar no perfil",
      "Entrega em 48 horas",
    ],
  },
  {
    id: "hot-pagina-anual",
    marca: "bside",
    categoria: "hot",
    nome: "Página anual",
    resumo: "Página só sua, com as fotos que você já tem, no ar por 12 meses.",
    preco: 300,
    precoAPartirDe: false,
    cobranca: "anual",
    recorrencia: null,
    pagina: "/bside/hot",
    prazo: "48 horas",
    status: "ativo",
    publico: "Quem já tem fotos boas e precisa de um lugar único para mandar quem quer ver mais.",
    entrega: [
      "Página só sua, com as fotos que você já tem",
      "Serviços, valores a partir de e bairro",
      "Botão de WhatsApp e link curto",
      "Pode vender conteúdo exclusivo, se quiser",
      "No ar por 12 meses, sem mensalidade",
    ],
  },
  {
    id: "hot-combo-fotos-video",
    marca: "bside",
    categoria: "hot",
    nome: "Fotos + vídeo",
    resumo: "Ensaio e vídeos na mesma visita.",
    preco: 497,
    precoAPartirDe: false,
    cobranca: "unico",
    recorrencia: null,
    pagina: "/bside/hot",
    prazo: "48 horas",
    status: "ativo",
    publico: "Quem precisa de foto e vídeo de uma vez.",
    entrega: ["Tudo do plano de fotos", "Tudo do plano de vídeo", "Gravado na mesma visita", "Entrega em 48 horas"],
  },
  {
    id: "hot-completo",
    marca: "bside",
    categoria: "hot",
    nome: "Completo",
    resumo: "Ensaio, 4 vídeos e página no ar com 1 ano incluído.",
    preco: 999,
    precoAPartirDe: false,
    cobranca: "unico",
    recorrencia: null,
    pagina: "/bside/hot",
    prazo: "48 horas para foto e vídeo",
    status: "ativo",
    publico: "Quem está montando a presença inteira do zero.",
    entrega: [
      "Ensaio com 20 fotos tratadas",
      "4 vídeos verticais com capas",
      "Página no ar com link curto e QR",
      "Área de conteúdo exclusivo opcional",
      "1 ano de página incluído",
    ],
  },
  {
    id: "hot-manutencao",
    marca: "bside",
    categoria: "hot",
    nome: "Manutenção",
    resumo: "Hospedagem, domínio, 10 fotos novas por mês e ajustes.",
    preco: 49,
    precoAPartirDe: false,
    cobranca: "mensal",
    recorrencia: null,
    pagina: "/bside/hot",
    prazo: "Contínuo, sem fidelidade",
    status: "ativo",
    publico: "Quem já tem página e quer manter com foto nova todo mês.",
    entrega: [
      "Hospedagem e domínio da página",
      "10 fotos novas por mês",
      "Ajustes de texto e de valores",
      "Cancele quando quiser",
    ],
  },

  // ─── Linikers (/criacao-de-sites, /consultoria-ia, /marketing-os) ──────────
  {
    id: "sites-landing-page",
    marca: "linikers",
    categoria: "sites",
    nome: "Landing page",
    resumo: "Página única de oferta, Next.js, feita para converter.",
    preco: 499,
    precoAPartirDe: true,
    cobranca: "unico",
    recorrencia: null,
    pagina: "/criacao-de-sites",
    prazo: "Orçamento em 24h",
    status: "ativo",
    publico: "Produto ou serviço único que precisa de uma página de venda direta.",
    entrega: ["Página única de oferta", "Next.js, responsiva", "SEO técnico básico", "Publicação inclusa"],
  },
  {
    id: "sites-loja-virtual",
    marca: "linikers",
    categoria: "sites",
    nome: "Loja virtual",
    resumo: "E-commerce completo com catálogo, checkout e painel.",
    preco: 1999,
    precoAPartirDe: true,
    cobranca: "unico",
    recorrencia: null,
    pagina: "/criacao-de-sites",
    prazo: "Orçamento em 24h",
    status: "ativo",
    publico: "Quem vai vender produto próprio sem depender de marketplace.",
    entrega: [
      "Catálogo com variações",
      "Checkout com PIX",
      "Painel de pedidos",
      "Integração de frete",
      "Hospedagem de R$ 20 a R$ 40/mês, sem mensalidade de plataforma",
    ],
  },
  {
    id: "consultoria-ia-precificacao",
    marca: "linikers",
    categoria: "consultoria",
    nome: "Consultoria de precificação com IA",
    resumo: "Análise de mercado, concorrência e custos para definir o preço.",
    preco: 97,
    precoAPartirDe: false,
    cobranca: "unico",
    recorrencia: null,
    pagina: "/consultoria-ia",
    prazo: "Entrega em até 72h",
    status: "ativo",
    publico: "Quem vende e não sabe se o preço cobre o custo.",
    entrega: ["Análise de mercado e concorrência", "Leitura de custos e margem", "Faixa de preço recomendada"],
  },
  {
    id: "marketing-os-essential",
    marca: "linikers",
    categoria: "software",
    nome: "Marketing OS Essential",
    resumo: "Base de conteúdo e automação para começar.",
    preco: 97,
    precoAPartirDe: false,
    cobranca: "mensal",
    recorrencia: null,
    pagina: "/marketing-os",
    prazo: "Ativação no mesmo dia",
    status: "ativo",
    publico: "Negócio pequeno que publica sem processo.",
    entrega: ["Planejamento de conteúdo", "Geração de copy com IA", "Painel de acompanhamento"],
  },
  {
    id: "marketing-os-pro",
    marca: "linikers",
    categoria: "software",
    nome: "Marketing OS Pro",
    resumo: "Agentes de IA e integração com o WhatsApp.",
    preco: 197,
    precoAPartirDe: false,
    cobranca: "mensal",
    recorrencia: null,
    pagina: "/marketing-os",
    prazo: "Ativação no mesmo dia",
    status: "ativo",
    publico: "Operação que já responde lead todo dia.",
    entrega: ["Tudo do Essential", "Agentes de IA por canal", "Integração com WhatsApp"],
  },
  {
    id: "marketing-os-enterprise",
    marca: "linikers",
    categoria: "software",
    nome: "Marketing OS Enterprise",
    resumo: "Análise de dados, previsão de demanda e multi-marca.",
    preco: 497,
    precoAPartirDe: false,
    cobranca: "mensal",
    recorrencia: null,
    pagina: "/marketing-os",
    prazo: "Implantação combinada",
    status: "ativo",
    publico: "Operação com mais de uma marca ou unidade.",
    entrega: ["Tudo do Pro", "Análise e previsão de dados", "Multi-marca e permissões"],
  },
];

/** Índice por id, para leitura direta em páginas e APIs. */
export const SERVICOS_POR_ID: Record<string, Servico> = SERVICOS.reduce(
  (acc, s) => {
    acc[s.id] = s;
    return acc;
  },
  {} as Record<string, Servico>,
);

/** Serviço por id. Erro explícito em vez de `undefined` silencioso na página. */
export function servico(id: string): Servico {
  const encontrado = SERVICOS_POR_ID[id];
  if (!encontrado) throw new Error(`Serviço "${id}" não existe em src/data/servicos.ts`);
  return encontrado;
}

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** 2497 → "R$ 2.497" */
export function formatarPreco(valor: number): string {
  return moeda.format(valor);
}

/** Preço de tabela já com o "a partir de" quando é piso. */
export function textoPreco(s: Pick<Servico, "preco" | "precoAPartirDe">): string {
  const valor = formatarPreco(s.preco);
  return s.precoAPartirDe ? `a partir de ${valor}` : valor;
}

/** Preço com a unidade de cobrança: "R$ 97/mês", "R$ 300/ano". */
export function textoPrecoComUnidade(s: Pick<Servico, "preco" | "precoAPartirDe" | "cobranca">): string {
  const base = textoPreco(s);
  if (s.cobranca === "mensal") return `${base}/mês`;
  if (s.cobranca === "anual") return `${base}/ano`;
  return base;
}

/** Preço do serviço pelo id, pronto para a tela ("a partir de R$ 2.497"). */
export function precoDe(id: string): string {
  return textoPreco(servico(id));
}

/** Valor sem prefixo pelo id ("R$ 397"). */
export function valorDe(id: string): string {
  return formatarPreco(servico(id).preco);
}

/** "Do 13º mês: R$ 39/mês" — ou null quando não há recorrência. */
export function textoRecorrencia(rec: RecorrenciaServico | null): string | null {
  if (!rec) return null;
  const unidade = rec.unidade === "mes" ? "mês" : "ano";
  const inicio = rec.aPartirDe ? `Do ${rec.aPartirDe}º ${unidade}: ` : "";
  const obs = rec.observacao ? ` ${rec.observacao.charAt(0).toUpperCase()}${rec.observacao.slice(1)}.` : "";
  return `${inicio}${formatarPreco(rec.valor)}/${unidade}.${obs}`;
}

export const MARCAS: { valor: MarcaServico; rotulo: string }[] = [
  { valor: "bside", rotulo: "Bside" },
  { valor: "linikers", rotulo: "Linikers" },
];

export const CATEGORIAS: { valor: CategoriaServico; rotulo: string }[] = [
  { valor: "sites", rotulo: "Sites" },
  { valor: "sistemas", rotulo: "Sistemas" },
  { valor: "hot", rotulo: "Hot" },
  { valor: "consultoria", rotulo: "Consultoria" },
  { valor: "software", rotulo: "Software" },
  { valor: "conteudo", rotulo: "Conteúdo" },
];

export const STATUS_SERVICO: { valor: StatusServico; rotulo: string }[] = [
  { valor: "ativo", rotulo: "Ativo" },
  { valor: "inativo", rotulo: "Inativo" },
  { valor: "rascunho", rotulo: "Rascunho" },
];
