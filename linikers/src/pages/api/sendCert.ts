// src/pages/api/sendCert.ts
//
// Ponte entre a pagina /sendCert (Vercel) e o receptor que grava o arquivo na
// VPS. O corpo multipart e repassado CRU, sem parsing nem conversao de texto —
// e isso que garante que o certificado chegue byte a byte.
//
// Variaveis de ambiente (Vercel):
//   SENDCERT_TOKEN     token compartilhado com o receptor (obrigatorio)
//   SENDCERT_ENDPOINT  URL do receptor (opcional, tem padrao)

import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ENCERRAMENTO_PADRAO = "https://marketing.linikers.cloud/sendCert/upload";
const LIMITE_BYTES = 6 * 1024 * 1024;

async function lerCorpoCru(req: NextApiRequest): Promise<Buffer> {
  const pedacos: Buffer[] = [];
  let total = 0;

  for await (const pedaco of req) {
    const buffer = Buffer.isBuffer(pedaco) ? pedaco : Buffer.from(pedaco as Uint8Array);
    total += buffer.length;
    if (total > LIMITE_BYTES) {
      throw new Error(`Arquivo acima do limite de ${LIMITE_BYTES} bytes`);
    }
    pedacos.push(buffer);
  }

  return Buffer.concat(pedacos);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Diagnostico rapido: diz apenas se o token esta configurado.
    return res.status(200).json({
      pronto: Boolean(process.env.SENDCERT_TOKEN),
      destino: process.env.SENDCERT_ENDPOINT || ENCERRAMENTO_PADRAO,
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ detail: "Metodo nao permitido" });
  }

  const token = process.env.SENDCERT_TOKEN || "";
  if (!token) {
    return res
      .status(500)
      .json({ detail: "SENDCERT_TOKEN nao configurado nas variaveis da Vercel" });
  }

  const enviado = String(req.headers["x-sendcert-token"] || "");
  if (enviado !== token) {
    return res.status(403).json({ detail: "Token invalido" });
  }

  let corpo: Buffer;
  try {
    corpo = await lerCorpoCru(req);
  } catch (erro) {
    return res.status(413).json({ detail: String(erro) });
  }

  if (corpo.length === 0) {
    return res.status(400).json({ detail: "Corpo vazio" });
  }

  const destino = process.env.SENDCERT_ENDPOINT || ENCERRAMENTO_PADRAO;
  const tipoConteudo = String(
    req.headers["content-type"] || "application/octet-stream",
  );

  try {
    const resposta = await fetch(`${destino}?k=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "content-type": tipoConteudo },
      body: new Uint8Array(corpo),
    });

    const texto = await resposta.text();
    res.status(resposta.status);
    res.setHeader(
      "content-type",
      resposta.headers.get("content-type") || "application/json",
    );
    return res.send(texto);
  } catch (erro) {
    return res
      .status(502)
      .json({ detail: `Nao foi possivel alcancar o receptor: ${String(erro)}` });
  }
}
