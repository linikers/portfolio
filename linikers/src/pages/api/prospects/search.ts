// /api/prospects/search - busca negocios no OpenStreetMap (gratis, sem chave)
import type { NextApiRequest, NextApiResponse } from "next";

const OSM_SEARCH = "https://nominatim.openstreetmap.org/search";
const OSM_OVERPASS = "https://overpass-api.de/api/interpreter";
const FETCH_TIMEOUT = 8000; // 8s max por fetch (Vercel Hobby = 10s total)

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = FETCH_TIMEOUT) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { q, lat, lon, radius = 5000 } = req.query;

  try {
    let businesses: any[] = [];

    if (lat && lon) {
      // Busca por coordenadas - Overpass direto (com fallback Nominatim)
      try {
        const overpassQuery = `
          [out:json][timeout:8];
          (
            node["shop"](around:${radius},${lat},${lon});
            node["craft"](around:${radius},${lat},${lon});
            node["amenity"](around:${radius},${lat},${lon});
            way["shop"](around:${radius},${lat},${lon});
            way["craft"](around:${radius},${lat},${lon});
            way["amenity"](around:${radius},${lat},${lon});
          );
          out body;
          out center;
        `;

        const res2 = await fetchWithTimeout(
          `${OSM_OVERPASS}?data=${encodeURIComponent(overpassQuery)}`,
          { method: "GET" }
        );

        if (!res2.ok) throw new Error(`Overpass retornou ${res2.status}`);

        const data = await res2.json();
        businesses = (data.elements || []).map((el: any) => ({
          id: `osm_${el.type}_${el.id}`,
          name: el.tags?.name || el.tags?.operator || el.tags?.brand || "Sem nome",
          address: [el.tags?.["addr:street"], el.tags?.["addr:housenumber"], el.tags?.["addr:city"]].filter(Boolean).join(", ") || "",
          phone: el.tags?.phone || el.tags?.["contact:phone"] || "",
          website: el.tags?.website || el.tags?.["contact:website"] || "",
          category: el.tags?.shop || el.tags?.craft || el.tags?.office || el.tags?.amenity || "",
          lat: el.lat || el.center?.lat,
          lon: el.lon || el.center?.lon,
        }));
      } catch (overpassErr) {
        // Fallback: Nominatim reverse geocode pra buscar negocios
        const fbRes = await fetchWithTimeout(
          `${OSM_SEARCH}?q=${encodeURIComponent(String(lat))},${encodeURIComponent(String(lon))}&format=json&limit=10`,
          { headers: { "User-Agent": "LinikersPortfolio/1.0" } }
        );
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          businesses = fbData.map((r: any) => ({
            id: `fb_${r.osm_type}_${r.osm_id}`,
            name: r.name || r.display_name?.split(",")[0] || "Sem nome",
            address: r.display_name || "",
            phone: r.address?.phone || "",
            website: "",
            category: r.type || "",
            lat: r.lat,
            lon: r.lon,
          }));
        }
      }

    } else if (q) {
      const queryStr = typeof q === "string" ? q : String(q);

      // Extrai possivel cidade do query (geralmente ultima palavra)
      const parts = queryStr.trim().split(/\s+/);
      const cidadeCandidate = parts[parts.length - 1];

      // Tenta geocode só a cidade (prioriza resultado do tipo city/town/municipality)
      let geoRes = await fetchWithTimeout(
        `${OSM_SEARCH}?q=${encodeURIComponent(cidadeCandidate)}&format=json&limit=10&countrycodes=br`,
        { headers: { "User-Agent": "LinikersPortfolio/1.0" } }
      );
      if (!geoRes.ok) throw new Error(`Nominatim retornou ${geoRes.status}`);
      let geoData = await geoRes.json();

      // Filtra APENAS resultados do tipo city/town/village — nada de estabelecimentos
      // Usa addresstype (ex: "municipality") com fallback pra type (ex: "administrative")
      const isCity = (r: any) => ["city","town","village","municipality","administrative"].includes(r.addresstype || r.type);
      let loc = geoData.find(isCity);

      // Se nao achou, tenta o query completo com mesmo filtro
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
        const centerLat = loc.lat;
        const centerLon = loc.lon;

        // Passo 2: Busca negocios perto dessa localizacao via Overpass
        // (fallback pro Nominatim direto se Overpass falhar)
        try {
          const overpassQuery = `
            [out:json][timeout:8];
            (
              node["shop"](around:${radius},${centerLat},${centerLon});
              node["craft"](around:${radius},${centerLat},${centerLon});
              node["amenity"](around:${radius},${centerLat},${centerLon});
              way["shop"](around:${radius},${centerLat},${centerLon});
              way["craft"](around:${radius},${centerLat},${centerLon});
              way["amenity"](around:${radius},${centerLat},${centerLon});
            );
            out body;
            out center;
          `;

          const osmRes = await fetchWithTimeout(
            `${OSM_OVERPASS}?data=${encodeURIComponent(overpassQuery)}`,
            { method: "GET" }
          );

          if (!osmRes.ok) throw new Error(`Overpass retornou ${osmRes.status}`);
          const osmData = await osmRes.json();

          businesses = (osmData.elements || [])
            .filter((el: any) => el.tags?.name) // So com nome
            .map((el: any) => ({
              id: `osm_${el.type}_${el.id}`,
              name: el.tags?.name || el.tags?.operator || el.tags?.brand || "Sem nome",
              address: [el.tags?.["addr:street"], el.tags?.["addr:housenumber"], el.tags?.["addr:city"]].filter(Boolean).join(", ") || "",
              phone: el.tags?.phone || el.tags?.["contact:phone"] || "",
              website: el.tags?.website || el.tags?.["contact:website"] || "",
              category: el.tags?.shop || el.tags?.craft || el.tags?.office || el.tags?.amenity || "",
              lat: el.lat || el.center?.lat,
              lon: el.lon || el.center?.lon,
            }))
            .slice(0, 30); // Limita a 30 resultados
        } catch (overpassErr) {
          // Fallback: busca direto no Nominatim com o query original
          const fallback = await fetchWithTimeout(
            `${OSM_SEARCH}?q=${encodeURIComponent(queryStr)}&format=json&limit=20&countrycodes=br&addressdetails=1`,
            { headers: { "User-Agent": "LinikersPortfolio/1.0" } }
          );
          if (fallback.ok) {
            const fbData = await fallback.json();
            businesses = fbData
              .filter((r: any) => r.type !== "administrative" && r.type !== "city" && r.type !== "town")
              .map((r: any) => ({
                id: `fb_${r.osm_type}_${r.osm_id}`,
                name: r.name || r.display_name?.split(",")[0] || "Sem nome",
                address: r.display_name || "",
                phone: r.address?.phone || "",
                website: "",
                category: r.type || r.category || "",
                lat: r.lat,
                lon: r.lon,
              }))
              .slice(0, 20);
          }
        }
      }
    }

    return res.status(200).json({ businesses, count: businesses.length });
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
