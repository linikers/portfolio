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

const BackIcon: any = MdArrowBack;
const CopyIcon: any = MdContentCopy;
const CartIcon: any = MdShoppingCart;
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
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0E0E0E 0%, #111 100%)",
        color: "#F5F5F5",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Head>
          <title>{prompt.title} | Loja de Prompts</title>
          <meta name="description" content={prompt.description} />
        </Head>

        <Box mb={4}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              "& .MuiBreadcrumbs-separator": { color: "rgba(255,255,255,0.3)" },
            }}
          >
            <Link
              underline="hover"
              color="inherit"
              onClick={() => router.push("/loja")}
              sx={{
                cursor: "pointer",
                color: "rgba(255,255,255,0.6)",
                "&:hover": { color: "white" },
              }}
            >
              Loja
            </Link>
            <Typography sx={{ color: "white" }}>{prompt.title}</Typography>
          </Breadcrumbs>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            color: "white",
          }}
        >
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
                fontWeight={900}
                sx={{ textTransform: "uppercase", letterSpacing: 1 }}
                gutterBottom
              >
                {prompt.title}
              </Typography>
              <Box display="flex" gap={1}>
                <Chip
                  label={prompt.category}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "white",
                    fontWeight: "bold",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <Chip
                  label={prompt.platform}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                />
              </Box>
            </Box>
            <Box textAlign={{ xs: "left", md: "right" }}>
              <Typography
                variant="h4"
                sx={{ color: "#4ade80", fontWeight: 900 }}
              >
                {isFree ? "Grátis" : `R$ ${prompt.price.toFixed(2)}`}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.7)",
              mb: 4,
              lineHeight: 1.8,
              fontSize: "1.1rem",
            }}
          >
            {prompt.description}
          </Typography>

          <Divider sx={{ mb: 4, borderColor: "rgba(255,255,255,0.1)" }} />

          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "white" }}
          >
            Preview do Prompt
          </Typography>

          <Box
            sx={{
              p: 3,
              bgcolor: "rgba(0,0,0,0.3)",
              borderRadius: 3,
              position: "relative",
              minHeight: "200px",
              overflow: "hidden",
              mb: 4,
              border: "1px solid rgba(255,255,255,0.05)",
              "& p, & pre, & code": {
                color: "rgba(255,255,255,0.8)",
              },
            }}
          >
            {isFree ? (
              <Box sx={{ "& > *": { margin: 0 } }}>
                <ReactMarkdown>{prompt.content}</ReactMarkdown>
              </Box>
            ) : (
              <>
                <Box
                  sx={{ filter: "blur(8px)", opacity: 0.3, userSelect: "none" }}
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
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  <Alert
                    severity="warning"
                    variant="outlined"
                    sx={{
                      bgcolor: "rgba(255, 152, 0, 0.1)",
                      color: "#ff9800",
                      borderColor: "#ff9800",
                      fontWeight: "bold",
                    }}
                  >
                    Conteúdo disponível após a compra.
                  </Alert>
                </Box>
              </>
            )}
          </Box>

          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<BackIcon />}
              onClick={() => router.push("/loja")}
              sx={{
                textTransform: "none",
                borderColor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Voltar
            </Button>

            {isFree ? (
              <Button
                fullWidth
                variant="contained"
                startIcon={<CopyIcon />}
                onClick={handleCopy}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  bgcolor: copied ? "#4ade80" : "white",
                  color: "black",
                  "&:hover": {
                    bgcolor: copied ? "#22c55e" : "rgba(255,255,255,0.9)",
                  },
                }}
              >
                {copied ? "Copiado!" : "Copiar Prompt"}
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                startIcon={<CartIcon />}
                onClick={() => setModalOpen(true)}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  bgcolor: "white",
                  color: "black",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
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
    </Box>
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
