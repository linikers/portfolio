"use client";

import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Container,
  IconButton,
  Button,
  Drawer,
  Stack,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Link from "next/link";
import { useRouter } from "next/router";
import { WHATSAPP_LINK, registrarConversaoWhatsApp } from "@/lib/conversaoWhatsapp";
import { alternarModo, type Modo } from "@/lib/tema";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/projetos", label: "Projetos" },
  { href: "/ferramentas", label: "Ferramentas" },
  { href: "/criativo", label: "Criativo" },
  { href: "/perfil", label: "Perfil" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar({ modo }: { modo: Modo }) {
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);

  // Fecha o menu ao navegar.
  useEffect(() => {
    setMenuAberto(false);
  }, [router.pathname]);

  const escuro = modo === "dark";
  const rotuloTema = escuro ? "Usar tema claro" : "Usar tema escuro";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "saturate(140%) blur(8px)",
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 60, md: 72 }, gap: 2 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontSize: "1.15rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "text.primary",
              }}
            >
              Liniker
              <Box component="span" sx={{ color: "primary.main" }}>
                S
              </Box>
            </Typography>
          </Link>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, ml: 2, flex: 1 }}>
            {navLinks.map((link) => {
              const ativo = router.pathname === link.href;
              return (
                <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                  <Typography
                    component="span"
                    sx={{
                      display: "inline-block",
                      px: 1.25,
                      py: 0.75,
                      fontSize: "0.875rem",
                      fontWeight: ativo ? 600 : 500,
                      color: ativo ? "text.primary" : "text.secondary",
                      borderBottom: "2px solid",
                      borderColor: ativo ? "primary.main" : "transparent",
                      transition: "color 0.2s, border-color 0.2s",
                      "&:hover": { color: "text.primary" },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              );
            })}
          </Box>

          <Box sx={{ flex: { xs: 1, md: "none" }, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <IconButton
              onClick={alternarModo}
              aria-label={rotuloTema}
              title={rotuloTema}
              size="small"
              sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
            >
              {escuro ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
            </IconButton>

            <Button
              component="a"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={registrarConversaoWhatsApp}
              variant="contained"
              size="small"
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                bgcolor: "primary.main",
                color: "primary.contrastText",
                px: 2.25,
                "&:hover": { bgcolor: "primary.main", opacity: 0.9 },
              }}
            >
              Orçamento
            </Button>

            <IconButton
              onClick={() => setMenuAberto(true)}
              aria-label="Abrir menu"
              size="small"
              sx={{ display: { md: "none" }, color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={menuAberto} onClose={() => setMenuAberto(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>LinikerS</Typography>
            <IconButton onClick={() => setMenuAberto(false)} aria-label="Fechar menu" size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <Stack>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    py: 1.25,
                    fontSize: "0.95rem",
                    color: router.pathname === link.href ? "primary.main" : "text.primary",
                    fontWeight: router.pathname === link.href ? 600 : 400,
                  }}
                >
                  {link.label}
                </Typography>
              </Link>
            ))}
          </Stack>
          <Button
            component="a"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={registrarConversaoWhatsApp}
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: "primary.main", color: "primary.contrastText" }}
          >
            Pedir orçamento
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}
