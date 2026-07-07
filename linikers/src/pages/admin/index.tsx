"use client";

import { Box, Container, Typography, Paper, Grid } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  Terminal as TerminalIcon,
  Campaign as CampaignIcon,
  Groups as GroupsIcon,
} from "@mui/icons-material";
import Link from "next/link";

const modules = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <DashboardIcon />, desc: "Métricas e visão geral" },
  { href: "/admin/ml", label: "Mercado Livre", icon: <StoreIcon />, desc: "Campanhas e vendas ML" },
  { href: "/admin/gerador", label: "Gerador de Conteúdo", icon: <TerminalIcon />, desc: "IA para criar posts" },
  { href: "/admin/propaganda", label: "Propagandas", icon: <CampaignIcon />, desc: "Gerenciar anúncios" },
  { href: "/admin/prospect", label: "Prospecção", icon: <GroupsIcon />, desc: "Leads e captação" },
];

export default function AdminIndex() {
  return (
    <Box sx={{ minHeight: "100vh", background: "#0a0a0f", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff", mb: 1 }}>
          Painel Administrativo
        </Typography>
        <Typography sx={{ color: "#64748b", mb: 4 }}>
          Gerencie suas ferramentas e integrações.
        </Typography>

        <Grid container spacing={3}>
          {modules.map((m) => (
            <Grid item xs={12} sm={6} md={4} key={m.href}>
              <Link href={m.href} passHref legacyBehavior>
                <Paper
                  component="a"
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.5,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 3,
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "0.2s",
                    "&:hover": { borderColor: "rgba(99,102,241,0.4)", transform: "translateY(-2px)" },
                  }}
                >
                  <Box sx={{ color: "#818cf8", fontSize: "2rem" }}>{m.icon}</Box>
                  <Typography sx={{ color: "#e2e8f0", fontWeight: 700 }}>{m.label}</Typography>
                  <Typography sx={{ color: "#64748b", fontSize: "0.85rem", textAlign: "center" }}>{m.desc}</Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
