// src/lib/firebaseAdmin.ts
/**
 * Singleton para o Firebase Admin SDK.
 * Usado exclusivamente no servidor (API Routes e getServerSideProps).
 */

import { getApps, initializeApp, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

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
        // Corrige quebras de linha na chave privada (suporta \\n literal e \n escapado)
        privateKey: privateKey?.replace(/\\\\n|\\n/g, "\n"),
      }),
      storageBucket:
        process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
        "portfoliolinikers.firebasestorage.app",
    });
  }

  return getFirestore(getApp());
}

export function getAdminStorage() {
  if (!getApps().length) {
    getAdminFirestore(); // Garante a inicialização
  }
  return getStorage(getApp());
}
