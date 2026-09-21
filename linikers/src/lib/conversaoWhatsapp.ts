/**
 * Caminho de conversão do site: o clique no WhatsApp.
 *
 * Por que existe: o CTA principal da home levava para `/contato` (formulário), mas a
 * ação de conversão desta conta no Google Ads é "Clique WhatsApp - site" — ou seja, o
 * clique que o anúncio paga terminava numa página diferente da que a conversão mede.
 * Aqui o clique vai direto para a conversa, com a mensagem já escrita.
 */

/** Número comercial (o mesmo dos ícones sociais do site). */
export const WHATSAPP_NUMERO = "5544984198075";

/** Abre o WhatsApp com a mensagem pronta — encurta a distância até o orçamento. */
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  "Olá, Liniker! Vi o site e quero um orçamento para um projeto."
)}`;

/**
 * Rótulo da conversão do Google Ads, no formato `AW-18460150717/<rótulo>`.
 *
 * Vazio = não dispara. A tag do Google já está instalada no site (`_document.jsx`);
 * o que falta é o rótulo da ação de conversão criada na conta, que o Google mostra
 * em Conversões → ação → configuração da tag. Preencher aqui e a conversão passa a
 * ser registrada nos cliques abaixo — mudança de uma linha.
 */
export const WHATSAPP_CONVERSION_SEND_TO = "";

/**
 * Dispara a conversão de clique no WhatsApp.
 * Devolve `false` quando ainda não há rótulo configurado (não inventa evento).
 */
export function registrarConversaoWhatsApp(): boolean {
  if (!WHATSAPP_CONVERSION_SEND_TO) return false;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return false;
  gtag("event", "conversion", { send_to: WHATSAPP_CONVERSION_SEND_TO });
  return true;
}
