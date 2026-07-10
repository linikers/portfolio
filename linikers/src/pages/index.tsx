"use client";

import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Chip,
  Grid2,
  Paper,
  keyframes,
} from "@mui/material";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";
import { motion } from "framer-motion";

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
  { title: "polyLink", desc: "Dashboard Polymarket em tempo real", url: "https://github.com/linikers/polyLink" },
  { title: "CarCrew Commerce", desc: "E-commerce de peças automotivas", url: "https://carcrew.com.br" },
  { title: "erc20TokenLab", desc: "Laboratório educacional Web3", url: "https://github.com/linikers/erc20TokenLab" },
];

// ─── Boot sequence lines ─────────────────────
const bootLines = [
  "[BOOT] LinikerS/portfolio v4.2.0",
  "[OK] neural.network...... connected",
  "[OK] theme.engine........ initialized",
  "[OK] modules............. 6 loaded",
  "[OK] auth.session........ active",
  "",
  "> _",
];

// ─── Glitch keyframes ────────────────────────
const glitchAnim = keyframes`
  0% { transform: translate(0); opacity: 1; }
  20% { transform: translate(-3px, 1px); opacity: 0.9; }
  40% { transform: translate(3px, -1px); opacity: 0.8; }
  60% { transform: translate(-2px, 2px); opacity: 0.9; }
  80% { transform: translate(2px, -2px); opacity: 0.95; }
  100% { transform: translate(0); opacity: 1; }
`;

