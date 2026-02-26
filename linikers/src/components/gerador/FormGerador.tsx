// Componente puro: recebe onSubmit via props, sem fetching direto.

import * as React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  TextField,
  Typography,
  SelectChangeEvent,
  Paper,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  PROMPT_CATEGORIES,
  PROMPT_IDIOMAS,
  PROMPT_PLATFORMS,
  PROMPT_TONES,
} from "@/types/prompt";
import type { GeradorFormValues } from "@/types/prompt";
import { MdCloudUpload, MdDelete, MdImage } from "react-icons/md";

interface FormGeradorProps {
  onSubmit: (values: GeradorFormValues) => void | Promise<void>;
  isLoading: boolean;
}

const validationSchema = Yup.object({
  /* BLOCO IA DESATIVADO - FUTURA REATIVAÇÃO
  categoria: Yup.string().required("Selecione uma categoria"),
  plataforma: Yup.string().required("Selecione uma plataforma"),
  objetivo: Yup.string()
    .min(10, "Descreva o objetivo com pelo menos 10 caracteres")
    .required("Descreva o objetivo do prompt"),
  tom: Yup.string().required("Selecione o tom de voz"),
  idioma: Yup.string().required("Selecione o idioma"),
  */
  prompt: Yup.string()
    .min(10, "O prompt deve ter pelo menos 10 caracteres")
    .required("O conteúdo do prompt é obrigatório"),
  imagem: Yup.mixed().required("A imagem do produto é obrigatória"),
});

const initialValues: GeradorFormValues = {
  categoria: "",
  plataforma: "",
  objetivo: "",
  tom: "",
  idioma: "pt-BR",
  prompt: "",
  imagem: null,
};

