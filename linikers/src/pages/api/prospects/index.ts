// /api/prospects - CRUD de leads de prospeccao
// Persistencia: memoria (intra-instancia) + /tmp (Vercel writable)
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const TMP_PATH = "/tmp/prospects.json";

interface Prospect {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  category?: string;
  source: string;
  notes: string;
  status: "new" | "contacted" | "interested" | "converted" | "lost";
  createdAt: string;
  updatedAt: string;
  contactedAt?: string;
}

// Cache em memoria (sobrevive enquanto a instancia Vercel estiver "quente")
let memCache: Prospect[] | null = null;

function readProspects(): Prospect[] {
  if (memCache) return memCache;
  try {
    if (fs.existsSync(TMP_PATH)) {
      memCache = JSON.parse(fs.readFileSync(TMP_PATH, "utf-8"));
      return memCache!;
    }
  } catch {}
  return [];
}

function writeProspects(data: Prospect[]) {
  memCache = data;
  try { fs.writeFileSync(TMP_PATH, JSON.stringify(data, null, 2)); } catch {}
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const { status } = req.query;
      let prospects = readProspects();
      if (status && status !== "all") {
        prospects = prospects.filter((p) => p.status === status);
      }
      const stats = {
        total: prospects.length,
        new: prospects.filter((p) => p.status === "new").length,
        contacted: prospects.filter((p) => p.status === "contacted").length,
        interested: prospects.filter((p) => p.status === "interested").length,
        converted: prospects.filter((p) => p.status === "converted").length,
        lost: prospects.filter((p) => p.status === "lost").length,
      };
      return res.status(200).json({ prospects, stats });
    }

    case "POST": {
      const { name, address, phone, website, category, notes, source } = req.body;
      if (!name) return res.status(400).json({ error: "name é obrigatório" });

      const prospects = readProspects();
      const now = new Date().toISOString();
      const newProspect: Prospect = {
        id: `prosp_${Date.now()}`,
        name,
        address: address || "",
        phone: phone || "",
        website: website || "",
        category: category || "",
        source: source || "manual",
        notes: notes || "",
        status: "new",
        createdAt: now,
        updatedAt: now,
      };
      prospects.push(newProspect);
      writeProspects(prospects);
      return res.status(201).json(newProspect);
    }

    case "PATCH": {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: "id é obrigatório" });

      const prospects = readProspects();
      const idx = prospects.findIndex((p) => p.id === id);
      if (idx === -1) return res.status(404).json({ error: "Prospect não encontrado" });

      if (updates.status === "contacted" && !prospects[idx].contactedAt) {
        updates.contactedAt = new Date().toISOString();
      }
      updates.updatedAt = new Date().toISOString();
      prospects[idx] = { ...prospects[idx], ...updates };
      writeProspects(prospects);
      return res.status(200).json(prospects[idx]);
    }

    case "DELETE": {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: "id é obrigatório" });

      const prospects = readProspects();
      const idx = prospects.findIndex((p) => p.id === id);
      if (idx === -1) return res.status(404).json({ error: "Prospect não encontrado" });

      prospects.splice(idx, 1);
      writeProspects(prospects);
      return res.status(200).json({ success: true });
    }

    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
