"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Chip,
  Grid2,
  Paper,
} from "@mui/material";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

const NextIcon: any = require("react-icons/si").SiNextdotjs;
const TsIcon: any = require("react-icons/si").SiTypescript;
const ReactIcon: any = require("react-icons/si").SiReact;
const DockerIcon: any = require("react-icons/si").SiDocker;
const FirebaseIcon: any = require("react-icons/si").SiFirebase;
const SolidityIcon: any = require("react-icons/si").SiSolidity;
const TailwindIcon: any = require("react-icons/si").SiTailwindcss;
const PostgresIcon: any = require("react-icons/si").SiPostgresql;

const GitHubIcon: any = FaGithub;
const LinkedInIcon: any = FaLinkedin;
const WhatsAppIcon: any = FaWhatsapp;
const XIcon: any = FaXTwitter;
const InstagramIcon: any = FaInstagram;

import CanvasBackground from "./components/backgroundDesk/CanvasBackground";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const techs = [
  { icon: <NextIcon size={22} />, label: "Next.js" },
  { icon: <TsIcon size={22} />, label: "TypeScript" },
  { icon: <ReactIcon size={22} />, label: "React" },
  { icon: <DockerIcon size={22} />, label: "Docker" },
  { icon: <FirebaseIcon size={22} />, label: "Firebase" },
  { icon: <SolidityIcon size={22} />, label: "Solidity" },
  { icon: <TailwindIcon size={22} />, label: "Tailwind" },
  { icon: <PostgresIcon size={22} />, label: "Postgres" },
];

