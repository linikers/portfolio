import { Box, Typography, Container } from "@mui/material";
import { QrCode2 } from "@mui/icons-material";

const QR_SERVER = "https://2.24.115.130:3004";

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
      <QrCode2 sx={{ fontSize: 40, color: "#25D366", mb: 1 }} />
      <Typography
        variant="h4"
        sx={{
          fontFamily: "monospace",
          fontWeight: 900,
          color: "#fff",
          fontSize: "1.1rem",
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
          fontSize: "0.7rem",
          mb: 3,
        }}
      >
        escaneie para conectar o dispositivo
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          aspectRatio: "1",
          borderRadius: 3,
          overflow: "hidden",
          border: "2px solid #25D366",
          bgcolor: "#fff",
        }}
      >
        <iframe
          src={QR_SERVER}
          title="WhatsApp QR"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
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
        QR renova a cada 15s • bridge 3000 (principal)
      </Typography>
    </Container>
  );
}
