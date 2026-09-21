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
 * o que falta é o rótulo da ação de conversão ("Inscrição", tipo evento) que o Google
 * mostra em Conversões → ação → configuração da tag. Preencher aqui ativa a medição
 * em TODOS os pontos de WhatsApp do site de uma vez.
 */
export const WHATSAPP_CONVERSION_SEND_TO = "";

/**
 * Medição por URL (Plano B): o clique passa por `/ir/whatsapp` e a conversão é medida
 * pelo **carregamento dessa página**, via a ação de conversão por URL do Google Ads.
 * Não precisa de rótulo/snippet — usa a tag que já está no site.
 *
 * Ligado por padrão porque foi o caminho escolhido; desligar (false) volta ao disparo
 * por evento, que exige o rótulo acima.
 */
export const MEDIR_CLIQUE_POR_URL = true;

/** Rota de passagem que o Google Ads deve medir (adicionar em "Páginas da Web"). */
export const ROTA_MEDIDA = "/ir/whatsapp";

/** Janela anti-duplo-disparo: um clique pode passar pelo botão E pelo listener global. */
const JANELA_ANTI_DUPLO_MS = 500;
let ultimoDisparo = 0;

/**
 * Dispara a conversão de clique no WhatsApp.
 * Devolve `false` quando não há rótulo configurado ou quando é duplicata do mesmo clique
 * (o botão tem onClick próprio e o listener global também vê o evento — sem a janela,
 * a conversão seria contada duas vezes).
 */
export function registrarConversaoWhatsApp(): boolean {
  if (!WHATSAPP_CONVERSION_SEND_TO) {
    // Sem rótulo: se a medição por URL está ligada, o clique ainda é contado (na rota
    // medida); se não está, fica explícito no console que nada será registrado.
    console.info(
      MEDIR_CLIQUE_POR_URL
        ? `[conversao] clique roteado para ${ROTA_MEDIDA} (medido por URL)`
        : "[conversao] clique no WhatsApp detectado, mas a medição está desligada"
    );
    return false;
  }
  const agora = Date.now();
  if (agora - ultimoDisparo < JANELA_ANTI_DUPLO_MS) return false;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return false;
  ultimoDisparo = agora;
  gtag("event", "conversion", { send_to: WHATSAPP_CONVERSION_SEND_TO });
  // Marcador para teste: dá pra conferir no console do navegador que o evento saiu,
  // sem esperar o Google processar.
  console.info("[conversao] disparada:", WHATSAPP_CONVERSION_SEND_TO);
  return true;
}

/**
 * Instala um listener global que dispara a conversão em QUALQUER clique que abra o
 * WhatsApp — botões, ícones do rodapé e as landing pages das sitelinks (consultoria-ia,
 * e-commerce em Maringá, marketing OS), inclusive os que forem criados depois.
 * Sem isto, cada botão novo seria um ponto cego de medição.
 * Devolve a função de limpeza (o retorno do `useEffect`).
 */
export function instalarConversaoWhatsApp(): () => void {
  if (typeof document === "undefined") return () => {};
  const aoClicar = (ev: MouseEvent) => {
    const alvo = ev.target as HTMLElement | null;
    const link = alvo?.closest?.('a[href*="wa.me/"]') as HTMLAnchorElement | null;
    if (!link) return;

    registrarConversaoWhatsApp();

    // Plano B: o clique passa pela rota medida. A mensagem pré-escrita de cada botão
    // vai junto no parâmetro `to`, então nenhuma landing perde sua copy.
    if (MEDIR_CLIQUE_POR_URL && link.href.startsWith("https://wa.me/")) {
      ev.preventDefault();
      const medido = `${ROTA_MEDIDA}?to=${encodeURIComponent(link.href)}`;
      if (link.target === "_blank") {
        window.open(medido, "_blank", "noopener");
      } else {
        window.location.href = medido;
      }
    }
  };
  document.addEventListener("click", aoClicar, true);
  return () => document.removeEventListener("click", aoClicar, true);
}