const featuredProjects = [
  {
    title: "polyLink",
    desc: "Dashboard Polymarket em tempo real",
    url: "https://github.com/linikers/polyLink",
  },
  {
    title: "CarCrew Commerce",
    desc: "E-commerce de peças automotivas",
    url: "https://carcrew.com.br",
  },
  {
    title: "erc20TokenLab",
    desc: "Laboratório educacional Web3",
    url: "https://github.com/linikers/erc20TokenLab",
  },
];

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    if (booted) {
      const t = setTimeout(() => setShowLanding(true), 600);
      return () => clearTimeout(t);
    }
  }, [booted]);

  if (!booted) {
    return (
      <Box sx={{ cursor: "pointer" }} onClick={() => setBooted(true)}>
        <CanvasBackground onBootComplete={() => setBooted(true)} />
      </Box>
    );
  }

  return (
    showLanding && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          sx={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0a0a0f 0%, #111827 100%)",
            color: "#f0f0f0",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Background sutil - referencia a escrivaninha */}
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              opacity: 0.04,
              backgroundImage: "url(/assets/bgroomhd.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 8 }}>
            {/* Hero */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: 6,
                mb: 10,
                mt: 4,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#22d3ee",
                    letterSpacing: 3,
                    fontWeight: 600,
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                  }}
                >
                  $ cat /home/linikers/README.md
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2.5rem", md: "3.75rem" },
                    mt: 1,
                    lineHeight: 1.1,
                    background: "linear-gradient(to right, #fff, #22d3ee)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  LinikerS
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mt: 1,
                    color: "#94a3b8",
                    fontWeight: 400,
                    fontFamily: "monospace",
                    fontSize: { xs: "1rem", md: "1.25rem" },
                  }}
                >
                  Full-stack Engineer &bull; IA &bull; Web3
                </Typography>
                <Typography
                  sx={{
                    mt: 3,
                    color: "#64748b",
                    maxWidth: 520,
                    lineHeight: 1.7,
                    fontSize: "0.95rem",
                  }}
                >
                  Construo sistemas inteligentes — de dashboards DeFi a 
                  e-commerces com IA generativa. Aqui você encontra 
                  código limpo, arquitetura pensada e soluções de verdade.
                </Typography>

                <Box sx={{ display: "flex", gap: 1.5, mt: 4, flexWrap: "wrap" }}>
                  {[
                    { icon: <GitHubIcon size={18} />, url: "https://github.com/linikers", label: "GitHub" },
                    { icon: <LinkedInIcon size={18} />, url: "https://linkedin.com/in/linikers", label: "LinkedIn" },
                    { icon: <WhatsAppIcon size={18} />, url: "https://wa.me/5544984198075", label: "WhatsApp" },
                    { icon: <XIcon size={18} />, url: "https://x.com/linikers", label: "X" },
                    { icon: <InstagramIcon size={18} />, url: "https://instagram.com/linikers", label: "Instagram" },
                  ].map((s) => (
                    <Button
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      variant="outlined"
                      size="small"
                      startIcon={s.icon}
                      sx={{
                        color: "#94a3b8",
                        borderColor: "#334155",
                        textTransform: "none",
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        "&:hover": {
                          borderColor: "#22d3ee",
                          color: "#22d3ee",
                          background: "rgba(34, 211, 238, 0.08)",
                        },
                      }}
                    >
                      {s.label}
                    </Button>
                  ))}
                </Box>
              </Box>

              <Box sx={{ flexShrink: 0 }}>
                <Avatar
                  src="/profileImg.jpg"
                  alt="Liniker"
                  sx={{
                    width: { xs: 160, md: 220 },
                    height: { xs: 160, md: 220 },
                    border: "3px solid #22d3ee",
                    boxShadow: "0 0 40px rgba(34, 211, 238, 0.15)",
                  }}
                />
              </Box>
            </Box>

            {/* Tech Stack */}
            <Box sx={{ mb: 10 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 600,
                  color: "#22d3ee",
                  mb: 3,
                  fontSize: "0.9rem",
                }}
              >
                {'// stack atual'}
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {techs.map((t) => (
                  <Chip
                    key={t.label}
                    icon={t.icon}
                    label={t.label}
                    sx={{
                      color: "#cbd5e1",
                      borderColor: "#334155",
                      background: "rgba(255,255,255,0.03)",
                      fontFamily: "monospace",
                      fontSize: "0.8rem",
                      "& .MuiChip-icon": { color: "#22d3ee" },
                      "&:hover": {
                        borderColor: "#22d3ee",
                        background: "rgba(34, 211, 238, 0.08)",
                      },
                    }}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>

            {/* Featured Projects */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 600,
                  color: "#22d3ee",
                  mb: 3,
                  fontSize: "0.9rem",
                }}
              >
                {'// projetos em destaque'}
              </Typography>
              <Grid2 container spacing={3}>
                {featuredProjects.map((p) => (
                  <Grid2 key={p.title} size={{ xs: 12, sm: 4 }}>
                    <Paper
                      sx={{
                        p: 3,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid #1e293b",
                        borderRadius: 3,
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: "#22d3ee",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 20px rgba(34, 211, 238, 0.1)",
                        },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: "#f1f5f9",
                          fontFamily: "monospace",
                        }}
                      >
                        {p.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748b", mt: 1, fontSize: "0.85rem" }}
                      >
                        {p.desc}
                      </Typography>
                      <Button
                        href={p.url}
                        target="_blank"
                        size="small"
                        sx={{
                          mt: 2,
                          color: "#22d3ee",
                          textTransform: "none",
                          fontFamily: "monospace",
                          fontSize: "0.8rem",
                          p: 0,
                          "&:hover": { background: "transparent", opacity: 0.8 },
                        }}
                      >
                        $ ver projeto →
                      </Button>
                    </Paper>
                  </Grid2>
                ))}
              </Grid2>
            </Box>

            {/* Footer CTA */}
            <Box
              sx={{
                textAlign: "center",
                pt: 6,
                pb: 4,
                borderTop: "1px solid #1e293b",
                mt: 4,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#475569", fontFamily: "monospace", fontSize: "0.8rem" }}
              >
                root@linikers:~$ echo &apos;disponivel para projetos e colaboracoes&apos;
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#334155", fontFamily: "monospace", fontSize: "0.7rem", mt: 1 }}
              >
                © {new Date().getFullYear()} LinikerS — built with Next.js
              </Typography>
            </Box>
          </Container>
        </MotionBox>
      )
    );
  }
