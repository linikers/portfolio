// src/pages/api/admin/session.ts
// Sessão do painel: POST entra (troca ID token por cookie), DELETE sai, GET confere.
import type { NextApiRequest, NextApiResponse } from "next";
import {
  ADMIN_COOKIE,
  cookieSessao,
  cookieSessaoExpirada,
  criarSessionCookie,
  lerSessao,
  verificarIdToken,
} from "@/lib/adminAuth";

type Resposta =
  | { ok: true; email: string }
  | { ok: false; error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Resposta>,
) {
  if (req.method === "POST") {
    const idToken = typeof req.body?.idToken === "string" ? req.body.idToken : "";
    if (!idToken) {
      return res.status(400).json({ ok: false, error: "idToken obrigatório" });
    }
    try {
      const sessao = await verificarIdToken(idToken);
      const cookie = await criarSessionCookie(idToken);
      res.setHeader("Set-Cookie", cookieSessao(cookie));
      return res.status(200).json({ ok: true, email: sessao.email });
    } catch (erro) {
      const mensagem = erro instanceof Error ? erro.message : "";
      if (mensagem === "EMAIL_FORA_DA_ALLOWLIST") {
        return res.status(403).json({ ok: false, error: "E-mail sem acesso ao painel" });
      }
      console.error("admin/session POST", mensagem);
      return res.status(401).json({ ok: false, error: "Login inválido" });
    }
  }

  if (req.method === "GET") {
    const sessao = await lerSessao(req);
    if (!sessao) return res.status(401).json({ ok: false, error: "Não autenticado" });
    return res.status(200).json({ ok: true, email: sessao.email });
  }

  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", cookieSessaoExpirada());
    return res.status(200).json({ ok: true, email: "" });
  }

  res.setHeader("Allow", "GET, POST, DELETE");
  return res.status(405).json({ ok: false, error: "Método não permitido" });
}

export { ADMIN_COOKIE };
