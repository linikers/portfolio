// src/pages/admin/propaganda/pagas.tsx
import React, { useEffect } from "react";
import { Box, Typography, Alert, Snackbar } from "@mui/material";
import PropagandaLayout from "@/components/propaganda/PropagandaLayout";
import CampanhasPagas from "@/components/propaganda/CampanhasPagas";
import { usePropagandaStore } from "@/store/propaganda.store";

export default function PagasPage() {
  const { posts, fetchPosts, updatePost, isLoading } = usePropagandaStore();
  const [snackbar, setSnackbar] = React.useState({ open: false, message: "" });

  useEffect(() => {
    fetchPosts("");
  }, [fetchPosts]);

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

        {isLoading && posts.length === 0 ? (
          <Alert severity="info" sx={{ mt: 4 }}>
            Carregando campanhas…
          </Alert>
        ) : posts.filter((p) => p.isPaid).length === 0 ? (
          <Alert severity="info" sx={{ mt: 4 }}>
            Nenhuma campanha paga encontrada. Crie uma nova publicação e marque
            a opção &quot;Impulsionar&quot;.
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
