// /api/prospects/search - busca negocios no OpenStreetMap
// Fluxo: Nominatim (geocode) → Overpass (negocios, tolerante a falha)
// Timeouts agressivos pra caber nos 10s do Vercel Hobby
import type { NextApiRequest, NextApiResponse } from "next";

const OSM_SEARCH = "https://nominatim.openstreetmap.org/search";
const OSM_OVERPASS = "https://overpass-api.de/api/interpreter";
const OVERPASS_PROXY = "http://2.24.115.130:3099/overpass";
const FETCH_TIMEOUT = 4000;
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

async function fetchFast(url: string, options: RequestInit = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function parseBiz(el: any) {
  return {
    id: `osm_${el.type}_${el.id}`,
    name: el.tags?.name || el.tags?.operator || el.tags?.brand || "Sem nome",
    address: [el.tags?.["addr:street"], el.tags?.["addr:housenumber"], el.tags?.["addr:city"]].filter(Boolean).join(", ") || "",
    phone: el.tags?.phone || el.tags?.["contact:phone"] || "",
    website: el.tags?.website || el.tags?.["contact:website"] || "",
    category: el.tags?.shop || el.tags?.craft || el.tags?.amenity || "",
    lat: el.lat || el.center?.lat,
    lon: el.lon || el.center?.lon,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { q, lat, lon, radius = 5000 } = req.query;
  const rad = Math.min(Number(radius) || 5000, 10000);

  try {
    let businesses: any[] = [];

    if (lat && lon) {
      // Busca por coordenadas - Overpass via proxy
      const overQ = `[out:json][timeout:5];node["shop"](around:${rad},${lat},${lon});node["craft"](around:${rad},${lat},${lon});out body;`;
      try {
        const r = await fetchFast(OVERPASS_PROXY, {
          method: "POST",
          body: JSON.stringify({ query: overQ }),
          headers: { "Content-Type": "application/json", "User-Agent": UA },
        });
        if (r.ok) {
          const d = await r.json();
          businesses = (d.elements || []).map(parseBiz);
        }
      } catch {}
    } else if (q) {
      const qs = typeof q === "string" ? q : String(q);
      const parts = qs.trim().split(/\s+/);
      const cidade = parts[parts.length - 1];

      // Geocode da cidade
      let geoRes = await fetchFast(`${OSM_SEARCH}?q=${encodeURIComponent(cidade)}&format=json&limit=5&countrycodes=br`, {
        headers: { "User-Agent": UA, "Accept": "application/json" },
      });
      if (!geoRes.ok) throw new Error(`Nominatim ${geoRes.status}`);
      let geoData = await geoRes.json();
      const isCity = (r: any) => ["city","town","village","municipality","administrative"].includes(r.addresstype || r.type);
      let loc = geoData.find(isCity);

      if (!loc) {
        geoRes = await fetchFast(`${OSM_SEARCH}?q=${encodeURIComponent(qs)}&format=json&limit=5&countrycodes=br`, {
          headers: { "User-Agent": UA, "Accept": "application/json" },
        });
        if (!geoRes.ok) throw new Error(`Nominatim ${geoRes.status}`);
        geoData = await geoRes.json();
        loc = geoData.find(isCity);
      }

      if (loc) {
        // Overpass — busca via proxy ou direto como fallback
        const overQ = `[out:json][timeout:5];node["shop"](around:${rad},${loc.lat},${loc.lon});node["craft"](around:${rad},${loc.lat},${loc.lon});out body;`;
        try {
          const r = await fetchFast(OVERPASS_PROXY, {
            method: "POST",
            body: JSON.stringify({ query: overQ }),
            headers: { "Content-Type": "application/json", "User-Agent": UA },
          });
          if (r.ok) {
            const d = await r.json();
            businesses = (d.elements || []).filter((el: any) => el.tags?.name).map(parseBiz).slice(0, 30);
          }
        } catch {}
      }
    }

    return res.status(200).json({ businesses, count: businesses.length });
  } catch (error: any) {
    console.error("Erro:", error.message);
    return res.status(500).json({ error: "Erro ao buscar negocios", detail: error.message });
  }
}
