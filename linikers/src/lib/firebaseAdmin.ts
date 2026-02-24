// src/lib/firebaseAdmin.ts
// Singleton para o Firebase Admin SDK — compartilhado entre API Routes e getServerSideProps.

import { getApps, initializeApp, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export function getAdminFirestore() {
  if (!getApps().length) {
    // Verifica se as variáveis necessárias estão presentes
    if (
      !process.env.FIREBASE_CLIENT_EMAIL ||
      !process.env.FIREBASE_PRIVATE_KEY
    ) {
      console.error(
        "ERRO: FIREBASE_CLIENT_EMAIL ou FIREBASE_PRIVATE_KEY não configurados.",
      );
    }

    initializeApp({
      credential: cert({
        projectId:
          process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "portfoliolinikers",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Garante que as quebras de linha da private key sejam interpretadas corretamente
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }
  return getFirestore(getApp());
}
