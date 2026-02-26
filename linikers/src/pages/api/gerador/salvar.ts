// src/pages/api/gerador/salvar.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getAdminStorage } from "@/lib/firebaseAdmin";
import formidable from "formidable";
import fs from "fs";

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

    const bucket = getAdminStorage().bucket();
    const baseFolder = `prompts/${uid}/${postId}`;

    // 1. Upload da Imagem (se houver)
    let imageUrl = "";
    const imageFile = files.imagem?.[0];
    if (imageFile) {
      const fileName = `produto_${Date.now()}`;
      const destination = `${baseFolder}/${fileName}`;

      await bucket.upload(imageFile.filepath, {
        destination,
        metadata: {
          contentType: imageFile.mimetype || "image/jpeg",
        },
      });

      // Tornar o arquivo público ou obter URL assinada (Simulando URL estática para o exemplo)
      // Em produção, recomenda-se usar getDownloadURL ou tornar público se necessário
      imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destination)}?alt=media`;
    }

    // 2. Upload do Prompt (.md)
    const promptRef = bucket.file(`${baseFolder}/prompt.md`);
    await promptRef.save(prompt || "", {
      metadata: { contentType: "text/markdown" },
    });

    // 3. Upload dos Metadados (.json)
    const metaRef = bucket.file(`${baseFolder}/metadata.json`);
    const finalMetadata = JSON.parse(metadata || "{}");
    if (imageUrl) finalMetadata.imageUrl = imageUrl;

    await metaRef.save(JSON.stringify(finalMetadata, null, 2), {
      metadata: { contentType: "application/json" },
    });

    return res.status(200).json({ success: true, postId });
  } catch (error: any) {
    console.error("🔥 [API Publicar] Erro:", error);
    return res.status(500).json({ error: error.message });
  }
}
