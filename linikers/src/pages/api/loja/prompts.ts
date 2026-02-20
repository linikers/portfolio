// src/pages/api/loja/prompts.ts
// API Route — CRUD de prompts da loja.
// GET: listar publicados (com paginação). POST: criar ou atualizar prompt.
// Usa Firebase Admin SDK.

import type { NextApiRequest, NextApiResponse } from "next";
import { getApps, initializeApp, cert, getApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

// Inicializar Firebase Admin (singleton)
function getAdminFirestore() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }
  return getFirestore(getApp());
}

interface PromptDoc {
  title: string;
  description: string;
  content: string;
  category: string;
  platform: string;
  price: number;
  published: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  uid: string;
}

interface PromptResponse {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  platform: string;
  price: number;
  published: boolean;
  createdAt: string;
  uid: string;
}

interface ErrorResponse {
  error: string;
}

interface GetSuccessResponse {
  prompts: PromptResponse[];
  total: number;
}

interface PostSuccessResponse {
  id: string;
  message: string;
}

function serializePrompt(id: string, data: PromptDoc): PromptResponse {
  return {
    id,
    title: data.title || "",
    description: data.description || "",
    content: data.content || "",
    category: data.category || "outro",
    platform: data.platform || "geral",
    price: data.price ?? 0,
    published: data.published ?? false,
    createdAt:
      data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    uid: data.uid || "",
  };
}

function isValidPostBody(body: unknown): body is {
  title: string;
  description: string;
  content: string;
  category: string;
  platform: string;
  price: number;
  uid: string;
  id?: string;
} {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;

  return (
    typeof b.title === "string" &&
    b.title.trim().length > 0 &&
    typeof b.description === "string" &&
    typeof b.content === "string" &&
    b.content.trim().length > 0 &&
    typeof b.category === "string" &&
    typeof b.platform === "string" &&
    typeof b.price === "number" &&
    b.price >= 0 &&
    typeof b.uid === "string" &&
    b.uid.trim().length > 0
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    GetSuccessResponse | PostSuccessResponse | ErrorResponse
  >,
): Promise<void> {
  const db = getAdminFirestore();
  const promptsCollection = db.collection("prompts");

  // ——— GET: listar publicados ———
  if (req.method === "GET") {
    try {
      const limit = Math.min(Number(req.query.limit) || 20, 50);
      const offset = Number(req.query.offset) || 0;

      const snapshot = await promptsCollection
        .where("published", "==", true)
        .orderBy("createdAt", "desc")
        .limit(limit)
        .offset(offset)
        .get();

      const prompts = snapshot.docs.map((doc: any) =>
        serializePrompt(doc.id, doc.data() as PromptDoc),
      );

      // Count total (apenas publicados)
      const countSnapshot = await promptsCollection
        .where("published", "==", true)
        .count()
        .get();
      const total = countSnapshot.data().count;

      res.status(200).json({ prompts, total });
    } catch (error) {
      console.error("[API] GET /api/loja/prompts falhou:", error);
      res.status(500).json({ error: "Erro ao buscar prompts." });
    }
    return;
  }

  // ——— POST: criar ou atualizar ———
  if (req.method === "POST") {
    if (!isValidPostBody(req.body)) {
      res.status(400).json({
        error:
          "Body inválido. Campos obrigatórios: title, description, content, category, platform, price, uid.",
      });
      return;
    }

    try {
      const {
        id,
        title,
        description,
        content,
        category,
        platform,
        price,
        uid,
      } = req.body;

      if (id) {
        // Update
        await promptsCollection.doc(id).update({
          title,
          description,
          content,
          category,
          platform,
          price,
        });
        res.status(200).json({ id, message: "Prompt atualizado." });
      } else {
        // Create
        const docRef = await promptsCollection.add({
          title,
          description,
          content,
          category,
          platform,
          price,
          published: false,
          createdAt: Timestamp.now(),
          uid,
        });
        res.status(201).json({ id: docRef.id, message: "Prompt criado." });
      }
    } catch (error) {
      console.error("[API] POST /api/loja/prompts falhou:", error);
      res.status(500).json({ error: "Erro ao salvar prompt." });
    }
    return;
  }

  // ——— Método não suportado ———
  res.setHeader("Allow", "GET, POST");
  res.status(405).json({ error: "Método não permitido." });
}
