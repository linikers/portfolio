// src/pages/admin/propaganda/pagas.tsx
import React, { useEffect } from "react";
import { Box, Typography, Alert, Snackbar } from "@mui/material";
import type { GetServerSideProps } from "next";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import PropagandaLayout from "@/components/propaganda/PropagandaLayout";
import CampanhasPagas from "@/components/propaganda/CampanhasPagas";
import { usePropagandaStore } from "@/store/propaganda.store";
import type { IPost } from "@/types/propaganda";

interface PagasPageProps {
  initialPosts: IPost[];
}

export default function PagasPage({ initialPosts }: PagasPageProps) {
  const { posts, updatePost, isLoading } = usePropagandaStore();
  const [snackbar, setSnackbar] = React.useState({ open: false, message: "" });

  useEffect(() => {
    usePropagandaStore.setState({ posts: initialPosts });
  }, [initialPosts]);

  const handleROIUpdate = async (id: string, roi: number) => {
    try {
      await updatePost(id, { ...posts.find((p) => p.id === id), roi } as any);
      setSnackbar({ open: true, message: "ROI atualizado com sucesso!" });
    } catch (error) {
      setSnackbar({ open: true, message: "Erro ao atualizar ROI." });
    }
  };

  return (
    <PropagandaLayout>
      <Box className="flex flex-col gap-6">
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Gestão de Campanhas Pagas
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Monitoramento de orçamento e retorno sobre investimento de anúncios
            impulsionados.
          </Typography>
        </Box>

        {initialPosts.length === 0 ? (
          <Alert severity="info" sx={{ mt: 4 }}>
            Nenhuma campanha paga encontrada. Crie uma nova publicação e marque
            a opção "Impulsionar".
          </Alert>
        ) : (
          <CampanhasPagas
            posts={posts.filter((p) => p.isPaid)}
            onUpdateROI={handleROIUpdate}
          />
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </Box>
    </PropagandaLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const db = getAdminFirestore();
    // Filter by isPaid in server-side
    const snapshot = await db
      .collection("posts")
      .where("isPaid", "==", true)
      .get();

    const initialPosts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        scheduledAt:
          data.scheduledAt?.toDate?.()?.toISOString() || data.scheduledAt,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
      };
    });

    return { props: { initialPosts } };
  } catch (error) {
    console.error("Pagas SSR error:", error);
    return { props: { initialPosts: [] } };
  }
};
