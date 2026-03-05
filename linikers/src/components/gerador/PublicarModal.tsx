// src/components/gerador/PublicarModal.tsx
// Dialog MUI para publicar um prompt na loja — Formik form com título, descrição e preço.
// Componente puro: controlado via props open/onClose, recebe onPublicar callback.

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { PublicarPromptPayload } from "@/types/prompt";

interface PublicarModalProps {
  open: boolean;
  onClose: () => void;
  onPublicar: (payload: PublicarPromptPayload) => void | Promise<void>;
  isLoading: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Título precisa ter no mínimo 5 caracteres")
    .required("Título é obrigatório"),
  description: Yup.string()
    .min(10, "Descrição precisa ter no mínimo 10 caracteres")
    .required("Descrição é obrigatória"),
  price: Yup.number()
    .min(0, "Preço não pode ser negativo")
    .required("Informe o preço (0 para gratuito)"),
});

export default function PublicarModal({
  open,
  onClose,
  onPublicar,
  isLoading,
}: PublicarModalProps) {
  const formik = useFormik<PublicarPromptPayload>({
    initialValues: {
      title: "",
      description: "",
      price: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      await onPublicar(values);
    },
  });

  const handleClose = () => {
    if (!isLoading) {
      formik.resetForm();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 600 }}>📦 Publicar na Loja</DialogTitle>
      <DialogContent>
        <form
          id="publicar-form"
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 pt-2"
        >
          <TextField
            fullWidth
            label="Título do Prompt"
            name="title"
            placeholder="Ex: Prompt para Posts de Instagram sobre Tech"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Descrição"
            name="description"
            placeholder="Descreva brevemente o que este prompt faz..."
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            fullWidth
            type="number"
            label="Preço"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={
              formik.touched.price && formik.errors.price
                ? formik.errors.price
                : "Use 0 para prompts gratuitos"
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            inputProps={{ min: 0, step: 0.5 }}
          />
        </form>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form="publicar-form"
          variant="contained"
          disabled={isLoading}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          {isLoading ? "Publicando..." : "Publicar como Rascunho"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
