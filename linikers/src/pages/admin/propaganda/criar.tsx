// src/pages/admin/propaganda/criar.tsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseClient";
import MenuUser from "@/components/menu";
import EditorPublicacao from "@/components/propaganda/EditorPublicacao";
import { usePropagandaStore } from "@/store/propaganda.store";
import type { PropagandaFormValues } from "@/types/propaganda";

export default function CriarPropagandaPage() {
  const router = useRouter();
  const { createPost, updatePost, posts, isLoading, error } =
    usePropagandaStore();
  const [userId, setUserId] = useState<string | null>(null);
  const { edit } = router.query;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const editingPost = edit ? posts.find((p) => p.id === edit) : null;

  const handleSubmit = async (values: PropagandaFormValues) => {
    if (!userId) return;

    try {
      if (edit) {
        await updatePost(edit as string, { ...values, uid: userId });
      } else {
        await createPost({ ...values, uid: userId });
      }
      router.push("/admin/propaganda");
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };

  return (
    <Container maxWidth="md" className="py-10">
      <Box sx={{ position: "relative", zIndex: 10, mb: 4 }}>
        <MenuUser />
      </Box>

      <Box className="flex flex-col gap-6">
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {edit ? "Editar Publicação" : "Nova Publicação"}
          </Typography>
          <Breadcrumbs sx={{ mt: 1 }}>
            <MuiLink
              underline="hover"
              color="inherit"
              onClick={() => router.push("/admin/propaganda")}
              sx={{ cursor: "pointer" }}
            >
              Propaganda
            </MuiLink>
            <Typography color="text.primary">
              {edit ? "Editar" : "Criar"}
            </Typography>
          </Breadcrumbs>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        <EditorPublicacao
          onSubmit={handleSubmit}
          isLoading={isLoading}
          initialValues={editingPost || undefined}
        />
      </Box>
    </Container>
  );
}
