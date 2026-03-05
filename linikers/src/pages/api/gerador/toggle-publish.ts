// src/pages/api/gerador/toggle-publish.ts
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { id, published, promptData } = req.body;
  if (!id) return res.status(400).json({ error: "id required" });

  const firstUnderscoreIndex = id.indexOf("_");
  if (firstUnderscoreIndex === -1)
    return res.status(400).json({ error: "Invalid ID format" });

  const uid = id.substring(0, firstUnderscoreIndex);
  const postId = id.substring(firstUnderscoreIndex + 1);
  const metaPath = path.join(
    process.cwd(),
    "prompts",
    uid,
    postId,
    "metadata.json",
  );

  try {
    if (fs.existsSync(metaPath)) {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
      meta.published = published;
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf8");
    }

    const db = getAdminFirestore();
    const promptRef = db.collection("prompts").doc(id);

    if (promptData) {
      await promptRef.set({ ...promptData, published }, { merge: true });
    } else {
      await promptRef.set({ published }, { merge: true });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("[toggle-publish API] Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
