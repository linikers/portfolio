"use client";

import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import { FaGithub, FaLinkedin, FaWhatsapp, FaXTwitter, FaInstagram } from "react-icons/fa6";

const GitHubIcon: any = FaGithub;
const LinkedInIcon: any = FaLinkedin;
const WhatsAppIcon: any = FaWhatsapp;
const XIcon: any = FaXTwitter;
const InstagramIcon: any = FaInstagram;

const socials = [
  { icon: <GitHubIcon size={16} />, url: "https://github.com/linikers", label: "GitHub" },
  { icon: <LinkedInIcon size={16} />, url: "https://linkedin.com/in/linikers", label: "LinkedIn" },
  { icon: <WhatsAppIcon size={16} />, url: "https://wa.me/5544984198075", label: "WhatsApp" },
  { icon: <XIcon size={16} />, url: "https://x.com/linikers", label: "X" },
  { icon: <InstagramIcon size={16} />, url: "https://instagram.com/linikers", label: "Instagram" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        mt: "auto",
        py: 3,
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "0.7rem",
              color: "text.secondary",
              opacity: 0.6,
            }}
          >
            root@linikers:~$ echo &apos;built with Next.js + MUI&apos;
            <br />
            © {new Date().getFullYear()} LinikerS
          </Typography>

          <Stack direction="row" spacing={1}>
            {socials.map((s) => (
              <IconButton
                key={s.label}
                href={s.url}
                target="_blank"
                size="small"
                sx={{
                  color: "text.secondary",
                  opacity: 0.5,
                  transition: "all 0.2s",
                  "&:hover": {
                    color: "primary.main",
                    opacity: 1,
                    background: "rgba(34,211,238,0.06)",
                  },
                }}
              >
                {s.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
