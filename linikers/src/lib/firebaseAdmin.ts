// src/lib/firebaseAdmin.ts
/**
 * Singleton para o Firebase Admin SDK.
 * Usado exclusivamente no servidor (API Routes e getServerSideProps).
 */

import { getApps, initializeApp, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export function getAdminFirestore() {
  if (!getApps().length) {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      console.error(
        "🔥 ERRO FIREBASE ADMIN: Variáveis FIREBASE_CLIENT_EMAIL ou FIREBASE_PRIVATE_KEY não encontradas.",
      );
    }

    initializeApp({
      credential: cert({
        projectId: projectId || "portfoliolinikers",
        clientEmail: clientEmail,
        // Corrige quebras de linha na chave privada se vierem com escape
        privateKey: privateKey?.replace(/\\n/g, "\n"),
      }),
    });
  }

  return getFirestore(getApp());
}
