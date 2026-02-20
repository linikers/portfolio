// src/lib/ia/groq.ts
// Client Groq (Llama 3.3 70B) — provider principal com fallback automático para Gemini.

import Groq from "groq-sdk";
import { generateText as geminiGenerateText } from "./gemini";
import type { IAResponse } from "./context";

const GROQ_MODEL = "llama-3.3-70b-versatile";

function getClient(): Groq {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY não está definida nas variáveis de ambiente.",
    );
  }
  return new Groq({ apiKey });
}

/**
 * Gera texto usando o Groq (Llama 3.3 70B).
 * Em caso de falha (rate limit, timeout, exceptions), automaticamente
 * chama o Gemini como fallback e loga o erro.
 */
export async function generateText(
  prompt: string,
  systemPrompt?: string,
): Promise<IAResponse> {
  try {
    const client = getClient();

    const messages: Groq.Chat.ChatCompletionMessageParam[] = [];

    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    messages.push({ role: "user", content: prompt });

    const completion = await client.chat.completions.create({
      model: GROQ_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 2048,
    });

    const text = completion.choices[0]?.message?.content;

    if (!text) {
      throw new Error("Groq retornou uma resposta vazia.");
    }

    return { text, provider: "groq" };
  } catch (error) {
    console.warn(
      "[IA] Groq falhou, ativando fallback Gemini:",
      error instanceof Error ? error.message : error,
    );

    return geminiGenerateText(prompt, systemPrompt);
  }
}
