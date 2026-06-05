import { Container, Typography, Box, Grid2, Card, CardContent, CardMedia, Button, Chip } from "@mui/material";
import Link from "next/link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useEffect } from "react";

export default function Criativo() {
  // Load Pinterest embed script
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://assets.pinterest.com/js/pinit.js";
    script.setAttribute("data-pin-hover", "true");
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" sx={{ fontFamily: "monospace", fontWeight: 900, mb: 1, fontSize: { xs: "1.5rem", md: "2rem" } }}>
        criativo/
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.85rem", mb: 6 }}>
        $ cat ~/inspiration/board.md
      </Typography>

      {/* Pinterest Board */}
      <Typography variant="h6" sx={{ fontFamily: "monospace", fontWeight: 700, color: "primary.main", mb: 3, letterSpacing: 2, fontSize: "0.8rem" }}>
        ▸ PINTEREST / ARTE
      </Typography>
      <Box
        sx={{
          p: 3,
          mb: 8,
          borderRadius: 3,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
          minHeight: 400,
        }}
      >
        <a
          data-pin-do="embedBoard"
          data-pin-board-width="800"
          data-pin-scale-height="400"
          data-pin-scale-width="80"
          href="https://www.pinterest.com/liniker/arte/"
        />
      </Box>

      {/* Design Tools */}
      <Typography variant="h6" sx={{ fontFamily: "monospace", fontWeight: 700, color: "primary.main", mb: 3, letterSpacing: 2, fontSize: "0.8rem" }}>
        ▸ FERRAMENTAS DE DESIGN
      </Typography>
      <Grid2 container spacing={3} sx={{ mb: 8 }}>
        {[
          { title: "Figma", desc: "Prototipação e design system. Componentes, auto-layout, variáveis.", url: "https://figma.com", tags: ["UI", "Prototype", "Systems"], color: "#a78bfa" },
          { title: "Excalidraw", desc: "Diagramas e wireframes com estilo hand-drawn. Perfeito para arquitetura.", url: "https://excalidraw.com", tags: ["Wireframe", "Diagram", "Sketch"], color: "#22d3ee" },
          { title: "Impeccable", desc: "Framework de critique de design. Heurísticas, anti-padrões, polish.", url: "https://github.com/pbakaus/impeccable", tags: ["Critique", "UX", "Polish"], color: "#f59e0b" },
        ].map((tool) => (
          <Grid2 key={tool.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(8px)",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                transition: "all 0.25s",
                "&:hover": { borderColor: tool.color, transform: "translateY(-2px)", boxShadow: `0 4px 20px ${tool.color}10` },
              }}
            >
              <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1.5, height: "100%" }}>
                <Typography variant="h6" sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.95rem" }}>
                  {tool.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem", lineHeight: 1.6, flex: 1 }}>
                  {tool.desc}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                  {tool.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontFamily: "monospace", fontSize: "0.6rem", borderRadius: 1, borderColor: "divider", color: "text.secondary" }} />
                  ))}
                </Box>
                <Link href={tool.url} target="_blank" style={{ textDecoration: "none" }}>
                  <Button variant="outlined" size="small" endIcon={<OpenInNewIcon fontSize="small" />} fullWidth
                    sx={{ fontFamily: "monospace", fontSize: "0.75rem", textTransform: "none", borderRadius: 1.5, mt: 1 }}>
                    Acessar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* AI / Creative */}
      <Typography variant="h6" sx={{ fontFamily: "monospace", fontWeight: 700, color: "primary.main", mb: 3, letterSpacing: 2, fontSize: "0.8rem" }}>
        ▸ IA CRIATIVA
      </Typography>
      <Grid2 container spacing={3}>
        {[
          { title: "ComfyUI", desc: "Geração de imagens, video e audio com Stable Diffusion. Workflows nodais.", tags: ["Stable Diffusion", "Img2Img", "ControlNet"], color: "#ec4899" },
          { title: "Suno / HeartMuLa", desc: "Geração de música com IA. Letras + estilo → música completa.", tags: ["Music Gen", "Audio", "Creative"], color: "#10b981" },
          { title: "Design MD", desc: "Especificação de design tokens no formato Google DESIGN.md.", tags: ["Tokens", "Spec", "System"], color: "#6366f1" },
        ].map((item) => (
          <Grid2 key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(8px)",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                transition: "all 0.25s",
                "&:hover": { borderColor: item.color, transform: "translateY(-2px)", boxShadow: `0 4px 20px ${item.color}10` },
              }}
            >
              <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography variant="h6" sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.95rem" }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem", lineHeight: 1.6 }}>
                  {item.desc}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                  {item.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontFamily: "monospace", fontSize: "0.6rem", borderRadius: 1, borderColor: "divider", color: "text.secondary" }} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Typography sx={{ mt: 6, textAlign: "center", fontFamily: "monospace", fontSize: "0.65rem", color: "text.secondary", opacity: 0.4 }}>
        ▸ design.engine.active — inspiracao em fluxo continuo
      </Typography>
    </Container>
  );
}
