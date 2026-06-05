import { Container, Typography, Box, Paper } from "@mui/material";
import BoxPinterest from "@/components/boxPinterest";
import infoPerfil from "@/components/infoPerfil";

export default function Perfil() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box
        sx={{
          width: "100%",
          height: 180,
          backgroundImage: "url('/profileImg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 3,
          mb: 4,
          position: "relative",
          border: "1px solid",
          borderColor: "divider",
        }}
      />

      <Typography variant="h2" sx={{ fontFamily: "monospace", fontWeight: 900, mb: 1, fontSize: { xs: "1.5rem", md: "2rem" } }}>
        perfil/
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.85rem", mb: 4 }}>
        $ cat ~/about.md
      </Typography>

      {infoPerfil.map((info: any, index: number) => (
        <Paper key={index} elevation={0} sx={{ p: 2.5, mb: 2, borderRadius: 2, background: "rgba(255,255,255,0.02)", border: "1px solid", borderColor: "divider" }}>
          <Typography variant="subtitle2" sx={{ fontFamily: "monospace", fontWeight: 700, color: "primary.main", mb: 0.5, fontSize: "0.75rem", letterSpacing: 1 }}>
            ▸ {info.titulo}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem", lineHeight: 1.7 }}>
            {info.texto}
          </Typography>
        </Paper>
      ))}

      {/* Pinterest — fundo branco para legibilidade */}
      <Paper elevation={0} sx={{ p: 2.5, mt: 2, borderRadius: 2, background: "rgba(255,255,255,0.02)", border: "1px solid", borderColor: "divider" }}>
        <Typography variant="subtitle2" sx={{ fontFamily: "monospace", fontWeight: 700, color: "primary.main", mb: 2, fontSize: "0.75rem", letterSpacing: 1 }}>
          ▸ Olha o que eu curti!
        </Typography>
        <Box sx={{ bgcolor: "#ffffff", borderRadius: 2, p: 2, minHeight: 400 }}>
          <BoxPinterest />
        </Box>
      </Paper>
    </Container>
  );
}
