// /api/prospects/import - importar leads em lote (JSON ou CSV)
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { Prospect } from "./index";

const TMP_PATH = "/tmp/prospects.json";

function readProspects(): Prospect[] {
  try {
    if (fs.existsSync(TMP_PATH)) return JSON.parse(fs.readFileSync(TMP_PATH, "utf-8"));
  } catch {}
  return [];
}

function writeProspects(data: Prospect[]) {
  try { fs.writeFileSync(TMP_PATH, JSON.stringify(data, null, 2)); } catch {}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const contentType = req.headers["content-type"] || "";

  try {
    let imported: any[] = [];

    if (contentType.includes("multipart/form-data") || contentType.includes("text/csv")) {
      return res.status(400).json({ error: "Envie como JSON. Preferimos JSON no momento." });
    }

    // JSON: { prospects: [ ... ] } ou array direto
    const body = req.body;
    const list = Array.isArray(body) ? body : body?.prospects;

    if (!list || !Array.isArray(list) || list.length === 0) {
      return res.status(400).json({ error: "Envie um array em 'prospects'" });
    }

    const existing = readProspects();
    const now = new Date().toISOString();
    let added = 0;

    for (const item of list) {
      if (!item.name) continue;
      existing.push({
        id: `prosp_${Date.now()}_${added}`,
        name: item.name,
        address: item.address || "",
        phone: item.phone || "",
        website: item.website || "",
        category: item.category || "",
        source: item.source || "import",
        notes: item.notes || "",
        status: "new",
        createdAt: now,
        updatedAt: now,
      });
      added++;
    }

    writeProspects(existing);
    return res.status(200).json({ success: true, imported: added, total: existing.length });
  } catch (e: any) {
    return res.status(500).json({ error: "Erro ao importar", detail: e.message });
  }
}
