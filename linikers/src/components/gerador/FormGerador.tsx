// src/components/gerador/FormGerador.tsx
// Formulário de configuração do gerador — Formik + Yup + MUI.
// Componente puro: recebe onSubmit via props, sem fetching direto.

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

interface FormGeradorProps {
  onSubmit: (values: GeradorFormValues) => void | Promise<void>;
  isLoading: boolean;
}

const validationSchema = Yup.object({
  categoria: Yup.string().required("Selecione uma categoria"),
  plataforma: Yup.string().required("Selecione uma plataforma"),
  objetivo: Yup.string()
    .min(10, "Descreva o objetivo com pelo menos 10 caracteres")
    .required("Descreva o objetivo do prompt"),
  tom: Yup.string().required("Selecione o tom de voz"),
  idioma: Yup.string().required("Selecione o idioma"),
});

const initialValues: GeradorFormValues = {
  categoria: "",
  plataforma: "",
  objetivo: "",
  tom: "",
  idioma: "pt-BR",
};

export default function FormGerador({ onSubmit, isLoading }: FormGeradorProps) {
  const formik = useFormik<GeradorFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-6 w-full max-w-2xl mx-auto"
    >
      <Typography variant="h5" component="h1" className="font-semibold">
        ⚡ Gerador de Prompts com IA
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Configure os parâmetros abaixo e a IA vai gerar um prompt otimizado para
        você.
      </Typography>

      {/* Categoria */}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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

      {/* Plataforma */}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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

      {/* Objetivo */}
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
        error={formik.touched.objetivo && Boolean(formik.errors.objetivo)}
        helperText={formik.touched.objetivo && formik.errors.objetivo}
      />

      {/* Tom de Voz */}
      <FormControl error={formik.touched.tom && Boolean(formik.errors.tom)}>
        <FormLabel id="tom-label">Tom de Voz</FormLabel>
        <RadioGroup
          aria-labelledby="tom-label"
          name="tom"
          value={formik.values.tom}
          onChange={formik.handleChange}
          row
        >
          {PROMPT_TONES.map((t) => (
            <FormControlLabel
              key={t.value}
              value={t.value}
              control={<Radio />}
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

      {/* Idioma */}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {PROMPT_IDIOMAS.map((i) => (
            <MenuItem key={i.value} value={i.value}>
              {i.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Submit */}
      {isLoading ? (
        <Box className="flex flex-col items-center gap-4 py-4">
          <CircularProgress size={32} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            sx={{ borderRadius: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            Gerando prompt com IA...
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
          }}
        >
          🚀 Gerar com IA
        </Button>
      )}
    </Box>
  );
}
