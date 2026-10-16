/**
 * Bside Digital Studio — fonte única dos links de WhatsApp da rota /bside.
 *
 * Regras (RESPOSTA-SERVICOS-v3, seção 4.2 e RESPOSTA-CONVERSA-v3, seção 4.1):
 * - Todos os cliques caem no MESMO número (o do perfil que recebe: "Márcia").
 * - Nenhum link daqui importa as constantes de WhatsApp do portfólio
 *   (`@/lib/conversaoWhatsapp`), que mandam outra marca e outro número.
 * - Toda mensagem abre com "Oi, Márcia!" e termina com "Meu negócio é: ",
 *   codificada com encodeURIComponent (o `text=` não aceita espaço cru).
 *
 * Número confirmado pelo dono: é o de vendas (linha que o bridge atende),
 * DDD 44 99152-8386, 13 dígitos com o 9. Substituiu o pessoal que tinha
 * entrado por engano (o do WHATSAPP_HOME_CHANNEL). O wa.me só resolve o
 * número exato, então o formato fica travado aqui.
 */
export const WA_NUM = "5544991528386";

/** Monta um link wa.me com a mensagem pré-preenchida. */
export const wa = (mensagem: string) =>
  `https://wa.me/${WA_NUM}?text=${encodeURIComponent(mensagem)}`;

/**
 * Mensagens pré-preenchidas por ponto de clique (tabela de 15 pontos,
 * RESPOSTA-SERVICOS-v3 seção 4.2). O texto final de cada uma é a atribuição:
 * a Márcia sabe de qual seção/peça o lead veio sem precisar de UTM.
 */
export const WA_MSG = {
  /** Header, hero, FAQ 4, CTA final e barra fixa mobile. */
  geral:
    "Oi, Márcia! Vi a página da Bside e quero um orçamento para o meu negócio. Meu segmento é: ",
  /** Faixa "O QUE A GENTE FAZ", célula NÃO ACHOU?. */
  naoAchou:
    "Oi, Márcia! Vi a página da Bside e quero conversar sobre um projeto. Meu negócio é: ",
  /** Modelos, card A (agenda). */
  cardAgenda:
    "Oi, Márcia! Vi a agenda de exemplo e quero uma agenda assim para o meu negócio. Meu negócio é: ",
  /** Modelos, card B (cardápio). */
  cardCardapio:
    "Oi, Márcia! Vi o cardápio de exemplo e quero um cardápio assim para o meu negócio. Meu negócio é: ",
  /** Modelos, card C (segmento). */
  cardSegmento: "Oi, Márcia! Quero um site para o meu tipo de negócio. Meu negócio é: ",
  /** Preços, card 1 (Página Profissional R$ 397). */
  card1:
    "Oi, Márcia! Quero a Página Profissional de R$ 397 para o meu negócio. Meu negócio é: ",
  /** Preços, card 2 (Combo Vitrine que Vende R$ 997). */
  card2:
    "Oi, Márcia! Quero o combo Vitrine que Vende (site + cardápio ou agenda). Meu negócio é: ",
  /** Preços, card 3 (Operação no Automático). */
  card3: "Oi, Márcia! Quero uma proposta de sistema sob medida. Meu negócio é: ",
  /** Linha discreta do sistema sob medida (a partir de R$ 1.997). */
  linhaSistema:
    "Oi, Márcia! Quero só o sistema com painel (a partir de R$ 1.997). Meu negócio é: ",
  /** Linha discreta dos módulos avulsos. */
  linhaModulos:
    "Oi, Márcia! Quero só um módulo avulso (página, cardápio ou agenda). Meu negócio é: ",
  /** CTA final. */
  ctaFinal:
    "Oi, Márcia! Vi a página da Bside e quero tirar a ideia do papel. Meu negócio é: ",
  /** Demo de agenda, saída principal. */
  demoAgenda:
    "Oi, Márcia! Testei a agenda de exemplo e quero uma agenda assim para o meu negócio. Meu negócio é: ",
  /**
   * Célula "Anúncios no Google e Facebook" (escopo desta rodada; SEM preço).
   * CTA literal do dono: "quero saber sobre os anúncios".
   * PREÇO A DEFINIR: não exibir valor para tráfego pago até o dono ratificar.
   */
  anuncios:
    "Oi, Márcia! Vi a página da Bside e quero saber sobre os anúncios no Google e Facebook. Meu negócio é: ",
  /**
   * Célula "Painel de marketing com IA" (Marketing OS como serviço; SEM preço).
   * CTA literal do dono: "quero conhecer o painel".
   * PREÇO A DEFINIR: não exibir valor para o painel até o dono ratificar.
   */
  painelIa:
    "Oi, Márcia! Vi a página da Bside e quero conhecer o painel de marketing com IA. Meu negócio é: ",
  /**
   * Célula "Emissão de notas fiscais" (serviço novo do estúdio; SEM preço).
   * CTA literal do dono (sem preço; roteia para o WhatsApp como as demais).
   * PREÇO A DEFINIR: não exibir valor para emissão de notas até o dono ratificar.
   */
  notasFiscais:
    "Oi, Márcia! Vi o site e quero saber sobre emissão de notas fiscais. Meu negócio é: ",
};

/**
 * Demo de agenda, fecho com a escolha do lead: serviço, profissional, dia e hora.
 * Interativa desde já (o "D+7" da tabela original era só a data prevista de ligar
 * a interação; aqui ela já nasce ligada).
 */
export const waAgendaEscolha = (
  servico: string,
  profissional: string,
  dia: string,
  hora: string
) =>
  wa(
    `Oi, Márcia! Testei a agenda de exemplo e quero uma agenda assim para o meu negócio. Escolhi: ${servico} com ${profissional}, ${dia} às ${hora}. Meu negócio é: `
  );

/**
 * Demo de cardápio, barra fixa de pedido: resumo com a contagem e o total.
 * Escrito para NUNCA parecer pedido real na pizzaria fictícia.
 */
export const waCardapioPedido = (itens: number, total: string) =>
  wa(
    `Oi, Márcia! Testei o cardápio de exemplo (pedido: ${itens} itens · R$ ${total}) e quero um cardápio assim para o meu. Meu negócio é: `
  );
