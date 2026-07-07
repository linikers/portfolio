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
      // Busca por localizacao (coordenadas) - mais precisa
      const overpassQuery = `
        [out:json][timeout:15];
        (
          node["shop"](around:${radius},${lat},${lon});
          node["office"](around:${radius},${lat},${lon});
          node["craft"](around:${radius},${lat},${lon});
          node["amenity"](around:${radius},${lat},${lon});
          way["shop"](around:${radius},${lat},${lon});
          way["office"](around:${radius},${lat},${lon});
          way["craft"](around:${radius},${lat},${lon});
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

      businesses = (osmData.elements || []).map((el: any) => ({
        id: `osm_${el.type}_${el.id}`,
        name: el.tags?.name || el.tags?.operator || "Sem nome",
        address: [
          el.tags?.["addr:street"],
          el.tags?.["addr:housenumber"],
          el.tags?.["addr:city"],
        ].filter(Boolean).join(", ") || "",
        phone: el.tags?.phone || el.tags?.["contact:phone"] || "",
        website: el.tags?.website || el.tags?.["contact:website"] || "",
        category: el.tags?.shop || el.tags?.office || el.tags?.craft || el.tags?.amenity || "",
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
      }));

    } else if (q) {
      // Busca por texto (endereco + tipo de negocio)
      const geoRes = await fetch(
        `${OSM_SEARCH}?q=${encodeURIComponent(q as string)}&format=json&limit=10&addressdetails=1`,
        { headers: { "User-Agent": "LinikersPortfolio/1.0" } }
      );
      if (!geoRes.ok) throw new Error("Geo error");
      const geoData = await geoRes.json();

      businesses = geoData.map((el: any) => ({
        id: `geo_${el.osm_type}_${el.osm_id}`,
        name: el.display_name?.split(",")[0] || el.name || "Sem nome",
        address: el.display_name || "",
        phone: el.address?.phone || "",
        category: el.type || el.category || "",
        lat: el.lat,
        lon: el.lon,
      }));
    }

    return res.status(200).json({ businesses, count: businesses.length });
  } catch (error: any) {
    console.error("Erro ao buscar negocios:", error);
    return res.status(500).json({ error: "Erro ao buscar negocios", detail: error.message });
  }
}
