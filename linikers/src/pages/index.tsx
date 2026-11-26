"use client";

import Link from "next/link";
import SEO from "@/components/SEO";
import { WHATSAPP_LINK, registrarConversaoWhatsApp } from "@/lib/conversaoWhatsapp";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Grid2,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const NextIcon: any = require("react-icons/si").SiNextdotjs;
const TsIcon: any = require("react-icons/si").SiTypescript;
const ReactIcon: any = require("react-icons/si").SiReact;
const DockerIcon: any = require("react-icons/si").SiDocker;
const FirebaseIcon: any = require("react-icons/si").SiFirebase;
const SolidityIcon: any = require("react-icons/si").SiSolidity;
const TailwindIcon: any = require("react-icons/si").SiTailwindcss;
const PostgresIcon: any = require("react-icons/si").SiPostgresql;

const techs = [
  { icon: <NextIcon size={18} />, label: "Next.js" },
  { icon: <TsIcon size={18} />, label: "TypeScript" },
  { icon: <ReactIcon size={18} />, label: "React" },
  { icon: <DockerIcon size={18} />, label: "Docker" },
  { icon: <FirebaseIcon size={18} />, label: "Firebase" },
  { icon: <SolidityIcon size={18} />, label: "Solidity" },
  { icon: <TailwindIcon size={18} />, label: "Tailwind" },
  { icon: <PostgresIcon size={18} />, label: "Postgres" },
];

const frentes = [
  {
    num: "01 · WEB",
    titulo: "Sites e landing pages",
    texto:
      "Página que carrega rápido, aparece no Google e leva o visitante para o WhatsApp. Do one-page ao site completo.",
    href: "/criacao-de-sites",
    cta: "Ver escopo e prazo",
  },
  {
    num: "02 · SISTEMAS",
    titulo: "Lojas, painéis e automação",
    texto:
      "E-commerce com PIX, painel de pedidos e integrações sob medida. O sistema acompanha a operação, não o contrário.",
    href: "/ecommerce-maringa",
    cta: "Ver loja e sistema",
  },
  {
    num: "03 · IA",
    titulo: "Consultoria e IA aplicada",
    texto:
      "Precificação, atendimento e análise de dados com agentes que trabalham todo dia. Decisão com número, não com achismo.",
    href: "/consultoria-ia",
    cta: "Ver consultoria",
  },
];

const featuredProjects = [
  { title: "polyLink", desc: "Dashboard Polymarket em tempo real", url: "https://github.com/linikers/polyLink" },
  { title: "CarCrew Commerce", desc: "E-commerce de peças automotivas", url: "https://carcrew.com.br" },
  { title: "erc20TokenLab", desc: "Laboratório educacional Web3", url: "https://github.com/linikers/erc20TokenLab" },
];

