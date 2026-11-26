// Pagina publica de portfolio para leads/prospects
import { Box, Container, Typography, Paper, Grid, Chip, Button, Avatar } from "@mui/material";
import SEO from "@/components/SEO";
import {
  Code as CodeIcon,
  Web as WebIcon,
  Terminal as TerminalIcon,
  Widgets as WidgetsIcon,
  OpenInNew as OpenIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";

const projects = [
  {
    title: "ERC20 Token Lab",
    desc: "Curso completo de criação de token ERC20. Do zero ao deploy na blockchain.",
    tech: ["Next.js", "MUI", "Solidity", "Vercel"],
    link: "https://ecr20ttk.vercel.app",
    icon: <CodeIcon />,
  },
  {
    title: "Rocketstar",
    desc: "Sistema de votação para competições com QR Code, autenticação por jurado e ranking em tempo real.",
    tech: ["Next.js", "MongoDB", "MUI", "JWT"],
    link: "https://github.com/linikers/rocketstar",
    icon: <TerminalIcon />,
  },
  {
    title: "CarCrew Suspensões",
    desc: "E-commerce completo para oficina de suspensão automotiva. Catálogo, carrinho, admin.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "MUI"],
    link: "https://carcrew.com.br",
    icon: <WebIcon />,
  },
  {
    title: "AutoHedge Bot",
    desc: "Bot de trading automatizado com análise de mercado via LLM e swap na Solana.",
    tech: ["Python", "Solana", "Jupiter API", "LLM"],
    link: "https://github.com/linikers/autohedge-bot",
    icon: <WidgetsIcon />,
  },
];

export default function PortfolioPage() {
  const router = useRouter();
  const { ref } = router.query;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfólio — Liniker Ferreira dos Santos",
    url: "https://linikers.cloud/portfolio",
    description:
      "Projetos de desenvolvimento web, e-commerce, Web3 e automação entregues por Liniker.",
    about: { "@type": "Person", name: "Liniker Ferreira dos Santos", url: "https://linikers.cloud" },
  };

  return (
    <>
      <SEO
        title="Portfólio"
        description="Portfólio de Liniker Souza — Desenvolvedor Full Stack especializado em Next.js, React, Node, TypeScript e Web3. Projetos, cases e contato."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Box sx={{ minHeight: "100vh", background: "var(--bg)", py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Avatar
            src="/avatar.jpg"
            alt="Liniker"
            sx={{ width: 80, height: 80, mx: "auto", mb: 2, border: "3px solid var(--accent)" }}
          />
          <Typography variant="h3" sx={{ fontWeight: 800, color: "var(--text)", mb: 1 }}>
            Liniker Souza
          </Typography>
          <Typography sx={{ color: "var(--muted)", fontSize: "1.1rem", mb: 0.5 }}>
            Desenvolvedor Web3 • Full Stack
          </Typography>
          <Typography sx={{ color: "var(--muted)", fontSize: "0.9rem", mb: 3 }}>
            Next.js • React • Node • Solidity • TypeScript • Python
          </Typography>
          {ref && (
            <Chip
              label={`Indicado por: ${ref}`}
              sx={{ background: "rgba(99, 102, 241, 0.15)", color: "var(--accent)", border: "1px solid rgba(99,102,241,0.3)" }}
            />
          )}
        </Box>

        {/* Projetos */}
        <Typography variant="h5" sx={{ color: "var(--text)", fontWeight: 700, mb: 3 }}>
          Projetos Recentes
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {projects.map((p) => (
            <Grid item xs={12} sm={6} key={p.title}>
              <Paper
                sx={{
                  p: 3,
                  background: "var(--surface-2)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 3,
                  height: "100%",
                  transition: "0.2s",
                  "&:hover": { borderColor: "rgba(99,102,241,0.4)", transform: "translateY(-2px)" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ color: "var(--accent)" }}>{p.icon}</Box>
                  <Typography sx={{ color: "var(--text)", fontWeight: 700 }}>{p.title}</Typography>
                </Box>
                <Typography sx={{ color: "var(--muted)", fontSize: "0.9rem", mb: 2 }}>
                  {p.desc}
                </Typography>
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 2 }}>
                  {p.tech.map((t) => (
                    <Chip key={t} label={t} size="small" sx={{ background: "rgba(99,102,241,0.1)", color: "var(--accent)", fontSize: "0.75rem" }} />
                  ))}
                </Box>
                <Button
                  href={p.link}
                  target="_blank"
                  size="small"
                  endIcon={<OpenIcon />}
                  sx={{ color: "var(--accent)", textTransform: "none" }}
                >
                  Ver projeto
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05))",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" sx={{ color: "var(--text)", fontWeight: 700, mb: 1 }}>
            Vamos construir algo juntos?
          </Typography>
          <Typography sx={{ color: "var(--muted)", mb: 2 }}>
            Sistemas web, bots, automação, integrações Web3. Entre em contato.
          </Typography>
          <Button
            variant="contained"
            href="https://wa.me/5544991528386"
            target="_blank"
            sx={{ background: "var(--accent)", color: "var(--accent-contrast)", "&:hover": { background: "var(--accent)", color: "var(--accent-contrast)" } }}
          >
            Fale no WhatsApp
          </Button>
        </Paper>
      </Container>
    </Box>
    </>
  );
}