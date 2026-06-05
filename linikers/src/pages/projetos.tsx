import { Container, Typography, Box, Grid2, Chip, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "next/link";
import Image from "next/image";

// ─── Projetos em Destaque ───────────────────────────
const destaques = [
  {
    title: "polyLink",
    subtitle: "Polymarket Dashboard",
    description: "Dashboard DeFi em tempo real — monitoramento de mercados, preços, orderbook e tendências do Polymarket.",
    url: "https://github.com/linikers/polyLink",
    img: "/polyLink-thumb.png",
    tags: ["Next.js", "TypeScript", "DeFi", "Polymarket API", "MetaMask"],
  },
  {
    title: "CarCrew Commerce",
    subtitle: "E-commerce Automotivo",
    description: "Loja virtual de peças para suspensão. Next.js 16 + MUI, Cloudinary, SEO completo, PWA, integração Melhor Envio.",
    url: "https://carcrew.com.br",
    img: "/carcrew-thumb.png",
    tags: ["Next.js 16", "MUI v9", "Cloudinary", "SEO", "PWA", "PIX"],
  },
  {
    title: "erc20TokenLab",
    subtitle: "Laboratório Web3",
    description: "Plataforma educacional para criação de tokens ERC20. Da ideia ao deploy na Sepolia testnet.",
    url: "https://github.com/linikers/erc20TokenLab",
    img: "/erc20-thumb.png",
    tags: ["Solidity", "React", "Web3", "Sepolia", "MetaMask", "Hardhat"],
  },
  {
    title: "Taiff Connect",
    subtitle: "Backend Enterprise",
    description: "API REST corporativa para sistema de beleza. Express 5, PostgreSQL, RabbitMQ, Docker, Kubernetes (EKS).",
    url: "https://github.com/SistemasTaiffProart/taiff-connect-backend",
    img: "/taiff-thumb.png",
    tags: ["Express 5", "PostgreSQL", "Docker", "K8s", "TypeORM", "RabbitMQ"],
  },
];

// ─── Projetos Anteriores ────────────────────────────
const anteriores = [
  { title: "Rick and Morty", sub: "Utilizando API", desc: "Next.js, Tailwind, Sass, TypeScript, API Rick e Morty com busca e favoritos.", url: "https://rick-morty-ecru.vercel.app/", img: "/rmtumbl.png" },
  { title: "RB Nail Design", sub: "Rafa Bach Nails", desc: "Next.js, Tailwind, Sass, TypeScript.", url: "https://rafabach-nails.vercel.app/", img: "/rbtumbl.png" },
  { title: "Linkfy", sub: "Spotify", desc: "CSS, HTML5 e JavaScript puro com API Deezer. Layout inspirado no Spotify.", url: "https://linikers.github.io/linkfy/", img: "/lftumbl.png" },
  { title: "Kenzie Hub", sub: "Login e senha", desc: "React, TypeScript com login/senha e proteção de rotas criadas manualmente.", url: "https://n-delta-lake.vercel.app/", img: "/khtumbl.png" },
  { title: "Varify", sub: "Lib de Cores", desc: "React, TypeScript.", url: "https://varify.vercel.app/", img: "/vartumbl.png" },
  { title: "Pokemon", sub: "API Pokemon", desc: "React, TypeScript.", url: "https://linikers.github.io/pokemonAPI-v2/", img: "/pktumbl.png" },
  { title: "Dia e Noite", sub: "JS com data", desc: "Animações CSS e JavaScript que mostram se é dia ou noite conforme a hora.", url: "https://linikers.github.io/DiaNoite/", img: "/dntumbl.png" },
  { title: "Twiniker", sub: "Layout básico", desc: "CSS, HTML5 e JavaScript puro.", url: "https://linikers.github.io/Twiniker/", img: "/twtumbl.png" },
  { title: "E-commerce", sub: "Carrinho de compras", desc: "CSS, HTML5 e JavaScript puro com carrinho de compras funcional.", url: "https://linikers.github.io/Geek-Commerce/", img: "/gctumbl.png" },
];

export default function Projetos() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* ─── Header ─────────────────────────── */}
      <Typography
        variant="h2"
        sx={{
          fontFamily: "monospace",
          fontWeight: 900,
          mb: 1,
          fontSize: { xs: "1.8rem", md: "2.5rem" },
        }}
      >
        projetos/
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", mb: 6, fontFamily: "monospace", fontSize: "0.9rem" }}
      >
        $ ls -la ~/workspace/
      </Typography>

      {/* ─── Destaques ───────────────────────── */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          color: "primary.main",
          mb: 3,
          letterSpacing: 2,
          fontSize: "0.8rem",
        }}
      >
        ▸ DESTAQUES
      </Typography>

      <Grid2 container spacing={4} sx={{ mb: 10 }}>
        {destaques.map((p) => (
          <Grid2 key={p.title} size={{ xs: 12, sm: 6 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(8px)",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  borderColor: "primary.main",
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.3), 0 0 20px rgba(34,211,238,0.08)",
                },
              }}
            >
              <Box sx={{ position: "relative", height: 200, overflow: "hidden", bgcolor: "rgba(0,0,0,0.3)" }}>
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 600px) 100vw, 600px"
                />
                {/* Glow overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
                  }}
                />
              </Box>

              <CardContent sx={{ flex: 1, p: 3, pb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "monospace", fontSize: "1.1rem" }}>
                  {p.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.75rem", mb: 1.5 }}>
                  {p.subtitle}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem", lineHeight: 1.7, mb: 2 }}>
                  {p.description}
                </Typography>

                <Stack direction="row" flexWrap="wrap" gap={0.8} sx={{ mb: 2 }}>
                  {p.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.65rem",
                        borderRadius: 1,
                        borderColor: "divider",
                        color: "text.secondary",
                        "&:hover": { borderColor: "primary.main", color: "primary.main" },
                      }}
                    />
                  ))}
                </Stack>

                <Link href={p.url} target="_blank" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<OpenInNewIcon fontSize="small" />}
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.75rem",
                      textTransform: "none",
                      borderRadius: 1.5,
                    }}
                  >
                    Acessar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* ─── Anteriores ──────────────────────── */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          color: "text.secondary",
          mb: 3,
          letterSpacing: 2,
          fontSize: "0.7rem",
          opacity: 0.6,
        }}
      >
        ▸ PROJETOS ANTERIORES
      </Typography>

      <Grid2 container spacing={2}>
        {anteriores.map((p) => (
          <Grid2 key={p.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "rgba(255,255,255,0.015)",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                transition: "all 0.2s",
                opacity: 0.7,
                "&:hover": {
                  opacity: 1,
                  borderColor: "primary.main",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={p.img}
                alt={p.title}
                sx={{ objectFit: "cover", opacity: 0.8 }}
              />
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontFamily: "monospace", fontSize: "0.8rem" }}>
                  {p.title}
                </Typography>
                <Typography variant="caption" sx={{ color: "primary.main", fontFamily: "monospace" }}>
                  {p.sub}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, fontSize: "0.7rem", lineHeight: 1.4 }}>
                  {p.desc}
                </Typography>
                <Link href={p.url} target="_blank" style={{ textDecoration: "none" }}>
                  <Button
                    size="small"
                    sx={{
                      mt: 1,
                      fontFamily: "monospace",
                      fontSize: "0.7rem",
                      textTransform: "none",
                      color: "text.secondary",
                      p: 0,
                      minWidth: 0,
                      "&:hover": { color: "primary.main", background: "none" },
                    }}
                  >
                    Acessar →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
