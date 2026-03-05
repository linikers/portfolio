// src/pages/admin/gerador/resultado.tsx
// Preview do prompt gerado — ações: regenerar, copiar, editar, publicar na loja.

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import {
  MdContentCopy,
  MdEdit,
  MdPublish,
  MdRefresh,
  MdArrowBack,
} from "react-icons/md";

const CopyIcon: any = MdContentCopy;
const EditIcon: any = MdEdit;
const PublishIcon: any = MdPublish;
const RefreshIcon: any = MdRefresh;
const BackIcon: any = MdArrowBack;
import axios from "axios";
import { db, auth } from "@/config/firebaseClient";
import PromptPreview from "@/components/gerador/PromptPreview";
import PublicarModal from "@/components/gerador/PublicarModal";
import { useGeradorStore } from "@/store/gerador.store";
import type { PublicarPromptPayload } from "@/types/prompt";

export default function ResultadoPage() {
  const router = useRouter();
  const {
    generatedPrompt,
    provider,
    formValues,
    setGeneratedPrompt,
    setLoading,
    isLoading,
  } = useGeradorStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Redireciona se não há prompt gerado (acesso direto à URL)
  useEffect(() => {
    if (!generatedPrompt) {
      router.replace("/admin/gerador");
    }
  }, [generatedPrompt, router]);

  const currentContent = isEditing ? editContent : generatedPrompt;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentContent);
      setSnackbar({
        open: true,
        message: "Prompt copiado!",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Erro ao copiar.",
        severity: "error",
      });
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      // Salvar edições
      setGeneratedPrompt(editContent, provider || "groq");
      setIsEditing(false);
    } else {
      setEditContent(generatedPrompt);
      setIsEditing(true);
    }
  };

  const handleRegenerate = async () => {
    if (!formValues) return;

    setLoading(true);
    try {
      const response = await axios.post<{
        prompt: string;
        provider: "groq" | "gemini";
      }>("/api/ia/gerar-prompt", {
        categoria: formValues.categoria,
        plataforma: formValues.plataforma,
        objetivo: formValues.objetivo,
        tom: formValues.tom,
      });
      setGeneratedPrompt(response.data.prompt, response.data.provider);
      setIsEditing(false);
      setSnackbar({
        open: true,
        message: "Prompt regenerado!",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Erro ao regenerar.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublicar = async (payload: PublicarPromptPayload) => {
    const user = auth.currentUser;
    if (!user) {
      setSnackbar({
        open: true,
        message: "Você precisa estar logado.",
        severity: "error",
      });
      return;
    }

    setPublishing(true);
    try {
      const postId = `post_${Date.now()}`;

      const formData = new FormData();
      formData.append("uid", user.uid);
      formData.append("postId", postId);
      formData.append("prompt", currentContent);

      const metadata = {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        createdAt: new Date().toISOString(),
        uid: user.uid,
        provider: provider || "manual",
      };
      formData.append("metadata", JSON.stringify(metadata));

      if (formValues?.imagem) {
        formData.append("imagem", formValues.imagem);
      }

      // Chamada para a API que resolve no Servidor (sem erro de CORS)
      await axios.post("/api/gerador/salvar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setModalOpen(false);
      setSnackbar({
        open: true,
        message: "Publicação realizada com sucesso! (Arquivos no Storage)",
        severity: "success",
      });

      setTimeout(() => {
        router.push("/admin/gerador/historico");
      }, 800);
    } catch (error: any) {
      console.error("Erro ao publicar via API:", error);
      setSnackbar({
        open: true,
        message: "Erro ao salvar arquivos via servidor. Tente novamente.",
        severity: "error",
      });
    } finally {
      setPublishing(false);
    }
  };

  if (!generatedPrompt) return null;

  return (
    <Container maxWidth="md" className="py-10">
      <Box className="flex flex-col gap-6">
        {/* Header */}
        <Box className="flex items-center justify-between">
          <Box className="flex items-center gap-2">
            <Button
              startIcon={<BackIcon />}
              onClick={() => router.push("/admin/gerador")}
              sx={{ textTransform: "none" }}
            >
              Voltar
            </Button>
            <Typography variant="h5" fontWeight={600}>
              Resultado
            </Typography>
          </Box>
        </Box>

        {/* Preview ou Editor */}
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            minRows={8}
            value={editContent}
            onChange={(e: any) => setEditContent(e.target.value)}
            label="Editar Prompt"
          />
        ) : (
          <PromptPreview content={generatedPrompt} provider={provider} />
        )}

        {/* Ações */}
        <Box className="flex flex-wrap gap-2">
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRegenerate}
            disabled={isLoading}
            sx={{ textTransform: "none" }}
          >
            {isLoading ? "Regenerando..." : "Regenerar"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<CopyIcon />}
            onClick={handleCopy}
            sx={{ textTransform: "none" }}
          >
            Copiar
          </Button>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            color={isEditing ? "success" : "inherit"}
            sx={{ textTransform: "none" }}
          >
            {isEditing ? "Salvar Edição" : "Editar"}
          </Button>
          <Button
            variant="contained"
            startIcon={<PublishIcon />}
            onClick={() => setModalOpen(true)}
            sx={{ textTransform: "none", fontWeight: 600, ml: "auto" }}
          >
            Publicar na Loja
          </Button>
        </Box>
      </Box>

      {/* Modal de Publicação */}
      <PublicarModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onPublicar={handlePublicar}
        isLoading={publishing}
      />

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s: any) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
