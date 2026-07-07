// /api/prospects/search - busca negocios no OpenStreetMap
// Fluxo: Nominatim (geocode cidade) → Overpass (busca negocios)
// Tudo server-side com headers de browser pra evitar 406/block
import type { NextApiRequest, NextApiResponse } from "next";

const OSM_SEARCH = "https://nominatim.openstreetmap.org/search";
const OVERPASS_MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.openstreetmap.ie/api/interpreter",
];
const FETCH_TIMEOUT = 9000;
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

async function fetchOSM(url: string, options: RequestInit = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": UA,
        "Accept": "application/json, text/plain, */*",
        ...(options.headers || {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function queryOverpass(qs: string): Promise<any[] | null> {
  for (const mirror of OVERPASS_MIRRORS) {
    try {
      const res = await fetchOSM(mirror, {
        method: "POST",
        body: `data=${encodeURIComponent(qs)}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      if (res.ok) {
        const data = await res.json();
        return data.elements || [];
      }
    } catch (e) {
      console.error(`Overpass mirror ${mirror} falhou:`, (e as any)?.message);
    }
  }
  return null; // Todos os mirrors falharam
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { q, lat, lon, radius = 5000 } = req.query;
  const rad = Math.min(Number(radius) || 5000, 10000);

  try {
    let businesses: any[] = [];

    if (lat && lon) {
      // Busca por coordenadas via Overpass (tenta mirrors)
      const qs = `[out:json][timeout:8];(node["shop"](around:${rad},${lat},${lon});node["craft"](around:${rad},${lat},${lon});node["amenity"](around:${rad},${lat},${lon});way["shop"](around:${rad},${lat},${lon});way["craft"](around:${rad},${lat},${lon});way["amenity"](around:${rad},${lat},${lon}););out body;`;
      const elements = await queryOverpass(qs);
      if (elements) {
        businesses = elements.map((el: any) => ({
          id: `osm_${el.type}_${el.id}`,
          name: el.tags?.name || el.tags?.operator || el.tags?.brand || "Sem nome",
          address: [el.tags?.["addr:street"], el.tags?.["addr:housenumber"], el.tags?.["addr:city"]].filter(Boolean).join(", ") || "",
          phone: el.tags?.phone || el.tags?.["contact:phone"] || "",
          website: el.tags?.website || el.tags?.["contact:website"] || "",
          category: el.tags?.shop || el.tags?.craft || el.tags?.amenity || "",
          lat: el.lat || el.center?.lat,
          lon: el.lon || el.center?.lon,
        }));
      }
    } else if (q) {
      const queryStr = typeof q === "string" ? q : String(q);

      // Geocode da cidade
      const parts = queryStr.trim().split(/\s+/);
      const cidadeTry = parts[parts.length - 1];

      let geoRes = await fetchOSM(`${OSM_SEARCH}?q=${encodeURIComponent(cidadeTry)}&format=json&limit=10&countrycodes=br`);
      if (!geoRes.ok) throw new Error(`Nominatim ${geoRes.status}`);
      let geoData = await geoRes.json();
      const isCity = (r: any) => ["city","town","village","municipality","administrative"].includes(r.addresstype || r.type);
      let loc = geoData.find(isCity);

      if (!loc) {
        geoRes = await fetchOSM(`${OSM_SEARCH}?q=${encodeURIComponent(queryStr)}&format=json&limit=10&countrycodes=br`);
        if (!geoRes.ok) throw new Error(`Nominatim ${geoRes.status}`);
        geoData = await geoRes.json();
        loc = geoData.find(isCity);
      }

      if (loc) {
        const cc = { lat: loc.lat, lon: loc.lon };

        // Busca negocios via Overpass (tenta mirrors, query numa linha)
        const qs = `[out:json][timeout:8];(node["shop"](around:${rad},${cc.lat},${cc.lon});node["craft"](around:${rad},${cc.lat},${cc.lon});node["amenity"](around:${rad},${cc.lat},${cc.lon});way["shop"](around:${rad},${cc.lat},${cc.lon});way["craft"](around:${rad},${cc.lat},${cc.lon});way["amenity"](around:${rad},${cc.lat},${cc.lon}););out body;`;
        const elements = await queryOverpass(qs);

        if (elements) {
          businesses = elements
            .filter((el: any) => el.tags?.name)
            .map((el: any) => ({
              id: `osm_${el.type}_${el.id}`,
              name: el.tags?.name || el.tags?.operator || el.tags?.brand || "Sem nome",
              address: [el.tags?.["addr:street"], el.tags?.["addr:housenumber"], el.tags?.["addr:city"]].filter(Boolean).join(", ") || "",
              phone: el.tags?.phone || el.tags?.["contact:phone"] || "",
              website: el.tags?.website || el.tags?.["contact:website"] || "",
              category: el.tags?.shop || el.tags?.craft || el.tags?.amenity || "",
              lat: el.lat || el.center?.lat,
              lon: el.lon || el.center?.lon,
            }))
            .slice(0, 30);
        }
      }
    }

    return res.status(200).json({ businesses, count: businesses.length });
  } catch (error: any) {
    console.error("Erro:", error.message);
    return res.status(500).json({
      error: "Erro ao buscar negocios",
      detail: error.name === "AbortError" ? "Busca demorou muito. Tente região menor." : error.message,
    });
  }
}
