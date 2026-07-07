// /api/prospects/search - busca negocios via Google Places API
import type { NextApiRequest, NextApiResponse } from "next";

const OSM_SEARCH = "https://nominatim.openstreetmap.org/search";
const GOOGLE_KEY = "AIzaSyAisMdXHXxQWJQ4JNf9Hdw4hvok_wJPu10";
const FETCH_TIMEOUT = 5000;

async function fetchFast(url: string, options: RequestInit = {}, timeoutMs = FETCH_TIMEOUT) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { q } = req.query;

  try {
    let businesses: any[] = [];

    if (q) {
      const queryStr = typeof q === "string" ? q : String(q);

      // Extrai cidade do query (ultima palavra, ignorando "PR", "SP" etc)
      const parts = queryStr.trim().split(/\s+/).filter(p => !/^[A-Z]{2}$/.test(p));
      const cidadeCandidate = parts[parts.length - 1];

      // Geocode da cidade via Nominatim (rapido e gratis)
      const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
      let geoRes = await fetchFast(`${OSM_SEARCH}?q=${encodeURIComponent(cidadeCandidate)}&format=json&limit=5&countrycodes=br`, {
        headers: { "User-Agent": ua, "Accept": "application/json" },
      });
      if (!geoRes.ok) throw new Error(`Nominatim ${geoRes.status}`);
      let geoData = await geoRes.json();
      const isCity = (r: any) => ["city","town","village","municipality","administrative"].includes(r.addresstype || r.type);
      let loc = geoData.find(isCity);

      if (!loc) {
        // Tenta query completo
        geoRes = await fetchFast(`${OSM_SEARCH}?q=${encodeURIComponent(queryStr)}&format=json&limit=5&countrycodes=br`, {
          headers: { "User-Agent": ua, "Accept": "application/json" },
        });
        if (!geoRes.ok) throw new Error(`Nominatim ${geoRes.status}`);
        geoData = await geoRes.json();
        loc = geoData.find(isCity);
      }

      if (loc) {
        // Busca negocios via Google Places API (New)
        const gmRes = await fetchFast("https://places.googleapis.com/v1/places:searchText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_KEY,
            "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.id,places.nationalPhoneNumber,places.websiteUri,places.types,places.location",
          },
          body: JSON.stringify({
            textQuery: queryStr,
            maxResultCount: 20,
            locationBias: {
              circle: {
                center: { latitude: parseFloat(loc.lat), longitude: parseFloat(loc.lon) },
                radius: 10000,
              },
            },
          }),
        });

        if (gmRes.ok) {
          const gmData = await gmRes.json();
          businesses = (gmData.places || []).map((p: any) => ({
            id: `gm_${p.id}`,
            name: p.displayName?.text || "Sem nome",
            address: p.formattedAddress || "",
            phone: p.nationalPhoneNumber || "",
            website: p.websiteUri || "",
            category: (p.types || []).filter((t: string) => t !== "point_of_interest" && t !== "establishment").join(", "),
            lat: p.location?.latitude || null,
            lon: p.location?.longitude || null,
          }));
        } else {
          const errBody = await gmRes.text();
          console.error("Google Places error:", gmRes.status, errBody.substring(0, 300));
        }
      }
    }

    return res.status(200).json({ businesses, count: businesses.length });
  } catch (error: any) {
    console.error("Erro:", error.message);
    return res.status(500).json({ error: "Erro ao buscar negocios", detail: error.message });
  }
}
