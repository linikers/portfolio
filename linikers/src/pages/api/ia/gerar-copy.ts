// src/pages/api/ia/gerar-copy.ts
// POST — Recebe rede, assunto, tom e CTA, retorna copy otimizado para a rede social.

import type { NextApiRequest, NextApiResponse } from "next";
import { generateText } from "@/lib/ia/groq";
import { getCopySystemPrompt } from "@/lib/ia/context";
import type { GerarCopyBody } from "@/lib/ia/context";

interface SuccessResponse {
  copy: string;
  provider: "groq" | "gemini";
}

interface ErrorResponse {
  error: string;
}

const REDES_VALIDAS = [
  "instagram",
  "linkedin",
  "x",
  "whatsapp",
  "tiktok",
  "youtube",
];

function isValidBody(body: unknown): body is GerarCopyBody {
  if (typeof body !== "object" || body === null) return false;

  const b = body as Record<string, unknown>;
  return (
    typeof b.rede === "string" &&
    b.rede.trim().length > 0 &&
    typeof b.assunto === "string" &&
    b.assunto.trim().length > 0 &&
    typeof b.tom === "string" &&
    b.tom.trim().length > 0 &&
    typeof b.cta === "string" &&
    b.cta.trim().length > 0
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
        "Body inválido. Campos obrigatórios: rede, assunto, tom, cta (todos strings não-vazias).",
    });
    return;
  }

  const { rede, assunto, tom, cta } = req.body;

  if (!REDES_VALIDAS.includes(rede.toLowerCase())) {
    res.status(400).json({
      error: `Rede "${rede}" não suportada. Redes válidas: ${REDES_VALIDAS.join(", ")}.`,
    });
    return;
  }

  const userPrompt = [
    `Crie um copy otimizado para publicação em rede social:`,
    ``,
    `- **Rede social:** ${rede}`,
    `- **Assunto/Tema:** ${assunto}`,
    `- **Tom de voz:** ${tom}`,
    `- **Call to Action (CTA):** ${cta}`,
    ``,
    `Siga as boas práticas da plataforma (limites de caracteres, hashtags, formatação).`,
    `Retorne apenas o copy pronto para publicação, sem explicações.`,
  ].join("\n");

  try {
    const systemPrompt = getCopySystemPrompt(rede);
    const result = await generateText(userPrompt, systemPrompt);

    res.status(200).json({ copy: result.text, provider: result.provider });
  } catch (error) {
    console.error("[API] /api/ia/gerar-copy falhou:", error);
    res.status(500).json({
      error: "Erro ao gerar copy. Tente novamente em alguns instantes.",
    });
  }
}
