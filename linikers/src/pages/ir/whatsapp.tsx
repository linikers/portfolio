import { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Typography } from "@mui/material";
import { WHATSAPP_LINK } from "@/lib/conversaoWhatsapp";

/**
 * Rota de passagem para o WhatsApp — existe para a medição funcionar por URL.
 *
 * Por quê: a ação de conversão do Google Ads do tipo "carregamento de página" mede
 * URLs, e não aceita rótulo de evento. Fazendo o clique passar por aqui, a conversão
 * é medida sem precisar de snippet nenhum (o Google já tem a tag do site).
 *
 * A página dispara o carregamento (que é o que conta) e sai na hora para o WhatsApp.
 */

const PREFIXO_WHATSAPP = "https://wa.me/";

/**
 * Só aceita destino que seja do WhatsApp — sem isso a rota viraria um redirect
 * aberto (qualquer `?to=https://site-malicioso` redirecionaria o visitante).
 */
export function destinoSeguro(entrada?: string | string[] | null): string {
  const valor = Array.isArray(entrada) ? entrada[0] : entrada;
  if (typeof valor === "string" && valor.startsWith(PREFIXO_WHATSAPP)) return valor;
  return WHATSAPP_LINK;
}

export default function IrWhatsapp() {
  const [destino, setDestino] = useState(WHATSAPP_LINK);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const alvo = destinoSeguro(params.get("to"));
    setDestino(alvo);
    window.location.replace(alvo);
  }, []);

  return (
    <>
      <Head>
        <title>Indo para o WhatsApp…</title>
        {/* Página de passagem: não deve aparecer na busca */}
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          fontFamily: "monospace",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography sx={{ fontFamily: "monospace" }}>▸ abrindo o WhatsApp…</Typography>
        {/* Fallback: se o JavaScript demorar ou for bloqueado, o link funciona na mão */}
        <Button
          href={destino}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          sx={{ bgcolor: "#25D366", color: "#fff", "&:hover": { bgcolor: "#20bd5a" }, fontFamily: "monospace" }}
        >
          Abrir o WhatsApp
        </Button>
      </Box>
    </>
  );
}
