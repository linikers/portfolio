// src/pages/loja/[id].tsx
import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Chip,
  Button,
  Paper,
  Divider,
  Alert,
  Breadcrumbs,
  Link,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { MdArrowBack, MdContentCopy, MdShoppingCart } from "react-icons/md";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import type { IPrompt } from "@/types/prompt";
import ReactMarkdown from "react-markdown";
import ComprarModal from "@/components/loja/ComprarModal";

interface PromptDetailPageProps {
  prompt: IPrompt | null;
}

export default function PromptDetailPage({ prompt }: PromptDetailPageProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!prompt) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFree = prompt.price === 0;

  return (
    <Container maxWidth="md" className="py-12">
      <Head>
        <title>{prompt.title} | Loja de Prompts</title>
        <meta name="description" content={prompt.description} />
      </Head>

      <Box mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => router.push("/loja")}
            sx={{ cursor: "pointer" }}
          >
            Loja
          </Link>
          <Typography color="text.primary">{prompt.title}</Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          mb={3}
          gap={2}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              {prompt.title}
            </Typography>
            <Box display="flex" gap={1}>
              <Chip label={prompt.category} size="small" color="primary" />
              <Chip label={prompt.platform} size="small" variant="outlined" />
            </Box>
          </Box>
          <Box textAlign={{ xs: "left", md: "right" }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {isFree ? "Grátis" : `R$ ${prompt.price.toFixed(2)}`}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: 4, lineHeight: 1.7 }}
        >
          {prompt.description}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Preview do Prompt
        </Typography>

        <Box
          sx={{
            p: 3,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            position: "relative",
            minHeight: "200px",
            overflow: "hidden",
            mb: 4,
          }}
        >
          {isFree ? (
            <ReactMarkdown>{prompt.content}</ReactMarkdown>
          ) : (
            <>
              <Box
                sx={{ filter: "blur(4px)", opacity: 0.5, userSelect: "none" }}
              >
                <ReactMarkdown>
                  {prompt.content.substring(0, 300) + "..."}
                </ReactMarkdown>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.4)",
                }}
              >
                <Alert severity="warning" variant="filled">
                  Conteúdo disponível apenas após a compra.
                </Alert>
              </Box>
            </>
          )}
        </Box>

        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<MdArrowBack />}
            onClick={() => router.push("/loja")}
            sx={{ textTransform: "none" }}
          >
            Voltar
          </Button>

          {isFree ? (
            <Button
              fullWidth
              variant="contained"
              startIcon={<MdContentCopy />}
              onClick={handleCopy}
              color={copied ? "success" : "primary"}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              {copied ? "Copiado!" : "Copiar Prompt"}
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              startIcon={<MdShoppingCart />}
              onClick={() => setModalOpen(true)}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Comprar Agora
            </Button>
          )}
        </Box>
      </Paper>

      <ComprarModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        price={prompt.price}
        title={prompt.title}
      />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const db = getAdminFirestore();
    const docRef = db.collection("prompts").doc(id as string);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return { notFound: true };
    }

    const data = docSnap.data()!;
    // Garantir que só mostra se estiver publicado (proteção extra no detalhe)
    if (!data.published) {
      return { notFound: true };
    }

    const prompt = {
      id: docSnap.id,
      title: data.title || "",
      description: data.description || "",
      content: data.content || "",
      category: data.category || "outro",
      platform: data.platform || "geral",
      price: data.price ?? 0,
      published: data.published ?? false,
      createdAt:
        data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      uid: data.uid || "",
    };

    return {
      props: {
        prompt,
      },
    };
  } catch (error) {
    console.error("[Detalhe Loja SSR] Erro:", error);
    return { notFound: true };
  }
};
