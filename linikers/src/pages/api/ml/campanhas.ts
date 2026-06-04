// src/pages/api/ml/campanhas.ts
// API route que retorna dados do Mercado Livre do Alcides
// como "campanhas" para o dashboard do portfolio
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

interface MlProduct {
  id: string;
  title: string;
  price: number;
  sold_quantity: number;
  available_quantity: number;
  thumbnail: string;
  permalink: string;
  listing_type: string;
}

interface MlCampanha {
  id: string;
  content: string;
  platform: string;
  budget: number;
  revenue: number;
  sold: number;
  stock: number;
  roi: number;
  thumbnail: string;
  link: string;
  status: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Caminho do dados.json (absoluto do servidor)
    const dadosPath = "/root/mercadoLivre/dados.json";

    if (!fs.existsSync(dadosPath)) {
      return res.status(404).json({
        error: "Dados do Mercado Livre não encontrados.",
      });
    }

    const raw = fs.readFileSync(dadosPath, "utf-8");
    const dados = JSON.parse(raw);

    const produtos: MlProduct[] = dados.produtos || [];
    const conta = dados.conta || {};

    // Transforma cada produto em "campanha"
    const campanhas: MlCampanha[] = produtos.map((p) => {
      const receita = p.price * p.sold_quantity;
      // Estima comissão ML (padrão 16% se não configurado)
      const comissao = (conta.comissao_percentual || 16) / 100;
      const custoComissao = receita * comissao;
      const lucroEstimado = receita - custoComissao;
      const roi =
        custoComissao > 0
          ? Number(((lucroEstimado / custoComissao) * 100).toFixed(1))
          : 0;

      return {
        id: p.id,
        content: p.title,
        platform: "mercadolivre",
        budget: p.price,
        revenue: receita,
        sold: p.sold_quantity,
        stock: p.available_quantity,
        roi,
        thumbnail: p.thumbnail || "",
        link: p.permalink || "",
        status: p.sold_quantity > 0 ? "published" : "paused",
      };
    });

    // Ordena por mais vendidos
    campanhas.sort((a, b) => b.sold - a.sold);

    // Métricas agregadas
    const totalRevenue = campanhas.reduce((s, c) => s + c.revenue, 0);
    const totalSold = campanhas.reduce((s, c) => s + c.sold, 0);
    const avgRoi =
      campanhas.length > 0
        ? Number(
            (
              campanhas.reduce((s, c) => s + c.roi, 0) / campanhas.length
            ).toFixed(1),
          )
        : 0;

    return res.status(200).json({
      loja: conta.nome_loja || "CarCrew Suspensões",
      totalProdutos: campanhas.length,
      totalRevenue,
      totalSold,
      avgRoi,
      campanhas,
    });
  } catch (error: any) {
    console.error("[ML Campanhas] Error:", error);
    return res.status(500).json({ error: error.message || "Erro interno" });
  }
}
