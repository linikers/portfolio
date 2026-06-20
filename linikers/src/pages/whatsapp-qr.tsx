import { Box, Typography, Container } from "@mui/material";
import { QrCode2 } from "@mui/icons-material";
import { useEffect, useState } from "react";

const QR_SERVER = "http://2.24.115.130:3002";

export default function WhatsAppQR() {
  const [src, setSrc] = useState("");
  const [status, setStatus] = useState("verificando...");
  const [countdown, setCountdown] = useState(15);

  const refresh = () => {
    setSrc(`${QR_SERVER}/qr?t=${Date.now()}`);
    setCountdown(15);
    fetch(`${QR_SERVER}/health`)
      .then((r) => r.json())
      .then((d) =>
        setStatus(d.status === "connected" ? "conectado" : "aguardando scan")
      )
      .catch(() => setStatus("down"));
  };

  useEffect(() => {
    refresh();
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          refresh();
          return 15;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
          mb: 2,
        }}
      >
        escaneie para conectar o dispositivo
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color: status === "conectado" ? "#25D366" : "#ff4444",
          fontFamily: "monospace",
          fontSize: "0.7rem",
          mb: 2,
        }}
      >
        bridge: {status}
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: 350,
          bgcolor: "#fff",
          borderRadius: 3,
          border: "2px solid #25D366",
          p: 2,
          position: "relative",
        }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt="WhatsApp QR Code"
            style={{ width: "100%", display: "block" }}
          />
        ) : (
          <Typography sx={{ color: "#999", fontFamily: "monospace", textAlign: "center", py: 10 }}>
            carregando...
          </Typography>
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: "#555",
          fontFamily: "monospace",
          fontSize: "0.65rem",
          mt: 2,
        }}
      >
        atualiza em {countdown}s • bridge 3000 (principal)
      </Typography>
    </Container>
  );
}
