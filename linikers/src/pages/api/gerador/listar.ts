// src/pages/api/gerador/listar.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/config/firebaseClient";
import { onAuthStateChanged } from "firebase/auth"; // not used server side, we'll verify token via cookies
import { getAuth } from "firebase-admin/auth"; // using admin SDK? we have firebase admin elsewhere
import fs from "fs";
import path from "path";

// Helper to get UID from session cookie (simplified, assumes user is authenticated via Firebase client)
function getUid(req: NextApiRequest): string | null {
  // Simplified: expect uid as query parameter for demo purposes
  const uid = typeof req.query.uid === "string" ? req.query.uid : null;
  return uid;
}

export const config = { api: { bodyParser: true } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });
  const uid = getUid(req);
  if (!uid) return res.status(400).json({ error: "uid query param required" });

  const userFolder = path.join(process.cwd(), "prompts", uid);
  if (!fs.existsSync(userFolder)) {
    return res.status(200).json({ prompts: [] });
  }
  const postIds = fs.readdirSync(userFolder);
  const prompts: any[] = [];
  for (const postId of postIds) {
    const base = path.join(userFolder, postId);
    const metaPath = path.join(base, "metadata.json");
    const promptPath = path.join(base, "prompt.md");
    if (fs.existsSync(metaPath) && fs.existsSync(promptPath)) {
      const metaRaw = fs.readFileSync(metaPath, "utf8");
      const meta = JSON.parse(metaRaw);
      const content = fs.readFileSync(promptPath, "utf8");
      prompts.push({
        id: `${uid}_${postId}`,
        title: meta.title || "",
        description: meta.description || "",
        content,
        category: meta.category || "outro",
        platform: meta.platform || "geral",
        price: meta.price ?? 0,
        published: meta.published ?? false,
        createdAt: meta.createdAt || new Date().toISOString(),
        uid,
        imageUrl: meta.imageUrl || "",
      });
    }
  }
  return res.status(200).json({ prompts });
}
