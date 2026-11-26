// src/pages/api/track.ts
/**
 * Recebe os eventos first-party do site e grava na coleção `eventos`.
 *
 * Contrato (ver src/lib/track.ts): só entram campos de uma lista fechada —
 * caminho, tipo, id de sessão anônimo, origem (UTM/referrer/landing) e, no
 * clique, o rótulo do botão. Nome, telefone, e-mail, IP e user-agent NÃO são
 * gravados: o documento é montado do zero aqui, então o que o cliente mandar a
 * mais é descartado.
 *
 * Público por necessidade (o visitante não está logado), por isso:
 * - limite de requisições por IP (memória do processo, não persistido);
 * - caminho só pode ser interno ("/..."), sem query string;
 * - documento expira em 90 dias (campo `expiraEm`; TTL a ativar no Firestore —
 *   ver docs/eventos.md).
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { Timestamp } from "firebase-admin/firestore";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export const COLECAO_EVENTOS = "eventos";
export const RETENCAO_DIAS = 90;

const TIPOS = ["pageview", "clique_whatsapp"] as const;
type Tipo = (typeof TIPOS)[number];

/** 120 eventos por minuto por IP: folgado para navegação real, apertado para script. */
const LIMITE_POR_MINUTO = 120;
const JANELA_MS = 60 * 1000;
const baldes = new Map<string, { n: number; inicio: number }>();

function estourouLimite(ip: string): boolean {
  const agora = Date.now();
  const balde = baldes.get(ip);
  if (!balde || agora - balde.inicio > JANELA_MS) {
    baldes.set(ip, { n: 1, inicio: agora });
    // Poda simples para o mapa não crescer sem limite.
    if (baldes.size > 5000) {
      baldes.forEach((valor, chave) => {
        if (agora - valor.inicio > JANELA_MS) baldes.delete(chave);
      });
    }
    return false;
  }
  balde.n += 1;
  return balde.n > LIMITE_POR_MINUTO;
}

function texto(valor: unknown, limite: number): string {
  if (typeof valor !== "string") return "";
  return valor.trim().slice(0, limite);
}

/** Só caminho interno, sem query/hash — nada de URL com dado do visitante. */
function caminhoInterno(valor: unknown): string {
  const bruto = texto(valor, 300).split("?")[0].split("#")[0];
  if (!bruto.startsWith("/") || bruto.startsWith("//") || bruto.includes("..")) return "";
  return bruto.slice(0, 200);
}

function origemValida(valor: unknown) {
  const bruto = (valor || {}) as Record<string, unknown>;
  return {
    source: texto(bruto.source, 80),
    medium: texto(bruto.medium, 80),
    campaign: texto(bruto.campaign, 80),
    term: texto(bruto.term, 80),
    content: texto(bruto.content, 80),
    referrer: texto(bruto.referrer, 100),
    landing: caminhoInterno(bruto.landing),
    em: texto(bruto.em, 40),
  };
}

/** Compara origem do POST com o host — bloqueia gravação de outro site. */
function origemPermitida(req: NextApiRequest): boolean {
  const origem = req.headers.origin;
  if (!origem) return true;
  try {
    const host = new URL(origem).host;
    return !req.headers.host || host === req.headers.host;
  } catch {
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método não permitido" });
  }
  if (!origemPermitida(req)) {
    return res.status(403).json({ ok: false, error: "Origem não permitida" });
  }

  const ip = (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() || req.socket.remoteAddress || "desconhecido";
  if (estourouLimite(ip)) {
    return res.status(429).json({ ok: false, error: "Muitas requisições" });
  }

  const corpo = (req.body || {}) as Record<string, unknown>;
  const tipo = texto(corpo.tipo, 30) as Tipo;
  if (!TIPOS.includes(tipo)) {
    return res.status(400).json({ ok: false, error: "tipo inválido" });
  }

  const path = caminhoInterno(corpo.path);
  if (!path) {
    return res.status(400).json({ ok: false, error: "path inválido" });
  }

  const sessao = texto(corpo.sessao, 64);
  if (!/^[a-zA-Z0-9-]{8,64}$/.test(sessao)) {
    return res.status(400).json({ ok: false, error: "sessao inválida" });
  }

  const origem = origemValida(corpo.origem);
  const utmBruto = (corpo.utm || {}) as Record<string, unknown>;
  const utm = {
    source: texto(utmBruto.source, 80),
    medium: texto(utmBruto.medium, 80),
    campaign: texto(utmBruto.campaign, 80),
    term: texto(utmBruto.term, 80),
    content: texto(utmBruto.content, 80),
  };

  const agora = new Date();
  const documento: Record<string, unknown> = {
    tipo,
    path,
    sessao,
    nova: corpo.nova === true,
    origem,
    utm,
    data: agora.toISOString(),
    dia: agora.toISOString().slice(0, 10),
    criadoEm: Timestamp.fromDate(agora),
    // Retenção: 90 dias. O TTL do Firestore apaga sozinho quando configurado
    // no campo `expiraEm`; até lá as leituras do painel já cortam em 90 dias.
    expiraEm: Timestamp.fromMillis(agora.getTime() + RETENCAO_DIAS * 24 * 60 * 60 * 1000),
  };
  if (tipo === "clique_whatsapp") {
    documento.local = texto(corpo.local, 60);
  }

  try {
    await getAdminFirestore().collection(COLECAO_EVENTOS).add(documento);
    return res.status(204).end();
  } catch (erro) {
    console.error("api/track POST", erro instanceof Error ? erro.message : erro);
    // 503: o cliente não tenta de novo (track.ts ignora falha), mas o log mostra.
    return res.status(503).json({ ok: false, error: "Falha ao registrar evento" });
  }
}
