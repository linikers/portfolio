// src/pages/admin/gerador/historico.tsx
// Lista de prompts criados pelo usuário autenticado.
// Permite publicar/despublicar e excluir prompts.

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { MdAdd } from "react-icons/md";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "@/config/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import HistoricoList from "@/components/gerador/HistoricoList";
import type { IPrompt } from "@/types/prompt";

export default function HistoricoPage() {
  const [prompts, setPrompts] = useState<IPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchPrompts = async (uid: string) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "prompts"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(q);
      const data: IPrompt[] = snapshot.docs.map((d: any) => {
        const docData = d.data();
        return {
          id: d.id,
          title: docData.title || "",
          description: docData.description || "",
          content: docData.content || "",
          category: docData.category || "outro",
          platform: docData.platform || "geral",
          price: docData.price ?? 0,
          published: docData.published ?? false,
          createdAt:
            docData.createdAt?.toDate?.()?.toISOString() ||
            new Date().toISOString(),
          uid: docData.uid || uid,
        };
      });
      setPrompts(data);
    } catch (err) {
      console.error("[Historico] Erro ao buscar prompts:", err);
      setSnackbar({
        open: true,
        message: "Erro ao carregar histórico.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        fetchPrompts(user.uid);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePublish = async (id: string, published: boolean) => {
    try {
      await updateDoc(doc(db, "prompts", id), { published });
      setPrompts((prev: any) =>
        prev.map((p: any) => (p.id === id ? { ...p, published } : p)),
      );
      setSnackbar({
        open: true,
        message: published
          ? "Prompt publicado na loja!"
          : "Prompt removido da loja.",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Erro ao atualizar status.",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "prompts", id));
      setPrompts((prev: any) => prev.filter((p: any) => p.id !== id));
      setSnackbar({
        open: true,
        message: "Prompt excluído.",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Erro ao excluir.",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="md" className="py-10">
      <Box className="flex flex-col gap-6">
        {/* Header */}
        <Box className="flex items-center justify-between">
          <Typography variant="h5" fontWeight={600}>
            📋 Meus Prompts
          </Typography>
          <Button
            href="/admin/gerador"
            variant="contained"
            startIcon={<MdAdd />}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Criar Novo
          </Button>
        </Box>

        {/* Content */}
        {loading ? (
          <Box className="flex justify-center py-12">
            <CircularProgress />
          </Box>
        ) : (
          <HistoricoList
            prompts={prompts}
            onTogglePublish={handleTogglePublish}
            onDelete={handleDelete}
          />
        )}
      </Box>

      {/* Snackbar */}
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
