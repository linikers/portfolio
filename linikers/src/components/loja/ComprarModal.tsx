// src/components/loja/ComprarModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import { MdContentCopy, MdQrCode2 } from "react-icons/md";

const CopyIcon: any = MdContentCopy;
const QrCodeIcon: any = MdQrCode2;
import { useState } from "react";

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

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: "#f9f9f9",
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <QrCodeIcon size={150} className="text-gray-800" />
          </Paper>

          <Alert severity="info" sx={{ width: "100%", mb: 2 }}>
            O acesso será liberado após o envio do comprovante para o
            administrador.
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
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Manter Depois
        </Button>
        <Button onClick={onClose} variant="contained" fullWidth>
          Já realizei o pagamento
        </Button>
      </DialogActions>
    </Dialog>
  );
}
