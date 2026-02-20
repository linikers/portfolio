// src/pages/api/ia/gerar-prompt.ts
// POST — Recebe parâmetros e retorna um prompt gerado pela IA.

import type { NextApiRequest, NextApiResponse } from "next";
import { generateText } from "@/lib/ia/groq";
import { getSystemPrompt } from "@/lib/ia/context";
import type { GerarPromptBody } from "@/lib/ia/context";

interface SuccessResponse {
  prompt: string;
  provider: "groq" | "gemini";
}

interface ErrorResponse {
  error: string;
}

function isValidBody(body: unknown): body is GerarPromptBody {
  if (typeof body !== "object" || body === null) return false;

  const b = body as Record<string, unknown>;
  return (
    typeof b.categoria === "string" &&
    b.categoria.trim().length > 0 &&
    typeof b.plataforma === "string" &&
    b.plataforma.trim().length > 0 &&
    typeof b.objetivo === "string" &&
    b.objetivo.trim().length > 0 &&
    typeof b.tom === "string" &&
    b.tom.trim().length > 0
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>,
): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Método não permitido. Use POST." });
    return;
  }

  if (!isValidBody(req.body)) {
    res.status(400).json({
      error:
        "Body inválido. Campos obrigatórios: categoria, plataforma, objetivo, tom (todos strings não-vazias).",
    });
    return;
  }

  const { categoria, plataforma, objetivo, tom } = req.body;

  const userPrompt = [
    `Gere um prompt otimizado para a seguinte necessidade:`,
    ``,
    `- **Categoria:** ${categoria}`,
    `- **Plataforma alvo:** ${plataforma}`,
    `- **Objetivo:** ${objetivo}`,
    `- **Tom de voz desejado:** ${tom}`,
    ``,
    `O prompt gerado deve ser completo, pronto para uso, e seguir boas práticas de prompt engineering.`,
    `Retorne apenas o prompt, sem explicações adicionais.`,
  ].join("\n");

  try {
    const systemPrompt = getSystemPrompt();
    const result = await generateText(userPrompt, systemPrompt);

    res.status(200).json({ prompt: result.text, provider: result.provider });
  } catch (error) {
    console.error("[API] /api/ia/gerar-prompt falhou:", error);
    res.status(500).json({
      error: "Erro ao gerar prompt. Tente novamente em alguns instantes.",
    });
  }
}