// ─── Stagger variants ────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Home() {
  const [phase, setPhase] = useState<"boot" | "glitch" | "landing">("boot");
  const [visibleLines, setVisibleLines] = useState(0);

  // Auto-play boot sequence
  useEffect(() => {
    if (phase !== "boot") return;

    if (visibleLines < bootLines.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 120);
      return () => clearTimeout(t);
    } else {
      // Move to glitch after last line
      const t = setTimeout(() => setPhase("glitch"), 400);
      return () => clearTimeout(t);
    }
  }, [phase, visibleLines]);

  // Glitch → Landing
  useEffect(() => {
    if (phase !== "glitch") return;
    const t = setTimeout(() => setPhase("landing"), 600);
    return () => clearTimeout(t);
  }, [phase]);

  // ─── BOOT PHASE ────────────────────────────
  if (phase === "boot" || phase === "glitch") {
    return (
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          bgcolor: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'IBM Plex Mono', monospace",
          animation: phase === "glitch" ? `${glitchAnim} 0.4s ease-in-out` : "none",
          "&::before": phase === "glitch"
            ? {
                content: '""',
                position: "absolute",
                inset: 0,
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.03) 2px, rgba(0,255,65,0.03) 4px)",
                zIndex: 1,
                pointerEvents: "none",
              }
            : {},
        }}
      >
        <Box sx={{ textAlign: "left", px: 2 }}>
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <Typography
              key={i}
              sx={{
                fontFamily: "inherit",
                fontSize: { xs: "0.7rem", md: "0.85rem" },
                color: i === bootLines.length - 1 ? "#00ff41" : line.startsWith("[OK]") ? "#22c55e" : line.startsWith("[BOOT]") ? "#22d3ee" : "#94a3b8",
                lineHeight: 1.8,
                whiteSpace: "pre",
                overflow: "hidden",
              }}
            >
              {line}
              {i === visibleLines - 1 && i < bootLines.length - 1 && (
                <Box component="span" sx={{ animation: "blink 1s step-end infinite", color: "#00ff41" }}>
                  _
                </Box>
              )}
            </Typography>
          ))}
        </Box>
      </Box>
    );
  }

  // ─── LANDING PHASE ─────────────────────────
  return (
    <>
      <SEO
        title="Desenvolvedor Full Stack"
        description="Criação de sites, landing pages, sistemas web, bots e automação. Next.js, React, TypeScript, Web3. LinikerS — soluções inteligentes para seu negócio."
        ogImage="/profileImg.jpg"
      />
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        sx={{
          minHeight: "100vh",
          color: "text.primary",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Subtle background */}
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            opacity: 0.03,
            backgroundImage: "url(/assets/bgroomhd.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 8 }}>
          <motion.div variants={containerVariants} initial="hidden" animate="show">
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
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "primary.main",
                      letterSpacing: 3,
                      fontWeight: 600,
                      fontFamily: "monospace",
                      fontSize: "0.75rem",
                    }}
                  >
                    $ cat /home/linikers/README.md
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: "2.5rem", md: "3.75rem" },
                      mt: 1,
                      lineHeight: 1.1,
                      color: "text.primary",
                    }}
                  >
                    LinikerS
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h5"
                    sx={{
                      mt: 1,
                      color: "text.secondary",
                      fontWeight: 400,
                      fontFamily: "monospace",
                      fontSize: { xs: "1rem", md: "1.25rem" },
                    }}
                  >
                    Full-stack Engineer &bull; IA &bull; Web3
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography
                    sx={{
                      mt: 3,
                      color: "text.secondary",
                      maxWidth: 520,
                      lineHeight: 1.7,
                      fontSize: "0.95rem",
                      opacity: 0.7,
                    }}
                  >
                    Construo sistemas inteligentes — de dashboards DeFi a e-commerces com IA generativa. Código limpo, arquitetura pensada e soluções de verdade.
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
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
                          color: "text.secondary",
                          borderColor: "divider",
                          textTransform: "none",
                          fontFamily: "monospace",
                          fontSize: "0.8rem",
                          "&:hover": { borderColor: "primary.main", color: "primary.main", background: "rgba(34,211,238,0.06)" },
                        }}
                      >
                        {s.label}
                      </Button>
                    ))}
                  </Box>
                </motion.div>

                {/* CTA — iniciar conversa */}
                <motion.div variants={itemVariants}>
                  <Button
                    href="/contato"
                    variant="contained"
                    size="large"
                    endIcon={<Box component="span" sx={{ fontFamily: "monospace" }}>→</Box>}
                    sx={{
                      mt: 3,
                      background: "linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)",
                      color: "#000",
                      fontWeight: 700,
                      fontFamily: "monospace",
                      fontSize: "1rem",
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      transition: "all 0.25s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 30px rgba(34,211,238,0.3)",
                        background: "linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)",
                      },
                    }}
                  >
                    $ iniciar conversa
                  </Button>
                </motion.div>
              </Box>

              <motion.div variants={itemVariants}>
                <Box sx={{ flexShrink: 0 }}>
                  <Avatar
                    src="/profileImg.jpg"
                    alt="Liniker"
                    sx={{
                      width: { xs: 160, md: 220 },
                      height: { xs: 160, md: 220 },
                      border: "3px solid",
                      borderColor: "primary.main",
                      boxShadow: "0 0 40px rgba(34,211,238,0.1)",
                    }}
                  />
                </Box>
              </motion.div>
            </Box>

            {/* Tech Stack */}
            <motion.div variants={itemVariants}>
              <Box sx={{ mb: 10 }}>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "monospace", fontWeight: 600, color: "primary.main", mb: 3, fontSize: "0.85rem" }}
                >
                  {"// stack atual"}
                </Typography>
                <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                  {techs.map((t) => (
                    <Chip
                      key={t.label}
                      icon={t.icon}
                      label={t.label}
                      variant="outlined"
                      sx={{
                        color: "text.secondary",
                        borderColor: "divider",
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        "& .MuiChip-icon": { color: "primary.main" },
                        "&:hover": { borderColor: "primary.main", color: "primary.main" },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </motion.div>

            {/* Featured Projects */}
            <motion.div variants={itemVariants}>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "monospace", fontWeight: 600, color: "primary.main", mb: 3, fontSize: "0.85rem" }}
                >
                  {"// projetos em destaque"}
                </Typography>
                <Grid2 container spacing={3}>
                  {featuredProjects.map((p) => (
                    <Grid2 key={p.title} size={{ xs: 12, sm: 4 }}>
                      <Paper
                        sx={{
                          p: 3,
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 3,
                          transition: "all 0.25s",
                          "&:hover": {
                            borderColor: "primary.main",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                          },
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: "monospace" }}>
                          {p.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, fontSize: "0.85rem" }}>
                          {p.desc}
                        </Typography>
                        <Button
                          href={p.url}
                          target="_blank"
                          size="small"
                          sx={{
                            mt: 2,
                            color: "primary.main",
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
            </motion.div>
          </motion.div>
        </Container>
      </MotionBox>
    </>
  );
}