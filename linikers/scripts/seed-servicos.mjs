#!/usr/bin/env node
// scripts/seed-servicos.mjs
// Publica o catálogo de src/data/servicos.ts no Firestore (coleção `servicos`).
//
// Uso:
//   npm run seed:servicos          # cria só o que falta (preserva edições do painel)
//   npm run seed:servicos -- --forcar   # sobrescreve tudo com o conteúdo do código
//
// Preços de lançamento vivem no código; o Firestore guarda o que está valendo.
// Rodar sem --forcar é seguro: nunca apaga ajuste feito no painel.

import fs from "node:fs";
import path from "node:path";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { SERVICOS } from "../src/data/servicos.ts";

const raiz = path.resolve(import.meta.dirname, "..");
const forcar = process.argv.includes("--forcar");

function lerEnv() {
  const arquivo = path.join(raiz, ".env");
  if (!fs.existsSync(arquivo)) return {};
  const env = {};
  for (const linha of fs.readFileSync(arquivo, "utf8").split("\n")) {
    const limpa = linha.trim();
    if (!limpa || limpa.startsWith("#") || !limpa.includes("=")) continue;
    const i = limpa.indexOf("=");
    env[limpa.slice(0, i).trim()] = limpa
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
  return env;
}

const env = { ...lerEnv(), ...process.env };
const projectId = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || env.FIREBASE_PROJECT_ID;
const clientEmail = env.FIREBASE_CLIENT_EMAIL;
const privateKey = (env.FIREBASE_PRIVATE_KEY || "").replace(/\\\\n|\\n/g, "\n");

if (!clientEmail || !privateKey || !projectId) {
  console.error(
    "Faltam credenciais: NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY no .env",
  );
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

const db = getFirestore();
const agora = new Date().toISOString();
let criados = 0;
let atualizados = 0;
let preservados = 0;

for (const servico of SERVICOS) {
  const ref = db.collection("servicos").doc(servico.id);
  const atual = await ref.get();
  if (atual.exists && !forcar) {
    preservados += 1;
    continue;
  }
  await ref.set({ ...servico, atualizadoEm: agora, atualizadoPor: "seed:scripts/seed-servicos.mjs" });
  if (atual.exists) atualizados += 1;
  else criados += 1;
}

console.log(
  `servicos: ${SERVICOS.length} no código | criados=${criados} atualizados=${atualizados} preservados=${preservados}${forcar ? " (--forcar)" : ""}`,
);
process.exit(0);
