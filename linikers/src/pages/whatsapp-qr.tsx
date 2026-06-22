import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Chip,
  IconButton,
} from "@mui/material";
import { QrCode2, Refresh, CheckCircle, Error } from "@mui/icons-material";

const API_BASE = "/api/evo";
const INSTANCE = "nfe-brasil";

export default function WhatsAppQR() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "waiting" | "connected" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [countdown, setCountdown] = useState(30);

  const fetchQR = useCallback(async () => {
    try {
      const statusResp = await fetch(`${API_BASE}/instance/connectionState/${INSTANCE}`);
      if (statusResp.ok) {
        const statusData = await statusResp.json();
        const state = statusData?.instance?.state || statusData?.state;
        if (state === "open") {
          setStatus("connected");
          setQrCode(null);
          return;
        }
      }

      const qrResp = await fetch(`${API_BASE}/instance/connect/${INSTANCE}`);
      if (qrResp.ok) {
        const qrData = await qrResp.json();
        const base64 = qrData?.base64 || qrData?.qr || qrData?.code;
        if (base64) {
          const imgSrc = base64.startsWith("data:") ? base64 : `data:image/png;base64,${base64}`;
          setQrCode(imgSrc);
          setStatus("waiting");
          setCountdown(30);
        } else {
          setStatus("waiting");
          setErrorMsg("Aguardando QR code...");
        }
      } else {
        setStatus("error");
        setErrorMsg(`Erro: HTTP ${qrResp.status}`);
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(`Erro: ${err.message}`);
    }
  }, []);

  useEffect(() => { fetchQR(); }, [fetchQR]);

  useEffect(() => {
    if (status === "connected") return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { fetchQR(); return 30; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status, fetchQR]);

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: "#0a0a0a", py: 4 }}>
      <QrCode2 sx={{ fontSize: 48, color: "#25D366", mb: 1 }} />
      <Typography variant="h4" sx={{ fontFamily: "monospace", fontWeight: 900, color: "#fff", fontSize: "1.2rem", mb: 0.5 }}>whatsapp-qr/</Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.75rem", mb: 3 }}>escaneie para conectar o dispositivo</Typography>

      <Box sx={{ mb: 3 }}>
        {status === "loading" && <Chip icon={<CircularProgress size={14} />} label="Conectando..." sx={{ bgcolor: "#1a1a2e", color: "#fff" }} />}
        {status === "waiting" && <Chip icon={<QrCode2 sx={{ color: "#25D366" }} />} label={`Aguardando scan • ${countdown}s`} sx={{ bgcolor: "#1a1a2e", color: "#fff" }} />}
        {status === "connected" && <Chip icon={<CheckCircle sx={{ color: "#25D366" }} />} label="Conectado!" sx={{ bgcolor: "#1a2e1a", color: "#25D366" }} />}
        {status === "error" && <Chip icon={<Error sx={{ color: "#f44336" }} />} label={errorMsg} sx={{ bgcolor: "#2e1a1a", color: "#f44336" }} />}
      </Box>

      <Box sx={{ width: 280, height: 280, bgcolor: "#fff", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 0 40px rgba(37,211,102,0.15)", border: "2px solid #25D366" }}>
        {status === "connected" ? (
          <Box sx={{ textAlign: "center" }}>
            <CheckCircle sx={{ fontSize: 64, color: "#25D366" }} />
            <Typography sx={{ color: "#333", fontFamily: "monospace", mt: 1, fontWeight: 700 }}>WhatsApp Conectado</Typography>
          </Box>
        ) : qrCode ? (
          <img src={qrCode} alt="QR Code" style={{ width: 250, height: 250, objectFit: "contain" }} />
        ) : (
          <Box sx={{ textAlign: "center", p: 2 }}>
            <CircularProgress sx={{ color: "#25D366" }} />
            <Typography sx={{ color: "#666", fontFamily: "monospace", mt: 2, fontSize: "0.8rem" }}>Gerando QR code...</Typography>
          </Box>
        )}
        {status !== "connected" && (
          <IconButton onClick={fetchQR} sx={{ position: "absolute", top: -12, right: -12, bgcolor: "#25D366", "&:hover": { bgcolor: "#1da851" } }} size="small">
            <Refresh sx={{ color: "#000", fontSize: 18 }} />
          </IconButton>
        )}
      </Box>

      <Box sx={{ mt: 4, p: 2, bgcolor: "#111", borderRadius: 2, border: "1px solid #222", maxWidth: 380, width: "100%" }}>
        <Typography variant="body2" sx={{ color: "#aaa", fontFamily: "monospace", fontSize: "0.8rem", lineHeight: 1.8 }}>
          <span style={{ color: "#25D366" }}>1.</span> Abra WhatsApp no celular<br />
          <span style={{ color: "#25D366" }}>2.</span> Configurações → Aparelhos conectados<br />
          <span style={{ color: "#25D366" }}>3.</span> Conectar aparelho<br />
          <span style={{ color: "#25D366" }}>4.</span> Escaneie o QR code acima<br />
          <span style={{ color: "#25D366" }}>5.</span> QR renova automaticamente
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ color: "#555", fontFamily: "monospace", fontSize: "0.65rem", mt: 2 }}>
        nfe-brasil • auto-refresh 30s
      </Typography>
    </Container>
  );
}
