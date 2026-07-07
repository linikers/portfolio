// /api/prospects/search - busca negocios no OpenStreetMap (gratis, sem chave)
import type { NextApiRequest, NextApiResponse } from "next";

const OSM_SEARCH = "https://nominatim.openstreetmap.org/search";
const OSM_OVERPASS = "https://overpass-api.de/api/interpreter";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { q, lat, lon, radius = 5000 } = req.query;

  try {
    let businesses: any[] = [];

    if (lat && lon) {
      // Busca por coordenadas - Overpass direto
      const overpassQuery = `
        [out:json][timeout:20];
        (
          node["shop"](around:${radius},${lat},${lon});
          node["craft"](around:${radius},${lat},${lon});
          node["office"](around:${radius},${lat},${lon});
          node["amenity"](around:${radius},${lat},${lon});
          way["shop"](around:${radius},${lat},${lon});
          way["craft"](around:${radius},${lat},${lon});
          way["office"](around:${radius},${lat},${lon});
          way["amenity"](around:${radius},${lat},${lon});
        );
        out body;
        out center;
      `;

      const res2 = await fetch(OSM_OVERPASS, {
        method: "POST",
        body: `data=${encodeURIComponent(overpassQuery)}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      if (!res2.ok) throw new Error("OSM error");

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

    } else if (q) {
      // Passo 1: Geocode a cidade/regiao (extrair do query)
      const queryStr = typeof q === "string" ? q : String(q);

      // Tenta geocode com o texto completo primeiro
      let geoRes = await fetch(
        `${OSM_SEARCH}?q=${encodeURIComponent(queryStr)}&format=json&limit=3&addressdetails=1`,
        { headers: { "User-Agent": "LinikersPortfolio/1.0" } }
      );
      if (!geoRes.ok) throw new Error("Geo error");
      let geoData = await geoRes.json();

      // Se achou resultados, usa o primeiro como localizacao
      if (geoData.length > 0) {
        const loc = geoData[0];
        const centerLat = loc.lat;
        const centerLon = loc.lon;

        // Passo 2: Busca negocios perto dessa localizacao via Overpass
        const overpassQuery = `
          [out:json][timeout:25];
          (
            node["shop"](around:${radius},${centerLat},${centerLon});
            node["craft"](around:${radius},${centerLat},${centerLon});
            node["office"](around:${radius},${centerLat},${centerLon});
            node["amenity"](around:${radius},${centerLat},${centerLon});
            way["shop"](around:${radius},${centerLat},${centerLon});
            way["craft"](around:${radius},${centerLat},${centerLon});
            way["office"](around:${radius},${centerLat},${centerLon});
            way["amenity"](around:${radius},${centerLat},${centerLon});
          );
          out body;
          out center;
        `;

        const osmRes = await fetch(OSM_OVERPASS, {
          method: "POST",
          body: `data=${encodeURIComponent(overpassQuery)}`,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        if (!osmRes.ok) throw new Error("OSM error");
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
      }
    }

    return res.status(200).json({ businesses, count: businesses.length });
  } catch (error: any) {
    console.error("Erro ao buscar negocios:", error);
    return res.status(500).json({ error: "Erro ao buscar negocios", detail: error.message });
  }
}
