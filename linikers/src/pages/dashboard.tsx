import { Container, Typography, Box, Grid2, Card, CardContent, Button, Chip } from "@mui/material";
import Link from "next/link";
import {
  Dashboard as DashboardIcon,
  SmartToy,
  Storefront,
  Campaign,
  CurrencyExchange,
  History,
  AddCircle,
} from "@mui/icons-material";

const modulos = [
  {
    title: "Gerador IA",
    desc: "Gerador de prompts e conteúdo com IA. Criação, histórico e edição de resultados.",
    href: "/admin/gerador",
    icon: <SmartToy sx={{ fontSize: 40 }} />,
    tags: ["IA", "Groq", "Zustand"],
    color: "#22d3ee",
  },
  {
    title: "Dashboard Admin",
    desc: "Visão geral com stats, gráficos e navegação rápida entre módulos.",
    href: "/admin/dashboard",
    icon: <DashboardIcon sx={{ fontSize: 40 }} />,
    tags: ["Stats", "Chart.js", "Navegação"],
    color: "#a78bfa",
  },
  {
    title: "Loja de Prompts",
    desc: "Vitrine de prompts IA para venda. Filtros, checkout e integração Firebase.",
    href: "/loja",
    icon: <Storefront sx={{ fontSize: 40 }} />,
    tags: ["Firebase", "Pagamento", "Catálogo"],
    color: "#f59e0b",
  },
  {
    title: "Propaganda",
    desc: "Gestão de campanhas de marketing. Calendário editorial e criação de posts.",
    href: "/admin/propaganda",
    icon: <Campaign sx={{ fontSize: 40 }} />,
    tags: ["Marketing", "Calendário", "Posts"],
    color: "#ef4444",
  },
  {
    title: "Mercado Livre",
    desc: "Painel de integração com Mercado Livre. Cotações e monitoramento de preços.",
    href: "/admin/ml",
    icon: <CurrencyExchange sx={{ fontSize: 40 }} />,
    tags: ["ML API", "Cotações", "Preços"],
    color: "#10b981",
  },
  {
    title: "Histórico",
    desc: "Registro de prompts gerados anteriormente com busca e filtros.",
    href: "/admin/gerador/historico",
    icon: <History sx={{ fontSize: 40 }} />,
    tags: ["Histórico", "Busca", "Filtros"],
    color: "#6366f1",
  },
];

export default function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "monospace",
          fontWeight: 900,
          mb: 1,
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        dashboard/
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontFamily: "monospace",
          fontSize: "0.85rem",
          mb: 2,
        }}
      >
        $ ssh admin@linikers --list-modules
      </Typography>

      {/* Status bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 6,
          p: 1.5,
          px: 2,
          borderRadius: 2,
          background: "rgba(34,211,238,0.05)",
          border: "1px solid",
          borderColor: "divider",
          fontFamily: "monospace",
          fontSize: "0.7rem",
          color: "primary.main",
        }}
      >
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#22c55e", flexShrink: 0 }} />
        system.online ▸ {modulos.length} módulos ativos ▸ authenticated
      </Box>

      <Grid2 container spacing={3}>
        {modulos.map((mod) => (
          <Grid2 key={mod.href} size={{ xs: 12, sm: 6, md: 4 }}>
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
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  borderColor: mod.color,
                  transform: "translateY(-4px)",
                  boxShadow: `0 8px 30px rgba(0,0,0,0.3), 0 0 20px ${mod.color}15`,
                },
              }}
            >
              <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ color: mod.color, mb: 0.5 }}>
                  {mod.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                  }}
                >
                  {mod.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {mod.desc}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 1 }}>
                  {mod.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                        borderRadius: 1,
                        borderColor: "divider",
                        color: "text.secondary",
                      }}
                    />
                  ))}
                </Box>

                <Link href={mod.href} style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.75rem",
                      textTransform: "none",
                      borderColor: mod.color,
                      color: mod.color,
                      borderRadius: 1.5,
                      "&:hover": {
                        borderColor: mod.color,
                        background: `${mod.color}10`,
                      },
                    }}
                  >
                    $ cd {mod.href} →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Footer note */}
      <Typography
        sx={{
          mt: 6,
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: "0.65rem",
          color: "text.secondary",
          opacity: 0.4,
        }}
      >
        ▸ modulos experimentais — acesso restrito
      </Typography>
    </Container>
  );
}
