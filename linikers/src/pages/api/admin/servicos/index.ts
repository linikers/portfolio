// src/pages/api/admin/servicos/index.ts
// CRUD do catálogo de serviços. Exige sessão de admin (cookie HttpOnly).
// GET  → lista do Firestore (coleção servicos); se vazia, devolve o catálogo do código.
// POST → cria/atualiza um serviço pelo id (upsert).
import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { exigirAdmin } from "@/lib/adminAuth";
import { docDeServico, validarServico } from "@/lib/servicosAdmin";
import { SERVICOS } from "@/data/servicos";

const COLECAO = "servicos";

interface RespostaLista {
  servicos: unknown[];
  origem: "firestore" | "codigo";
  aviso?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sessao = await exigirAdmin(req, res);
  if (!sessao) return;

  try {
    const db = getAdminFirestore();

    if (req.method === "GET") {
      const snap = await db.collection(COLECAO).get();
      if (snap.empty) {
        const resposta: RespostaLista = {
          servicos: SERVICOS,
          origem: "codigo",
          aviso: "Catálogo ainda não publicado no Firestore. Publique para poder editar.",
        };
        return res.status(200).json(resposta);
      }
      const servicos = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a: any, b: any) =>
          `${a.marca}${a.nome}`.localeCompare(`${b.marca}${b.nome}`, "pt-BR"),
        );
      return res.status(200).json({ servicos, origem: "firestore" });
    }

    if (req.method === "POST") {
      const validacao = validarServico(req.body);
      if (!validacao.ok || !validacao.servico) {
        return res.status(400).json({ error: "Serviço inválido", erros: validacao.erros });
      }
      const doc = docDeServico(validacao.servico, sessao.email);
      await db.collection(COLECAO).doc(doc.id).set(doc, { merge: false });
      return res.status(200).json({ ok: true, servico: doc });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Método não permitido" });
  } catch (erro) {
    console.error("admin/servicos", erro);
    return res.status(500).json({ error: "Falha ao falar com o Firestore" });
  }
}
