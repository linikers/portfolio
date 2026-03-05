// src/lib/ia/context.ts
// Contexto global da IA — injetado em todas as chamadas para manter consistência de marca e tom.

export interface IARequestConfig {
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface IAResponse {
  text: string;
  provider: "groq" | "gemini";
}

export interface GerarPromptBody {
  categoria: string;
  plataforma: string;
  objetivo: string;
  tom: string;
}

export interface GerarCopyBody {
  rede: string;
  assunto: string;
  tom: string;
  cta: string;
}

/**
 * Retorna o system prompt base com contexto de marca, tom e idioma.
 * Lê das env vars IA_BRAND_CONTEXT, IA_DEFAULT_LANG, IA_TONE.
 * Valores padrão são aplicados caso as env vars não estejam definidas.
 */
export function getSystemPrompt(): string {
  const brand =
    process.env.IA_BRAND_CONTEXT || "Linikers - portfólio e produtos digitais";
  const lang = process.env.IA_DEFAULT_LANG || "pt-BR";
  const tone = process.env.IA_TONE || "profissional-descontraido";

  return [
    `Você é um assistente de IA da marca "${brand}".`,
    `Seu tom de voz é ${tone.replace(/-/g, " ")}.`,
    `Sempre responda no idioma ${lang}.`,
    "Nicho: portfólio pessoal, produtos digitais e marketing de conteúdo.",
    "Seja direto, criativo e evite respostas genéricas.",
    "Quando gerar conteúdo de marketing, use técnicas comprovadas de copywriting.",
  ].join("\n");
}

/**
 * Monta o system prompt específico para geração de copy por rede social.
 * Inclui boas práticas (limites de caracteres, hashtags, etc) da rede escolhida.
 */
export function getCopySystemPrompt(rede: string): string {
  const base = getSystemPrompt();

  const redeGuides: Record<string, string> = {
    instagram: [
      "Plataforma: Instagram.",
      "Limite recomendado: até 2.200 caracteres, mas engajamento melhor com até 150 chars no hook.",
      "Use hashtags relevantes (5–15). Inclua CTA claro.",
      "Emojis moderados aumentam engajamento. Quebre em parágrafos curtos.",
    ].join("\n"),
    linkedin: [
      "Plataforma: LinkedIn.",
      "Tom corporativo mas acessível. Limite: até 3.000 caracteres.",
      "Primeiro parágrafo é decisivo (aparece no preview). Sem hashtags excessivas (3–5 máx).",
      "Use dados e insights quando possível. CTA profissional.",
    ].join("\n"),
    x: [
      "Plataforma: X (Twitter).",
      "Limite: 280 caracteres por tweet. Para threads, numere os tweets.",
      "Seja conciso e impactante. Hashtags: 1–2 máximo.",
      "Hooks fortes na primeira linha. Evite links no meio do texto.",
    ].join("\n"),
    whatsapp: [
      "Plataforma: WhatsApp Business.",
      "Mensagens curtas e diretas. Sem hashtags.",
      "Use formatação WhatsApp: *negrito*, _itálico_, ~tachado~.",
      "CTA claro com link ou instrução de resposta. Tom pessoal e próximo.",
    ].join("\n"),
  };

  const guia =
    redeGuides[rede.toLowerCase()] ||
    `Plataforma: ${rede}. Adapte o copy para as melhores práticas desta rede.`;

  return `${base}\n\n--- GUIA DA REDE ---\n${guia}`;
}
