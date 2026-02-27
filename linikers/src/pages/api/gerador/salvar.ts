// src/pages/api/gerador/salvar.ts
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { db } from "@/config/firebaseClient";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import fs from "fs";
import path from "path";
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

    const baseFolder = path.join(process.cwd(), "prompts", uid, postId);

    // Cria a pasta localmente se não existir
    if (!fs.existsSync(baseFolder)) {
      fs.mkdirSync(baseFolder, { recursive: true });
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

    // 2. Upload do Prompt (.md)
    const promptPath = path.join(baseFolder, "prompt.md");
    fs.writeFileSync(promptPath, prompt || "", "utf8");

    // 3. Upload dos Metadados (.json)
    const finalMetadata = JSON.parse(metadata || "{}");
    if (imageUrl) finalMetadata.imageUrl = imageUrl;

    const metaPath = path.join(baseFolder, "metadata.json");
    fs.writeFileSync(metaPath, JSON.stringify(finalMetadata, null, 2), "utf8");

    // 4. Create Firestore document for the prompt
    const promptDocRef = doc(db, "prompts", `${uid}_${postId}`);
    await setDoc(promptDocRef, {
      uid,
      postId,
      // Spread all metadata fields (title, description, price, category, platform, etc.)
      ...JSON.parse(metadata || "{}"),
      content: prompt || "",
      imageUrl,
      createdAt: serverTimestamp(),
      published: false,
    });
    return res.status(200).json({ success: true, postId });
  } catch (error: any) {
    console.error("🔥 [API Publicar] Erro:", error);
    return res.status(500).json({ error: error.message });
  }
}
