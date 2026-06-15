import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Chip,
} from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LinkIcon from "@mui/icons-material/Link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Conectar() {
  const router = useRouter();
  const { qr, auto } = router.query;
  const [qrData, setQrData] = useState("");
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (qr && typeof qr === "string") {
      setQrData(qr);
    }
  }, [qr]);

  // Auto-refresh se ?auto=1
  useEffect(() => {
    if (auto !== "1") return;
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          window.location.reload();
          return 60;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [auto]);

  if (!qrData) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <QrCodeIcon sx={{ fontSize: 80, opacity: 0.3, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Nenhum QR Code
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Adicione <Chip label="?qr=..." size="small" /> na URL para gerar o QR Code de conexão.
        </Typography>
      </Container>
    );
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(qrData)}`;

  return (
    <Container maxWidth="sm" sx={{ py: 4, textAlign: "center" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Conectar WhatsApp
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Escaneie o QR Code com seu WhatsApp
        </Typography>
      </Box>

      {/* QR Code */}
      <Paper
        elevation={0}
        sx={{
          display: "inline-block",
          p: 2,
          borderRadius: 3,
          bgcolor: "white",
          mb: 3,
          maxWidth: 340,
        }}
      >
        <Box
          component="img"
          src={qrUrl}
          alt="WhatsApp QR Code"
          sx={{
            display: "block",
            width: 1,
            height: "auto",
            borderRadius: 1,
          }}
        />
      </Paper>

      {/* Auto-refresh countdown */}
      {auto === "1" && (
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 3 }}>
          Auto-atualiza em {countdown}s
        </Typography>
      )}

      {/* Steps */}
      <Stepper
        activeStep={-1}
        orientation="vertical"
        sx={{
          textAlign: "left",
          "& .MuiStepLabel-label": { fontSize: "0.9rem" },
        }}
      >
        <Step>
          <StepLabel StepIconComponent={() => <PhoneIphoneIcon sx={{ fontSize: 20, color: "primary.main" }} />}>
            Abra o <b>WhatsApp</b> no seu celular
          </StepLabel>
        </Step>
        <Step>
          <StepLabel StepIconComponent={() => <LinkIcon sx={{ fontSize: 20, color: "primary.main" }} />}>
            Vá em <b>Configurações</b> → <b>Dispositivos conectados</b>
          </StepLabel>
        </Step>
        <Step>
          <StepLabel StepIconComponent={() => <QrCodeIcon sx={{ fontSize: 20, color: "primary.main" }} />}>
            Toque em <b>Conectar um dispositivo</b>
          </StepLabel>
        </Step>
        <Step>
          <StepLabel StepIconComponent={() => <CheckCircleIcon sx={{ fontSize: 20, color: "primary.main" }} />}>
            Aponte a câmera para este <b>QR Code</b>
          </StepLabel>
        </Step>
      </Stepper>

      {/* Footer */}
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 4 }}>
        QR Code válido por tempo limitado. Se expirar, solicite um novo link.
      </Typography>
    </Container>
  );
}
