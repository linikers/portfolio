// src/pages/api/admin/servicos/[id].ts
// Exclusão de um serviço do catálogo (doc id = slug do serviço).
import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { exigirAdmin } from "@/lib/adminAuth";
import { ID_SERVICO } from "@/lib/servicosAdmin";

const COLECAO = "servicos";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessao = await exigirAdmin(req, res);
  if (!sessao) return;

  const id = String(req.query.id || "");
  if (!ID_SERVICO.test(id)) {
    return res.status(400).json({ error: "id inválido" });
  }

  if (req.method !== "DELETE") {
    res.setHeader("Allow", "DELETE");
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const db = getAdminFirestore();
    const ref = db.collection(COLECAO).doc(id);
    const atual = await ref.get();
    if (!atual.exists) return res.status(404).json({ error: "Serviço não encontrado" });
    await ref.delete();
    return res.status(200).json({ ok: true, id, removidoPor: sessao.email });
  } catch (erro) {
    console.error("admin/servicos DELETE", erro);
    return res.status(500).json({ error: "Falha ao excluir no Firestore" });
  }
}
