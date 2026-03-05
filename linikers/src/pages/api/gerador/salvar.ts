// src/pages/api/gerador/salvar.ts
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { getAdminFirestore, getAdminStorage } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";
import { v2 as cloudinary } from "cloudinary";

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Desativar o body parser padrão do Next.js para lidar com multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({ multiples: false });

  try {
    const [fields, files] = await form.parse(req);

    const uid = fields.uid?.[0];
    const prompt = fields.prompt?.[0];
    const metadata = fields.metadata?.[0];
    const postId = fields.postId?.[0];

    if (!uid || !postId) {
      return res.status(400).json({ error: "UID and PostID are required" });
    }

    // 1. Upload da Imagem para o Cloudinary (se houver)
    let imageUrl = "";
    const imageFile = files.imagem?.[0];
    if (imageFile) {
      const uploadResponse = await cloudinary.uploader.upload(
        imageFile.filepath,
        {
          folder: `portfolio/prompts/${uid}/${postId}`,
        },
      );
      imageUrl = uploadResponse.secure_url;
    }

    // 2. Preparar arquivos para o Firebase Storage
    const bucket = getAdminStorage().bucket();
    const basePath = `prompts/${uid}/${postId}`;

    // Upload do Prompt (.md) para o Firebase Storage
    const promptFile = bucket.file(`${basePath}/prompt.md`);
    await promptFile.save(prompt || "", {
      contentType: "text/markdown",
      public: true,
      metadata: {
        firebaseStorageDownloadTokens: postId,
      },
    });

    // Link público aproximado
    const promptUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
      `${basePath}/prompt.md`,
    )}?alt=media`;

    // 3. Upload dos Metadados (.json) para o Firebase Storage
    const finalMetadata = JSON.parse(metadata || "{}");
    if (imageUrl) finalMetadata.imageUrl = imageUrl;
    finalMetadata.promptUrl = promptUrl;

    const metaFile = bucket.file(`${basePath}/metadata.json`);
    await metaFile.save(JSON.stringify(finalMetadata, null, 2), {
      contentType: "application/json",
      public: true,
    });

    const metaUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
      `${basePath}/metadata.json`,
    )}?alt=media`;

    // 4. Create Firestore document for the prompt using Admin SDK
    const db = getAdminFirestore();
    const promptDocRef = db.collection("prompts").doc(`${uid}_${postId}`);

    await promptDocRef.set({
      uid,
      postId,
      // Spread all metadata fields
      ...finalMetadata,
      content: prompt || "",
      imageUrl,
      promptUrl,
      metaUrl,
      createdAt: Timestamp.now(),
      published: false,
    });

    return res.status(200).json({ success: true, postId, promptUrl });
  } catch (error: any) {
    console.error("🔥 [API Publicar] Erro:", error);
    return res.status(500).json({ error: error.message });
  }
}
