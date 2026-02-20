// src/pages/admin/gerador/index.tsx
// Página de configuração do Gerador de Prompts.
// Formulário → chama API → armazena resultado no zustand → redireciona para /resultado.

import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Alert } from "@mui/material";
import axios from "axios";
import FormGerador from "@/components/gerador/FormGerador";
import { useGeradorStore } from "@/store/gerador.store";
import type { GeradorFormValues } from "@/types/prompt";

export default function GeradorPage() {
  const router = useRouter();
  const { setGeneratedPrompt, setFormValues, isLoading, setLoading } =
    useGeradorStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: GeradorFormValues) => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post<{
        prompt: string;
        provider: "groq" | "gemini";
      }>("/api/ia/gerar-prompt", {
        categoria: values.categoria,
        plataforma: values.plataforma,
        objetivo: values.objetivo,
        tom: values.tom,
      });

      setFormValues(values);
      setGeneratedPrompt(response.data.prompt, response.data.provider);
      router.push("/admin/gerador/resultado");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Erro inesperado ao gerar o prompt. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" className="py-10">
      <Box className="flex flex-col gap-6">
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        <FormGerador onSubmit={handleSubmit} isLoading={isLoading} />
      </Box>
    </Container>
  );
}
