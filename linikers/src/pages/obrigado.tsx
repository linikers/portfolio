import { Container, Typography, Box, Button } from "@mui/material";
import Head from "next/head";
import SEO from "@/components/SEO";
import { WHATSAPP_NUMERO } from "@/lib/conversaoWhatsapp";

/**
 * Página de obrigado.
 *
 * Para que serve: conversão por URL precisa de uma página que só é alcançada DEPOIS da
 * ação (envio de formulário, cadastro). Hoje o site não tem formulário — esta página já
 * fica pronta para quando tiver, e serve de destino para a ação de conversão por URL.
 *
 * noindex de propósito: é página de passagem, não deve aparecer na busca.
 */

const LINK_WHATSAPP = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  "Acabei de enviar o formulário no site"
)}`;

export default function Obrigado() {
  return (
    <>
      <SEO
        title="Recebi sua mensagem"
        description="Recebi sua mensagem — respondo em até 24h."
      />
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontFamily: "monospace", fontWeight: 900, fontSize: { xs: "1.5rem", md: "2rem" }, mb: 2 }}
        >
          ▸ recebido
        </Typography>
        <Typography sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.9rem", mb: 4, maxWidth: 420 }}>
          Recebi sua mensagem e respondo em até 24h. Se quiser adiantar, me chama no WhatsApp.
        </Typography>
        <Button
          href={LINK_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          sx={{ bgcolor: "#25D366", color: "#fff", "&:hover": { bgcolor: "#20bd5a" }, fontFamily: "monospace" }}
        >
          Falar no WhatsApp
        </Button>
      </Container>
    </>
  );
}
