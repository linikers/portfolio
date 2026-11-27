"use client";

import Link from "next/link";
import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import { FaGithub, FaLinkedin, FaWhatsapp, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { WHATSAPP_LINK, registrarConversaoWhatsApp } from "@/lib/conversaoWhatsapp";

const GitHubIcon: any = FaGithub;
const LinkedInIcon: any = FaLinkedin;
const WhatsAppIcon: any = FaWhatsapp;
const XIcon: any = FaXTwitter;
const InstagramIcon: any = FaInstagram;

const socials = [
  { icon: <GitHubIcon size={16} />, url: "https://github.com/linikers", label: "GitHub" },
  { icon: <LinkedInIcon size={16} />, url: "https://linkedin.com/in/linikers", label: "LinkedIn" },
  { icon: <WhatsAppIcon size={16} />, url: WHATSAPP_LINK, label: "WhatsApp", medir: true },
  { icon: <XIcon size={16} />, url: "https://x.com/linikers", label: "X" },
  { icon: <InstagramIcon size={16} />, url: "https://instagram.com/linikers", label: "Instagram" },
];

const links = [
  { href: "/projetos", label: "Projetos" },
  { href: "/ferramentas", label: "Ferramentas" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        mt: "auto",
        py: 4,
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={3}
        >
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "text.primary" }}>
              Liniker
              <Box component="span" sx={{ color: "primary.main" }}>
                S
              </Box>
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: "text.secondary", mt: 0.5 }}>
              Sites e sistemas sob medida · Maringá, PR
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {l.label}
                </Typography>
              </Link>
            ))}
          </Stack>

          <Stack direction="row" spacing={0.5}>
            {socials.map((s) => (
              <IconButton
                key={s.label}
                component="a"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                size="small"
                onClick={s.medir ? registrarConversaoWhatsApp : undefined}
                sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
              >
                {s.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>

        <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", mt: 3 }}>
          © {new Date().getFullYear()} LinikerS · Feito com Next.js e MUI
        </Typography>
      </Container>
    </Box>
  );
}
