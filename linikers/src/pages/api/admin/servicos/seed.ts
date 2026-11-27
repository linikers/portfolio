// src/pages/api/admin/servicos/seed.ts
// Publica o catálogo de src/data/servicos.ts no Firestore.
// POST → cria apenas os que faltam (preserva edições feitas no painel).
// POST ?forcar=1 → sobrescreve os que já existem com o conteúdo do código.
import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { exigirAdmin } from "@/lib/adminAuth";
import { docDeServico } from "@/lib/servicosAdmin";
import { SERVICOS } from "@/data/servicos";

const COLECAO = "servicos";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessao = await exigirAdmin(req, res);
  if (!sessao) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido" });
  }

  const forcar = req.query.forcar === "1";

  try {
    const db = getAdminFirestore();
    let criados = 0;
    let atualizados = 0;
    let preservados = 0;

    for (const servico of SERVICOS) {
      const ref = db.collection(COLECAO).doc(servico.id);
      const atual = await ref.get();
      if (atual.exists && !forcar) {
        preservados += 1;
        continue;
      }
      await ref.set(docDeServico(servico, sessao.email));
      if (atual.exists) atualizados += 1;
      else criados += 1;
    }

    return res.status(200).json({ ok: true, criados, atualizados, preservados, total: SERVICOS.length });
  } catch (erro) {
    console.error("admin/servicos/seed", erro);
    return res.status(500).json({ error: "Falha ao publicar catálogo" });
  }
}
