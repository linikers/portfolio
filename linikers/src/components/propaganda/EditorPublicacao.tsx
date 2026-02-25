// src/components/propaganda/EditorPublicacao.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  Switch,
  FormControlLabel,
  Typography,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { MdAutoAwesome, MdPreview, MdSend } from "react-icons/md";
import {
  PLATFORM_OPTIONS,
  PropagandaFormValues,
  SocialPlatform,
} from "@/types/propaganda";

// Helper component for platform specific preview
const PlatformPreview = ({
  platform,
  content,
}: {
  platform: SocialPlatform;
  content: string;
}) => {
  const bgColorMap: Record<string, string> = {
    instagram: "#fff",
    linkedin: "#f3f2ef",
    x: "#fff",
    whatsapp: "#e5ddd5",
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: bgColorMap[platform] || "#f9fafb",
        border: "1px solid #e5e7eb",
        minHeight: 150,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontWeight: "bold",
          mb: 1,
          display: "block",
          textTransform: "capitalize",
        }}
      >
        Preview {platform}
      </Typography>
      <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
        {content || "O conteúdo aparecerá aqui..."}
      </Typography>
    </Paper>
  );
};

interface EditorPublicacaoProps {
  initialValues?: Partial<PropagandaFormValues>;
  onSubmit: (values: PropagandaFormValues) => void;
  isLoading?: boolean;
}

const validationSchema = Yup.object({
  platforms: Yup.array()
    .min(1, "Selecione pelo menos uma rede social")
    .required("Campo obrigatório"),
  content: Yup.string()
    .min(10, "Conteúdo muito curto")
    .required("Campo obrigatório"),
  scheduledAt: Yup.string().required("Data de agendamento é obrigatória"),
  isPaid: Yup.boolean(),
  budget: Yup.number().when("isPaid", {
    is: true,
    then: (schema) =>
      schema.min(1, "Valor mínimo R$ 1").required("Campo obrigatório"),
  }),
});

export default function EditorPublicacao({
  initialValues,
  onSubmit,
  isLoading,
}: EditorPublicacaoProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const formik = useFormik<PropagandaFormValues>({
    initialValues: {
      platforms: initialValues?.platforms || [],
      content: initialValues?.content || "",
      scheduledAt:
        initialValues?.scheduledAt || new Date().toISOString().slice(0, 16),
      isPaid: initialValues?.isPaid || false,
      budget: initialValues?.budget || 0,
      targetAudience: initialValues?.targetAudience || "",
    },
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const handleGerarIA = async () => {
    if (formik.values.platforms.length === 0) {
      alert("Selecione primeiro as plataformas");
      return;
    }

    setIsGenerating(true);
    try {
      const { data } = await axios.post("/api/ia/gerar-copy", {
        rede: formik.values.platforms[0],
        assunto: "Promoção / Conteúdo do portfólio",
        tom: "profissional",
        cta: "Clique para saber mais",
      });
      formik.setFieldValue("content", data.copy);
    } catch (error) {
      console.error("Falha ao gerar copy:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-6"
    >
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Box className="flex flex-col gap-5">
          {/* Plataformas */}
          <Autocomplete
            multiple
            id="platforms"
            options={PLATFORM_OPTIONS.map((opt) => opt.value)}
            getOptionLabel={(option) =>
              PLATFORM_OPTIONS.find((o) => o.value === option)?.label || option
            }
            value={formik.values.platforms}
            onChange={(_, val) => formik.setFieldValue("platforms", val)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Publicar em"
                error={formik.touched.platforms && !!formik.errors.platforms}
                helperText={
                  formik.touched.platforms &&
                  (formik.errors.platforms as string)
                }
              />
            )}
          />

          {/* Conteúdo com Botão IA */}
          <Box position="relative">
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Conteúdo da Publicação"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && !!formik.errors.content}
              helperText={formik.touched.content && formik.errors.content}
            />
            <Button
              size="small"
              startIcon={
                isGenerating ? (
                  <CircularProgress size={16} />
                ) : (
                  <MdAutoAwesome />
                )
              }
              onClick={handleGerarIA}
              disabled={isGenerating}
              sx={{
                position: "absolute",
                bottom: 30,
                right: 10,
                textTransform: "none",
              }}
              variant="contained"
              color="secondary"
            >
              Gerar com IA
            </Button>
          </Box>

          {/* Agendamento */}
          <TextField
            fullWidth
            type="datetime-local"
            label="Data de Agendamento"
            name="scheduledAt"
            value={formik.values.scheduledAt}
            onChange={formik.handleChange}
            InputLabelProps={{ shrink: true }}
            error={formik.touched.scheduledAt && !!formik.errors.scheduledAt}
            helperText={formik.touched.scheduledAt && formik.errors.scheduledAt}
          />

          {/* Promoção Paga */}
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.isPaid}
                  onChange={(_, val) => formik.setFieldValue("isPaid", val)}
                />
              }
              label="Impulsionar esta publicação"
            />

            {formik.values.isPaid && (
              <Box className="flex flex-col gap-4 mt-3 p-4 bg-blue-50 rounded-lg">
                <TextField
                  fullWidth
                  type="number"
                  label="Orçamento"
                  name="budget"
                  value={formik.values.budget}
                  onChange={formik.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Público Alvo"
                  name="targetAudience"
                  value={formik.values.targetAudience}
                  onChange={formik.handleChange}
                  placeholder="Ex: Desenvolvedores, 25-35 anos, SP"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Previews Section */}
      {formik.values.platforms.length > 0 && (
        <Box>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Resultados por Plataforma
          </Typography>
          <Box mt={1}>
            <Tabs
              value={activeTab}
              onChange={(_, val) => setActiveTab(val)}
              sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
            >
              {formik.values.platforms.map((p) => (
                <Tab key={p} label={p} sx={{ textTransform: "capitalize" }} />
              ))}
            </Tabs>
            <PlatformPreview
              platform={formik.values.platforms[activeTab]}
              content={formik.values.content}
            />
          </Box>
        </Box>
      )}

      {/* Submit Button */}
      <Box className="flex justify-end gap-3">
        <Button
          variant="outlined"
          onClick={() => window.history.back()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={isLoading ? <CircularProgress size={20} /> : <MdSend />}
          disabled={isLoading}
          sx={{ px: 4 }}
        >
          {isLoading ? "Salvando..." : "Salvar Publicação"}
        </Button>
      </Box>
    </Box>
  );
}