const stats = [
  { titulo: "Sites e sistemas", texto: "do briefing ao deploy" },
  { titulo: "Delta Sistemas", texto: "desde 2023" },
  { titulo: "Full-stack", texto: "Next · Node · Web3" },
  { titulo: "1:1", texto: "direto com quem faz" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Home() {
  // Dados estruturados da home: é o que um motor de resposta (ChatGPT, Perplexity,
  // resumo de IA do Google) lê para saber quem é o Liniker e o que ele vende.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://linikers.cloud/#liniker",
        name: "Liniker Ferreira dos Santos",
        alternateName: "LinikerS",
        url: "https://linikers.cloud",
        jobTitle: "Desenvolvedor Full Stack",
        image: "https://linikers.cloud/profileImg.jpg",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Maringá",
          addressRegion: "PR",
          addressCountry: "BR",
        },
        knowsAbout: [
          "desenvolvimento web",
          "Next.js",
          "React",
          "Node.js",
          "contratos inteligentes",
          "automação de WhatsApp",
        ],
        sameAs: ["https://github.com/linikers", "https://www.linkedin.com/in/linikers"],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://linikers.cloud/#servico",
        name: "LinikerS — Criação de Sites e Sistemas",
        url: "https://linikers.cloud",
        description:
          "Criação de sites, landing pages, lojas virtuais e sistemas web sob medida, com automação de WhatsApp e integrações.",
        areaServed: { "@type": "Country", name: "Brasil" },
        founder: { "@id": "https://linikers.cloud/#liniker" },
        provider: { "@id": "https://linikers.cloud/#liniker" },
        priceRange: "R$ 499 - R$ 2.999",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Maringá",
          addressRegion: "PR",
          addressCountry: "BR",
        },
      },
    ],
  };

  return (
    <>
      <SEO
        title="Criação de Sites e Sistemas Sob Medida | LinikerS"
        description="Criação de sites, landing pages e sistemas web sob medida para vender mais. Código próprio, entrega combinada e suporte com quem desenvolve. Peça seu orçamento."
        ogImage="/profileImg.jpg"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          {/* Hero */}
          <Grid2
            container
            spacing={{ xs: 5, md: 6 }}
            alignItems="center"
            sx={{ mb: { xs: 8, md: 12 } }}
          >
            <Grid2 size={{ xs: 12, md: 7 }}>
              <motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "text.secondary",
                    fontWeight: 500,
                  }}
                >
                  Full-stack engineer · Maringá, PR
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.1rem", sm: "2.7rem", md: "3.4rem" },
                    mt: 1.5,
                    lineHeight: 1.12,
                    color: "text.primary",
                    maxWidth: 620,
                  }}
                >
                  Sites e sistemas sob medida para{" "}
                  <Box component="em" sx={{ fontStyle: "italic", color: "primary.main" }}>
                    vender melhor
                  </Box>
                  .
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    mt: 2.5,
                    color: "text.secondary",
                    maxWidth: 540,
                    lineHeight: 1.75,
                    fontSize: "1rem",
                  }}
                >
                  Onze anos construindo produto: landing pages, lojas, painéis e automações.
                  Código próprio, prazo combinado por escrito e suporte com quem escreveu o
                  código.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={{ display: "flex", gap: 1.5, mt: 4, flexWrap: "wrap" }}>
                  <Button
                    component="a"
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={registrarConversaoWhatsApp}
                    variant="contained"
                    size="large"
                    endIcon={<Box component="span">→</Box>}
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      px: 3.5,
                      py: 1.25,
                      fontSize: "1rem",
                      "&:hover": { bgcolor: "primary.main", opacity: 0.9 },
                    }}
                  >
                    Pedir orçamento
                  </Button>
                  <Button
                    component={Link}
                    href="/projetos"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "divider",
                      color: "text.primary",
                      px: 3,
                      py: 1.25,
                      fontSize: "1rem",
                      "&:hover": { borderColor: "primary.main", bgcolor: "transparent" },
                    }}
                  >
                    Ver projetos
                  </Button>
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography sx={{ mt: 2, fontSize: "0.8rem", color: "text.secondary" }}>
                  Resposta no mesmo dia útil. Sem proposta genérica.
                </Typography>
              </motion.div>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 5 }}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: "10px",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    boxShadow: "0 1px 2px rgba(20,24,31,0.04)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        bgcolor: "background.default",
                        border: "1px solid",
                        borderColor: "divider",
                        display: "grid",
                        placeItems: "center",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "text.secondary",
                      }}
                    >
                      LFS
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
                        Liniker Ferreira
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                        Full-stack · Maringá, PR
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2.5, display: "grid", gap: 1.5 }}>
                    {stats.map((s) => (
                      <Box key={s.titulo} sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <Typography sx={{ fontSize: "0.85rem", fontWeight: 600 }}>{s.titulo}</Typography>
                        <Typography sx={{ fontSize: "0.82rem", color: "text.secondary", textAlign: "right" }}>
                          {s.texto}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ mt: 2.5, pt: 2, borderTop: "1px solid", borderColor: "divider", display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                    {techs.map((t) => (
                      <Chip
                        key={t.label}
                        label={t.label}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: "0.72rem",
                          color: "text.secondary",
                          borderColor: "divider",
                          "& .MuiChip-label": { px: 1 },
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid2>
          </Grid2>

          {/* O que eu faço */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", md: "1.9rem" }, color: "text.primary" }}>
                O que eu faço
              </Typography>
              <Typography sx={{ mt: 1, color: "text.secondary", maxWidth: 620 }}>
                Três frentes, um responsável. Você fala com quem decide e com quem executa.
              </Typography>
            </Box>
          </motion.div>

          <Grid2 container spacing={2.5} sx={{ mb: { xs: 8, md: 10 } }}>
            {frentes.map((f) => (
              <Grid2 key={f.num} size={{ xs: 12, md: 4 }}>
                <motion.div variants={itemVariants} style={{ height: "100%" }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "8px",
                      bgcolor: "background.paper",
                      transition: "border-color 0.2s, transform 0.2s",
                      "&:hover": { borderColor: "primary.main", transform: "translateY(-2px)" },
                    }}
                  >
                    <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "text.secondary" }}>
                      {f.num}
                    </Typography>
                    <Typography sx={{ mt: 1, fontSize: "1.05rem", fontWeight: 600, color: "text.primary" }}>
                      {f.titulo}
                    </Typography>
                    <Typography sx={{ mt: 1, fontSize: "0.9rem", color: "text.secondary", lineHeight: 1.65, flex: 1 }}>
                      {f.texto}
                    </Typography>
                    <Link href={f.href} style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          mt: 2.5,
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "primary.main",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {f.cta} →
                      </Typography>
                    </Link>
                  </Paper>
                </motion.div>
              </Grid2>
            ))}
          </Grid2>

          {/* Projetos em destaque */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" } }}>
                Projetos em destaque
              </Typography>
              <Link href="/projetos" style={{ textDecoration: "none" }}>
                <Typography sx={{ fontSize: "0.85rem", color: "primary.main", fontWeight: 600 }}>
                  Ver todos →
                </Typography>
              </Link>
            </Box>
            <Grid2 container spacing={2.5}>
              {featuredProjects.map((p) => (
                <Grid2 key={p.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: "100%",
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "8px",
                      transition: "border-color 0.2s, transform 0.2s",
                      "&:hover": {
                        borderColor: "primary.main",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>{p.title}</Typography>
                    <Typography sx={{ color: "text.secondary", mt: 0.75, fontSize: "0.85rem" }}>
                      {p.desc}
                    </Typography>
                    <Button
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{
                        mt: 2,
                        p: 0,
                        minWidth: 0,
                        color: "primary.main",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        "&:hover": { background: "transparent", textDecoration: "underline" },
                      }}
                    >
                      Ver projeto →
                    </Button>
                  </Paper>
                </Grid2>
              ))}
            </Grid2>
          </motion.div>
        </motion.div>
      </Container>
    </>
  );
}
