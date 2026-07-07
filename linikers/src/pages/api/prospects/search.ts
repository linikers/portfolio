// /api/prospects/search - busca negocios no OpenStreetMap (gratis, sem chave)
// Server-side: geocode da cidade via Nominatim
// Browser-side: busca de negocios via Overpass (nao funciona do Vercel serverless)
import type { NextApiRequest, NextApiResponse } from "next";

const OSM_SEARCH = "https://nominatim.openstreetmap.org/search";
const FETCH_TIMEOUT = 8000;

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = FETCH_TIMEOUT) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { q } = req.query;

  try {
    let coords: { lat: string; lon: string; name: string } | null = null;
    let businesses: any[] = [];

    if (q) {
      const queryStr = typeof q === "string" ? q : String(q);

      // Passo 1: Geocode da cidade via Nominatim
      const parts = queryStr.trim().split(/\s+/);
      const cidadeCandidate = parts[parts.length - 1];

      let geoRes = await fetchWithTimeout(
        `${OSM_SEARCH}?q=${encodeURIComponent(cidadeCandidate)}&format=json&limit=10&countrycodes=br`,
        { headers: { "User-Agent": "LinikersPortfolio/1.0" } }
      );
      if (!geoRes.ok) throw new Error(`Nominatim retornou ${geoRes.status}`);
      let geoData = await geoRes.json();

      const isCity = (r: any) => ["city","town","village","municipality","administrative"].includes(r.addresstype || r.type);
      let loc = geoData.find(isCity);

      if (!loc) {
        geoRes = await fetchWithTimeout(
          `${OSM_SEARCH}?q=${encodeURIComponent(queryStr)}&format=json&limit=10&countrycodes=br`,
          { headers: { "User-Agent": "LinikersPortfolio/1.0" } }
        );
        if (!geoRes.ok) throw new Error(`Nominatim retornou ${geoRes.status}`);
        geoData = await geoRes.json();
        loc = geoData.find(isCity);
      }

      if (loc) {
        coords = { lat: loc.lat, lon: loc.lon, name: loc.display_name || loc.name };
      }
    }

    return res.status(200).json({
      businesses,
      count: 0,
      coords, // frontend usa pra chamar Overpass direto do browser
    });
  } catch (error: any) {
    console.error("Erro ao buscar negocios:", error.message);
    return res.status(500).json({
      error: "Erro ao buscar negocios",
      detail: error.name === "AbortError"
        ? "A busca demorou muito tempo. Tente uma região menor."
        : error.message,
    });
  }
}
