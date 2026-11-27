// src/pages/api/admin/visao.ts
// Dados do painel /admin/visao: contagem real na coleção `eventos` + catálogo.
import type { NextApiRequest, NextApiResponse } from "next";
import { exigirAdmin } from "@/lib/adminAuth";
import { carregarVisao, diasValidos, DIAS_PERMITIDOS } from "@/lib/visao";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método não permitido" });
  }

  const sessao = await exigirAdmin(req, res);
  if (!sessao) return;

  try {
    const visao = await carregarVisao(diasValidos(req.query.dias));
    return res.status(200).json(visao);
  } catch (erro) {
    console.error("api/admin/visao", erro instanceof Error ? erro.message : erro);
    return res.status(500).json({
      error: "Falha ao ler os eventos",
      diasPermitidos: DIAS_PERMITIDOS,
    });
  }
}
