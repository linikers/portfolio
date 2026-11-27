import { Container, Typography, Box, Button, Grid2 as Grid, Card, List, ListItem, ListItemText } from "@mui/material";
import SEO from "@/components/SEO";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { servico, valorDe } from "@/data/servicos";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Consultoria de Precificação com IA",
  provider: { "@type": "Person", name: "LinikerS - Desenvolvedor Full Stack", url: "https://linikers.cloud" },
  areaServed: [
    { "@type": "City", name: "Maringá", sameAs: "https://pt.wikipedia.org/wiki/Maring%C3%A1" },
    { "@type": "Country", name: "Brasil" },
  ],
  description: "Análise de precificação com inteligência artificial para definir o preço ideal do seu produto. Consultoria online em todo Brasil.",
  offers: { "@type": "Offer", price: String(servico("consultoria-ia-precificacao").preco), priceCurrency: "BRL" },
};

export default function ConsultoriaIA() {
  return (
    <>
      <SEO
        title="Consultoria de Precificação com IA em Maringá"
        description={`Consultoria de precificação com IA em Maringá e todo Brasil. Análise inteligente de mercado, concorrência e custos para definir o preço ideal do seu produto. ${valorDe("consultoria-ia-precificacao")}.`}
        ogImage="/ecommerce-hero.png"
      />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="keywords" content="consultoria de precificação, precificação com IA, análise de preços, precificação inteligente, consultor de precificação online, definir preço ideal, precificação para e-commerce, Maringá, Brasil" />
        <meta name="geo.region" content="BR-PR" />
        <meta name="geo.placename" content="Maringá" />
      </Head>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, minHeight: "80vh" }}>
        
        {/* Hero */}
        <motion.div {...fadeUp}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" sx={{ color: "var(--accent)", letterSpacing: 3, border: "1px solid var(--accent)", px: 2, py: 0.5, display: "inline-block", mb: 2, fontSize: "0.65rem" }}>
              ✦ CONSULTORIA DE PRECIFICAÇÃO COM IA
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: 700, mb: 2, color: "var(--text)", fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
              Precificação Inteligente <span style={{ color: "var(--accent)" }}> com IA </span> — Defina o Preço Ideal do Seu Produto
            </Typography>
            <Typography sx={{ color: "var(--accent-2)", maxWidth: 750, mx: "auto", mb: 4, fontSize: "0.9rem" }}>
              Em Maringá ou em qualquer lugar do Brasil, nossa inteligência artificial analisa mercado, 
              concorrência e custos para recomendar o preço perfeito. Maximize sua margem com dados reais.
            </Typography>
            <Button variant="contained" href="https://wa.me/5544991528386?text=Quero%20consultoria%20IA%20de%20precifica%C3%A7%C3%A3o" target="_blank" sx={{ bgcolor: "var(--accent)", color: "var(--accent-contrast)", fontFamily: "inherit", fontWeight: 600, px: 4, py: 1.5, '&:hover': { bgcolor: "var(--accent-2)" } }}>
              QUERO SABER MAIS
            </Button>
          </Box>
        </motion.div>

        {/* Pricing */}
        <motion.div {...fadeUp}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Card sx={{ maxWidth: 400, mx: "auto", bgcolor: "var(--surface)", border: "1px solid var(--border)", p: 4 }}>
              <Typography variant="overline" sx={{ color: "var(--accent-2)", letterSpacing: 3, fontSize: "0.7rem" }}>CONSULTORIA DE PRECIFICAÇÃO</Typography>
              <Typography variant="h3" sx={{ color: "var(--text)", fontWeight: 700, my: 1 }}>{valorDe("consultoria-ia-precificacao")} <Typography component="span" variant="body1" sx={{ color: "var(--accent-2)" }}>/projeto</Typography></Typography>
              <List dense>
                {["Análise de precificação com IA", "Comparativo de concorrência", "Relatório completo de cenários", "Recomendação de margem ideal", "Suporte por 7 dias"].map((item) => (
                  <ListItem key={item} sx={{ borderBottom: "1px solid var(--border)", py: 1 }}>
                    <ListItemText primary={item} sx={{ "& .MuiListItemText-primary": { fontSize: "0.8rem", color: "var(--muted)" } }} />
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" fullWidth href="https://wa.me/5544991528386?text=Quero%20consultoria%20IA%20de%20precifica%C3%A7%C3%A3o" target="_blank" sx={{ mt: 2, bgcolor: "var(--accent)", color: "var(--accent-contrast)", fontFamily: "inherit", fontWeight: 600, '&:hover': { bgcolor: "var(--accent-2)" } }}>
                CONTRATAR CONSULTORIA DE PRECIFICAÇÃO
              </Button>
            </Card>
          </Box>
        </motion.div>

        {/* Como funciona */}
        <motion.div {...fadeUp}>
          <Typography variant="h2" sx={{ textAlign: "center", mb: 4, fontWeight: 700, color: "var(--text)" }}>
            Como Funciona a <span style={{ color: "var(--accent)" }}>Consultoria de Precificação</span>
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ color: "var(--accent)", fontWeight: 600, mb: 1, fontSize: "1.1rem" }}>1. Análise de Dados</Typography>
                <Typography sx={{ color: "var(--accent-2)", fontSize: "0.85rem" }}>Coletamos dados do seu produto (custo, margem desejada) e do mercado (preço dos concorrentes, volume de vendas em Maringá e Brasil).</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ color: "var(--accent)", fontWeight: 600, mb: 1, fontSize: "1.1rem" }}>2. IA Processa</Typography>
                <Typography sx={{ color: "var(--accent-2)", fontSize: "0.85rem" }}>Nossa inteligência artificial analisa centenas de variáveis e gera cenários de precificação com projeção de resultados.</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ color: "var(--accent)", fontWeight: 600, mb: 1, fontSize: "1.1rem" }}>3. Você Decide</Typography>
                <Typography sx={{ color: "var(--accent-2)", fontSize: "0.85rem" }}>Recebe um relatório completo com recomendações de preço ideal, margem e estratégia — e aplica com 1 clique.</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ width: "100%", height: 300, borderRadius: 1, border: "1px solid var(--border)", overflow: "hidden", position: "relative" }}>
                <Image src="/ecommerce-hero.png" alt="Dashboard de análise de precificação com IA" fill style={{ objectFit: "cover" }} />
              </Box>
            </Grid>
          </Grid>
        </motion.div>

        {/* CTA */}
        <Box sx={{ textAlign: "center", mt: 8, pt: 6, borderTop: "1px solid var(--border)" }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 1, color: "var(--text)", fontSize: "1.5rem" }}>
            Pronto para <span style={{ color: "var(--accent)" }}>maximizar</span> seus lucros com precificação inteligente?
          </Typography>
          <Typography sx={{ color: "var(--accent-2)", mb: 3, fontSize: "0.85rem" }}>Primeira análise gratuita. Sem compromisso. Atendimento em Maringá e todo Brasil.</Typography>
          <Button variant="contained" href="https://wa.me/5544991528386?text=Quero%20consultoria%20IA%20de%20precifica%C3%A7%C3%A3o" target="_blank" sx={{ bgcolor: "var(--accent)", color: "var(--accent-contrast)", fontFamily: "inherit", fontWeight: 600, px: 4, py: 1.5, '&:hover': { bgcolor: "var(--accent-2)" } }}>
            FALAR NO WHATSAPP
          </Button>
        </Box>

      </Container>
    </>
  );
}
