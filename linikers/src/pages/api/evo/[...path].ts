import type { NextApiRequest, NextApiResponse } from "next";

const EVO_URL = "http://2.24.115.130:8085";
const EVO_KEY = "nfe-brasil-2026";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { path } = req.query;
  if (!path || !Array.isArray(path)) {
    return res.status(400).json({ error: "Missing path" });
  }

  const evoPath = `/${path.join("/")}`;
  const url = `${EVO_URL}${evoPath}`;

  try {
    const apiResp = await fetch(url, {
      method: req.method,
      headers: {
        apikey: EVO_KEY,
        "Content-Type": "application/json",
      },
    });

    const contentType = apiResp.headers.get("content-type") || "application/json";
    res.setHeader("Content-Type", contentType);

    const body = await apiResp.text();
    return res.status(apiResp.status).send(body);
  } catch (err: any) {
    return res.status(502).json({ error: "Evolution API unreachable", detail: err.message });
  }
}
