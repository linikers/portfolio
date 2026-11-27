/**
 * Inventário das rotas do site para o painel /admin/visao.
 *
 * Por que um arquivo e não leitura de src/pages em runtime: o build empacota só o
 * que é importado, então varrer o diretório no servidor da Vercel devolve vazio.
 * Este é o mapa explícito — a regra é: rota nova em src/pages entra aqui.
 *
 * - `tipo`: intenção da página.
 *   organica = conteúdo/portfólio que se sustenta no Google;
 *   ads      = landing page feita para tráfego pago;
 *   privada  = painel, ferramenta interna, redirect e página de pós-conversão.
 * - `indexavel`: segue o `exclude` de next-sitemap.config.js (fonte do sitemap).
 * - Caminho com `[id]` é dinâmico: o painel casa por prefixo (ex.: /loja/abc123).
 */

export type TipoRota = "organica" | "ads" | "privada";

export interface RotaSite {
  path: string;
  rotulo: string;
  tipo: TipoRota;
  indexavel: boolean;
}

export const ROTAS: RotaSite[] = [
  // ─── Públicas indexáveis ────────────────────────────────────────────────────
  { path: "/", rotulo: "Home", tipo: "organica", indexavel: true },
  { path: "/bside", rotulo: "Bside Digital Studio", tipo: "organica", indexavel: true },
  { path: "/projetos", rotulo: "Projetos", tipo: "organica", indexavel: true },
  { path: "/blog", rotulo: "Blog", tipo: "organica", indexavel: true },
  { path: "/contato", rotulo: "Contato", tipo: "organica", indexavel: true },
  { path: "/loja", rotulo: "Loja", tipo: "organica", indexavel: true },
  { path: "/loja/[id]", rotulo: "Produto da loja", tipo: "organica", indexavel: true },
  { path: "/ferramentas", rotulo: "Ferramentas", tipo: "organica", indexavel: true },

  // ─── Landing pages de tráfego pago ─────────────────────────────────────────
  { path: "/consultoria-ia", rotulo: "Consultoria de IA", tipo: "ads", indexavel: true },
  { path: "/criacao-de-sites", rotulo: "Criação de sites", tipo: "ads", indexavel: true },
  { path: "/marketing-os", rotulo: "Marketing OS", tipo: "ads", indexavel: true },
  { path: "/ecommerce-maringa", rotulo: "E-commerce Maringá", tipo: "ads", indexavel: true },
  { path: "/autohedge", rotulo: "AutoHedge", tipo: "ads", indexavel: true },
  { path: "/bside/agendamento-online", rotulo: "Bside · Agendamento online", tipo: "ads", indexavel: true },
  { path: "/bside/cardapio-digital", rotulo: "Bside · Cardápio digital", tipo: "ads", indexavel: true },
  { path: "/bside/nota-fiscal", rotulo: "Bside · Nota fiscal", tipo: "ads", indexavel: true },
  { path: "/bside/salao/servicos", rotulo: "Bside · Salão (serviços)", tipo: "ads", indexavel: true },
  { path: "/bside/hot", rotulo: "Bside Hot", tipo: "ads", indexavel: false },

  // ─── Privadas: painel, demos, redirects e pós-conversão ────────────────────
  { path: "/admin", rotulo: "Painel", tipo: "privada", indexavel: false },
  { path: "/admin/login", rotulo: "Login do painel", tipo: "privada", indexavel: false },
  { path: "/admin/visao", rotulo: "Visão do site", tipo: "privada", indexavel: false },
  { path: "/admin/dashboard", rotulo: "Dashboard antigo", tipo: "privada", indexavel: false },
  { path: "/admin/servicos", rotulo: "Serviços (painel)", tipo: "privada", indexavel: false },
  { path: "/admin/ml", rotulo: "Mercado Livre (painel)", tipo: "privada", indexavel: false },
  { path: "/admin/gerador", rotulo: "Gerador (painel)", tipo: "privada", indexavel: false },
  { path: "/admin/propaganda", rotulo: "Propaganda (painel)", tipo: "privada", indexavel: false },
  { path: "/admin/prospect", rotulo: "Prospecção (painel)", tipo: "privada", indexavel: false },
  { path: "/login", rotulo: "Login", tipo: "privada", indexavel: false },
  { path: "/perfil", rotulo: "Perfil", tipo: "privada", indexavel: false },
  { path: "/dashboard", rotulo: "Dashboard", tipo: "privada", indexavel: false },
  { path: "/conectar", rotulo: "Conectar", tipo: "privada", indexavel: false },
  { path: "/whatsapp-qr", rotulo: "WhatsApp QR", tipo: "privada", indexavel: false },
  { path: "/sendCert", rotulo: "Envio de certificado", tipo: "privada", indexavel: false },
  { path: "/portfolio", rotulo: "Portfólio (interno)", tipo: "privada", indexavel: false },
  { path: "/criativo", rotulo: "Criativo (interno)", tipo: "privada", indexavel: false },
  { path: "/obrigado", rotulo: "Obrigado (pós-conversão)", tipo: "privada", indexavel: false },
  { path: "/ir/whatsapp", rotulo: "Redirect WhatsApp (Ads)", tipo: "privada", indexavel: false },
  { path: "/bside/agenda-demo", rotulo: "Bside · Demo de agenda", tipo: "privada", indexavel: false },
  { path: "/bside/cardapio-demo", rotulo: "Bside · Demo de cardápio", tipo: "privada", indexavel: false },
  { path: "/bside/hot/modelo", rotulo: "Bside Hot · Modelo", tipo: "privada", indexavel: false },
  { path: "/bside/salao/modelo", rotulo: "Bside · Salão (modelo)", tipo: "privada", indexavel: false },
  { path: "/bside/previa/juliana", rotulo: "Bside · Prévia Juliana", tipo: "privada", indexavel: false },
];

export const ROTULOS_TIPO: Record<TipoRota, string> = {
  organica: "Orgânica",
  ads: "Ads",
  privada: "Privada",
};
