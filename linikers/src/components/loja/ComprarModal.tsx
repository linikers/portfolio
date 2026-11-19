// src/components/loja/ComprarModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Alert,
} from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";

const CopyIcon: any = MdContentCopy;
const WhatsAppIcon: any = FaWhatsapp;
import { useState } from "react";
import { WHATSAPP_NUMERO } from "@/lib/conversaoWhatsapp";

interface ComprarModalProps {
  open: boolean;
  onClose: () => void;
  price: number;
  title: string;
}

export default function ComprarModal({
  open,
  onClose,
  price,
  title,
}: ComprarModalProps) {
  const [copied, setCopied] = useState(false);
  const pixKey =
    process.env.NEXT_PUBLIC_PIX_KEY || "sua-chave-pix-padrao@email.com";

  const mensagemComprovante = encodeURIComponent(
    `Oi! Paguei R$ ${price.toFixed(2)} pelo prompt "${title}" na loja. Vou enviar o comprovante.`,
  );
  const linkComprovante = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensagemComprovante}`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: "bold" }}>Finalizar Compra</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Você está adquirindo: <strong>{title}</strong>
        </Typography>

        <Box my={3} display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary.main"
            gutterBottom
          >
            R$ {price.toFixed(2)}
          </Typography>

          <Alert severity="info" sx={{ width: "100%", mb: 2 }}>
            Copie a chave PIX, pague o valor e envie o comprovante no WhatsApp.
            O acesso é liberado manualmente depois da confirmação.
          </Alert>

          <Divider sx={{ width: "100%", mb: 2 }} />

          <Typography
            variant="caption"
            color="text.secondary"
            align="center"
            gutterBottom
          >
            Copia e Cola (Chave PIX)
          </Typography>

          <Box
            onClick={handleCopyPix}
            sx={{
              p: 1.5,
              bgcolor: "#f0f0f0",
              borderRadius: 1,
              width: "100%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              "&:hover": { bgcolor: "#e0e0e0" },
            }}
          >
            <Typography variant="body2" noWrap sx={{ maxWidth: "80%" }}>
              {pixKey}
            </Typography>
            <CopyIcon size={18} />
          </Box>
          {copied && (
            <Typography variant="caption" color="success.main">
              Chave copiada!
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, flexDirection: "column", gap: 1 }}>
        <Button
          component="a"
          href={linkComprovante}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          variant="contained"
          fullWidth
          startIcon={<WhatsAppIcon />}
          sx={{ bgcolor: "#25D366", color: "#fff", "&:hover": { bgcolor: "#1ebe5b" } }}
        >
          Já paguei — enviar comprovante
        </Button>
        <Button onClick={onClose} color="inherit" fullWidth>
          Manter Depois
        </Button>
      </DialogActions>
    </Dialog>
  );
}
