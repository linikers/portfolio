// src/components/gerador/PromptPreview.tsx
// Renderiza o prompt gerado com react-markdown em um container estilizado.
// Componente puro: recebe content via props.

import { Box, Chip, Paper, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

interface PromptPreviewProps {
  content: string;
  provider?: "groq" | "gemini" | null;
}

export default function PromptPreview({
  content,
  provider,
}: PromptPreviewProps) {
  if (!content) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: "center",
          border: "1px dashed",
          borderColor: "divider",
        }}
      >
        <Typography color="text.secondary">
          Nenhum prompt gerado ainda.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box className="flex flex-col gap-2">
      {provider && (
        <Box className="flex justify-end">
          <Chip
            label={`Gerado via ${provider === "groq" ? "Groq (Llama 3.3)" : "Gemini 1.5 Flash"}`}
            size="small"
            color={provider === "groq" ? "primary" : "secondary"}
            variant="outlined"
          />
        </Box>
      )}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: "#fafafa",
          "& p": { mb: 1.5, lineHeight: 1.7 },
          "& ul, & ol": { pl: 3, mb: 1.5 },
          "& li": { mb: 0.5 },
          "& h1, & h2, & h3": { mt: 2, mb: 1 },
          "& code": {
            backgroundColor: "#e8e8e8",
            px: 0.8,
            py: 0.2,
            borderRadius: 1,
            fontSize: "0.9em",
          },
          "& pre": {
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            p: 2,
            borderRadius: 2,
            overflow: "auto",
            my: 1.5,
          },
        }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </Paper>
    </Box>
  );
}
