"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Container,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/ecommerce-maringa", label: "E-COMM" },
  { href: "/projetos", label: "PROJETOS" },
  { href: "/ferramentas", label: "FERRAMENTAS" },
  { href: "/criativo", label: "CRIATIVO" },
  { href: "/perfil", label: "PERFIL" },
  { href: "/blog", label: "BLOG" },
  { href: "/contato", label: "CONTATO" },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    const particles: Particle[] = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [canvasRef]);

  useEffect(() => {
    const cleanup = draw();
    return () => {
      if (cleanup) cleanup();
    };
  }, [draw]);
}

export default function Navbar() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useParticleCanvas(canvasRef);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "transparent",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: 1100,
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 48,
          overflow: "hidden",
          background: "linear-gradient(90deg, rgba(34,211,238,0.05) 0%, rgba(34,211,238,0.02) 50%, rgba(168,85,247,0.05) 100%)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <canvas
          ref={canvasRef}
          width={1280}
          height={48}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              color: "primary.main",
              opacity: 0.6,
              letterSpacing: 3,
            }}
          >
            ▸ neural.network.active
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: "48px !important",
            gap: { xs: 1, md: 3 },
            justifyContent: "center",
            py: 0.5,
          }}
        >
          {navLinks.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: { xs: "0.7rem", md: "0.8rem" },
                    fontWeight: active ? 700 : 400,
                    color: active ? "primary.main" : "text.secondary",
                    letterSpacing: 2,
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "primary.main",
                      background: "rgba(34,211,238,0.06)",
                    },
                  }}
                >
                  [{link.label}]
                </Typography>
              </Link>
            );
          })}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
