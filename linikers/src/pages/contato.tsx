import { Container, Typography, Box, IconButton, Stack } from "@mui/material";
import { WhatsApp } from "@mui/icons-material";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { motion } from "framer-motion";
import Image from "next/image";

const GitHubIcon: any = FaGithub;
const LinkedInIcon: any = FaLinkedin;
const XIcon: any = FaXTwitter;
const InstagramIcon: any = FaInstagram;

const socials = [
  { icon: <GitHubIcon size={22} />, url: "https://github.com/linikers", label: "GitHub" },
  { icon: <LinkedInIcon size={22} />, url: "https://linkedin.com/in/linikers", label: "LinkedIn" },
  { icon: <XIcon size={22} />, url: "https://x.com/linikers", label: "X" },
  { icon: <InstagramIcon size={22} />, url: "https://instagram.com/linikers", label: "Instagram" },
];

export default function Contato() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        py: 8,
      }}
    >
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6], filter: ["brightness(0.7)", "brightness(1.3)", "brightness(0.7)"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/planeta.svg" alt="planeta" width={200} height={200} priority />
      </motion.div>

      <Typography
        variant="h2"
        sx={{
          fontFamily: "monospace",
          fontWeight: 900,
          mt: 4,
          mb: 2,
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        $ ssh contato@linikers
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontFamily: "monospace",
          fontSize: "0.9rem",
          mb: 4,
          maxWidth: 400,
          lineHeight: 1.8,
        }}
      >
        Tem um projeto em mente? Vamos conversar.
        Disponivel para colaboracoes, freelance e ideias malucas.
      </Typography>

      <Stack direction="row" spacing={1.5} mb={4}>
        {socials.map((s) => (
          <IconButton
            key={s.label}
            href={s.url}
            target="_blank"
            sx={{
              color: "text.secondary",
              border: "1px solid",
              borderColor: "divider",
              transition: "all 0.2s",
              "&:hover": {
                color: "primary.main",
                borderColor: "primary.main",
                background: "rgba(34,211,238,0.06)",
              },
            }}
          >
            {s.icon}
          </IconButton>
        ))}
      </Stack>

      <IconButton
        href="https://wa.me/5544984198075"
        target="_blank"
        sx={{
          bgcolor: "#25D366",
          color: "#fff",
          px: 4,
          py: 1.5,
          borderRadius: 3,
          fontFamily: "monospace",
          fontSize: "0.9rem",
          gap: 1,
          "&:hover": { bgcolor: "#20bd5a" },
        }}
      >
        <WhatsApp />
        WhatsApp
      </IconButton>

      <Typography
        sx={{
          mt: 6,
          fontFamily: "monospace",
          fontSize: "0.65rem",
          color: "text.secondary",
          opacity: 0.4,
        }}
      >
        ▸ response.time: ~24h
      </Typography>
    </Container>
  );
}
