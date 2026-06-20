import { Box, Typography, Container, Button } from "@mui/material";
import { QrCode2, OpenInNew } from "@mui/icons-material";

const QR_URL = "http://2.24.115.130:3002";

export default function WhatsAppQR() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#0a0a0a",
        py: 4,
      }}
    >
      <QrCode2 sx={{ fontSize: 48, color: "#25D366", mb: 1 }} />
      <Typography
        variant="h4"
        sx={{
          fontFamily: "monospace",
          fontWeight: 900,
          color: "#fff",
          fontSize: "1.2rem",
          mb: 0.5,
        }}
      >
        whatsapp-qr/
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontFamily: "monospace",
          fontSize: "0.75rem",
          mb: 4,
        }}
      >
        escaneie para conectar o dispositivo
      </Typography>

      <Button
        variant="contained"
        href={QR_URL}
        target="_blank"
        rel="noopener noreferrer"
        startIcon={<OpenInNew />}
        sx={{
          bgcolor: "#25D366",
          color: "#000",
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: "0.9rem",
          px: 4,
          py: 1.5,
          borderRadius: 2,
          textTransform: "none",
          "&:hover": { bgcolor: "#1da851" },
        }}
      >
        Abrir QR Server
      </Button>

      <Box sx={{ mt: 4, p: 2, bgcolor: "#111", borderRadius: 2, border: "1px solid #222", maxWidth: 380 }}>
        <Typography variant="body2" sx={{ color: "#aaa", fontFamily: "monospace", fontSize: "0.8rem", lineHeight: 1.8 }}>
          <span style={{ color: "#25D366" }}>1.</span> Clique no botão acima<br />
          <span style={{ color: "#25D366" }}>2.</span> WhatsApp → Config → Dispositivos conectados<br />
          <span style={{ color: "#25D366" }}>3.</span> Conectar dispositivo<br />
          <span style={{ color: "#25D366" }}>4.</span> Escaneie o QR<br />
          <span style={{ color: "#25D366" }}>5.</span> QR renova a cada 15s
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: "#555",
          fontFamily: "monospace",
          fontSize: "0.65rem",
          mt: 2,
        }}
      >
        bridge 3000 (principal) • porta 3002
      </Typography>
    </Container>
  );
}
