// src/lib/adminAuth.ts
/**
 * Autenticação do painel /admin.
 *
 * Modelo:
 * 1. O cliente entra com e-mail/senha do Firebase Auth em /admin/login.
 * 2. `POST /api/admin/session` verifica o ID token no servidor, confere se o
 *    e-mail está na allowlist (env ADMIN_EMAILS) e troca o ID token por um
 *    session cookie HttpOnly (firebase-admin createSessionCookie).
 * 3. O middleware e as APIs de admin exigem esse cookie. As APIs ainda
 *    revalidam o cookie com `verifySessionCookie(..., true)` e reconferem a
 *    allowlist — cookie sozinho não prova nada.
 *
 * Sem ADMIN_EMAILS configurado, vale apenas o e-mail do dono (fallback abaixo)
 * para o painel não ficar aberto nem ficar impossível de usar em produção.
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export const ADMIN_COOKIE = "admin_sessao";

/** 5 dias: cobre uma semana de trabalho sem pedir senha todo dia. */
export const SESSAO_SEGUNDOS = 5 * 24 * 60 * 60;

/** Fallback: só o dono. A lista real vem de ADMIN_EMAILS (separada por vírgula). */
const EMAIL_DONO = "linikers@hotmail.com";

export interface AdminSessao {
  uid: string;
  email: string;
}

/** Lista de e-mails autorizados, normalizada em minúsculas. */
export function emailsAdmin(): string[] {
  const daEnv = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (daEnv.length) return daEnv;
  return [EMAIL_DONO];
}

export function ehEmailAdmin(email?: string | null): boolean {
  if (!email) return false;
  return emailsAdmin().includes(email.trim().toLowerCase());
}

function adminAuth() {
  // getAdminFirestore garante initializeApp com a credencial de serviço.
  getAdminFirestore();
  return getAuth(getApp());
}

/** Verifica o ID token vindo do cliente no login. Lança erro se inválido. */
export async function verificarIdToken(idToken: string): Promise<AdminSessao> {
  const decoded = await adminAuth().verifyIdToken(idToken, true);
  const email = decoded.email || "";
  if (!ehEmailAdmin(email)) {
    throw new Error("EMAIL_FORA_DA_ALLOWLIST");
  }
  return { uid: decoded.uid, email: email.toLowerCase() };
}

/** Troca o ID token por session cookie — só depois da allowlist. */
export async function criarSessionCookie(idToken: string): Promise<string> {
  return adminAuth().createSessionCookie(idToken, { expiresIn: SESSAO_SEGUNDOS * 1000 });
}

/**
 * Lê e valida a sessão do request. Retorna null quando não há sessão válida
 * ou o e-mail deixou de estar na allowlist.
 */
export async function lerSessao(req: NextApiRequest): Promise<AdminSessao | null> {
  const cookie = req.cookies[ADMIN_COOKIE];
  const bearer = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  if (!cookie && !bearer) return null;

  try {
    const auth = adminAuth();
    const decoded = cookie
      ? await auth.verifySessionCookie(cookie, true)
      : await auth.verifyIdToken(bearer as string, true);
    const email = (decoded.email || "").toLowerCase();
    if (!ehEmailAdmin(email)) return null;
    return { uid: decoded.uid, email };
  } catch (erro) {
    // Cookie expirado/revogado, token inválido ou service account ausente.
    return null;
  }
}

/** Guarda de API: devolve 401 e encerra quando não há admin logado. */
export async function exigirAdmin(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<AdminSessao | null> {
  const sessao = await lerSessao(req);
  if (!sessao) {
    res.status(401).json({ error: "Não autenticado" });
    return null;
  }
  return sessao;
}

/** Cabeçalho Set-Cookie do session cookie de admin. */
export function cookieSessao(valor: string, maxAge = SESSAO_SEGUNDOS): string {
  const seguro = process.env.NODE_ENV === "production" ? " Secure;" : "";
  return `${ADMIN_COOKIE}=${valor}; Path=/; HttpOnly;${seguro} SameSite=Lax; Max-Age=${maxAge}`;
}

export function cookieSessaoExpirada(): string {
  const seguro = process.env.NODE_ENV === "production" ? " Secure;" : "";
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly;${seguro} SameSite=Lax; Max-Age=0`;
}

export { getApps };