export default function FormGerador({ onSubmit, isLoading }: FormGeradorProps) {
  const [preview, setPreview] = React.useState<string | null>(null);

  const formik = useFormik<GeradorFormValues>({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: GeradorFormValues) => {
      await onSubmit(values);
    },
  });

  // Gerar preview da imagem
  React.useEffect(() => {
    if (!formik.values.imagem) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(formik.values.imagem);
    setPreview(objectUrl);

    // Free memory when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [formik.values.imagem]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("imagem", file);
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("imagem", null);
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-6 w-full max-w-2xl mx-auto"
    >
      <Typography variant="h5" component="h1" className="font-semibold">
        📝 Publicador de Prompts
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Cole seu prompt otimizado e anexe uma imagem do produto para publicação.
      </Typography>

      {/* BLOCO IA DESATIVADO - FUTURA REATIVAÇÃO
      <FormControl
        fullWidth
        error={formik.touched.categoria && Boolean(formik.errors.categoria)}
      >
        <InputLabel id="categoria-label">Categoria</InputLabel>
        <Select
          labelId="categoria-label"
          label="Categoria"
          name="categoria"
          value={formik.values.categoria}
          onChange={(e: SelectChangeEvent) =>
            formik.setFieldValue("categoria", e.target.value)
          }
          onBlur={formik.handleBlur}
          disabled={isLoading}
        >
          {PROMPT_CATEGORIES.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.label}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.categoria && formik.errors.categoria && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
            {formik.errors.categoria}
          </Typography>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={formik.touched.plataforma && Boolean(formik.errors.plataforma)}
      >
        <InputLabel id="plataforma-label">Plataforma Alvo</InputLabel>
        <Select
          labelId="plataforma-label"
          label="Plataforma Alvo"
          name="plataforma"
          value={formik.values.plataforma}
          onChange={(e: SelectChangeEvent) =>
            formik.setFieldValue("plataforma", e.target.value)
          }
          onBlur={formik.handleBlur}
          disabled={isLoading}
        >
          {PROMPT_PLATFORMS.map((p) => (
            <MenuItem key={p.value} value={p.value}>
              {p.label}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.plataforma && formik.errors.plataforma && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
            {formik.errors.plataforma}
          </Typography>
        )}
      </FormControl>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Objetivo do Prompt"
        name="objetivo"
        placeholder="Ex: Criar um prompt para gerar posts de Instagram sobre marketing digital..."
        value={formik.values.objetivo}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={isLoading}
        error={formik.touched.objetivo && Boolean(formik.errors.objetivo)}
        helperText={formik.touched.objetivo && formik.errors.objetivo}
      />
      */}

      {/* Novo Campo: Upload de Imagem */}
      <Box>
        <FormLabel
          error={formik.touched.imagem && Boolean(formik.errors.imagem)}
          sx={{ mb: 1, display: "block", fontWeight: 500 }}
        >
          Imagem do Produto *
        </FormLabel>

        {!preview ? (
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              borderStyle: "dashed",
              textAlign: "center",
              cursor: "pointer",
              bgcolor: "grey.50",
              "&:hover": { bgcolor: "grey.100" },
              borderColor:
                formik.touched.imagem && formik.errors.imagem
                  ? "error.main"
                  : "divider",
            }}
            component="label"
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <MdCloudUpload size={48} color="#666" />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Clique para fazer upload ou arraste a imagem
            </Typography>
            <Typography variant="caption" color="text.secondary">
              PNG, JPG ou WEBP (Max 5MB)
            </Typography>
          </Paper>
        ) : (
          <Box sx={{ position: "relative", width: "100%", height: 300 }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 8,
                backgroundColor: "#f5f5f5",
              }}
            />
            <IconButton
              onClick={handleRemoveImage}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(255,255,255,0.8)",
                "&:hover": { bgcolor: "#fff" },
              }}
              color="error"
              disabled={isLoading}
            >
              <MdDelete />
            </IconButton>
          </Box>
        )}
        {formik.touched.imagem && formik.errors.imagem && (
          <Typography
            variant="caption"
            color="error"
            sx={{ mt: 0.5, display: "block" }}
          >
            {formik.errors.imagem as string}
          </Typography>
        )}
      </Box>

      {/* Novo Campo: Prompt Manual */}
      <TextField
        fullWidth
        multiline
        rows={8}
        label="Conteúdo do Prompt (Markdown suportado) *"
        name="prompt"
        placeholder="Cole aqui o texto final do seu prompt..."
        value={formik.values.prompt}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={isLoading}
        error={formik.touched.prompt && Boolean(formik.errors.prompt)}
        helperText={formik.touched.prompt && formik.errors.prompt}
      />

      {/* BLOCO IA DESATIVADO - FUTURA REATIVAÇÃO
      <FormControl error={formik.touched.tom && Boolean(formik.errors.tom)}>
        <FormLabel id="tom-label">Tom de Voz</FormLabel>
        <RadioGroup
          aria-labelledby="tom-label"
          name="tom"
          value={formik.values.tom}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            formik.setFieldValue("tom", e.target.value)
          }
          row
        >
          {PROMPT_TONES.map((t) => (
            <FormControlLabel
              key={t.value}
              value={t.value}
              control={<Radio disabled={isLoading} />}
              label={t.label}
            />
          ))}
        </RadioGroup>
        {formik.touched.tom && formik.errors.tom && (
          <Typography variant="caption" color="error">
            {formik.errors.tom}
          </Typography>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={formik.touched.idioma && Boolean(formik.errors.idioma)}
      >
        <InputLabel id="idioma-label">Idioma</InputLabel>
        <Select
          labelId="idioma-label"
          label="Idioma"
          name="idioma"
          value={formik.values.idioma}
          onChange={(e: SelectChangeEvent) =>
            formik.setFieldValue("idioma", e.target.value)
          }
          onBlur={formik.handleBlur}
          disabled={isLoading}
        >
          {PROMPT_IDIOMAS.map((i) => (
            <MenuItem key={i.value} value={i.value}>
              {i.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      */}

      {/* Submit */}
      {isLoading ? (
        <Box className="flex flex-col items-center gap-4 py-4">
          <CircularProgress size={32} />
          <Typography variant="body2" color="text.secondary">
            Processando publicação...
          </Typography>
        </Box>
      ) : (
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{
            py: 1.5,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          🚀 Publicar Prompt
        </Button>
      )}
    </Box>
  );
}
