"use client";

import { Box, Container, Typography, Paper, Grid } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  Terminal as TerminalIcon,
  Campaign as CampaignIcon,
  Groups as GroupsIcon,
  Inventory2 as InventoryIcon,
  Insights as InsightsIcon,
} from "@mui/icons-material";
import Link from "next/link";

const modules = [
  { href: "/admin/visao", label: "Visão do site", icon: <InsightsIcon />, desc: "Visitas, cliques no WhatsApp e origem do lead" },
  { href: "/admin/servicos", label: "Serviços", icon: <InventoryIcon />, desc: "Catálogo, preços e recorrência" },
  { href: "/admin/dashboard", label: "Dashboard", icon: <DashboardIcon />, desc: "Métricas e visão geral" },
  { href: "/admin/ml", label: "Mercado Livre", icon: <StoreIcon />, desc: "Campanhas e vendas ML" },
  { href: "/admin/gerador", label: "Gerador de Conteúdo", icon: <TerminalIcon />, desc: "IA para criar posts" },
  { href: "/admin/propaganda", label: "Propagandas", icon: <CampaignIcon />, desc: "Gerenciar anúncios" },
  { href: "/admin/prospect", label: "Prospecção", icon: <GroupsIcon />, desc: "Leads e captação" },
];

export default function AdminIndex() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}>
          Painel Administrativo
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 4 }}>
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
                    background: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "0.2s",
                    "&:hover": { borderColor: "primary.main", transform: "translateY(-2px)" },
                  }}
                >
                  <Box sx={{ color: "primary.main", fontSize: "2rem" }}>{m.icon}</Box>
                  <Typography sx={{ color: "text.primary", fontWeight: 700 }}>{m.label}</Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", textAlign: "center" }}>{m.desc}</Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
