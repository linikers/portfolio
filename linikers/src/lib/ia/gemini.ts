// src/lib/ia/gemini.ts
// Client Gemini 1.5 Flash — usado como fallback quando o Groq falha.

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { IAResponse } from "./context";

const GEMINI_MODEL = "gemini-1.5-flash";

function getClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY não está definida nas variáveis de ambiente.",
    );
  }
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Gera texto usando o Gemini 1.5 Flash.
 * Interface idêntica à de groq.ts para ser intercambiável.
 */
export async function generateText(
  prompt: string,
  systemPrompt?: string,
): Promise<IAResponse> {
  const client = getClient();
  const model = client.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: systemPrompt || undefined,
  });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  });

  const response = result.response;
  const text = response.text();

  if (!text) {
    throw new Error("Gemini retornou uma resposta vazia.");
  }

  return { text, provider: "gemini" };
}
