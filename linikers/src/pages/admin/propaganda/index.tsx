// src/pages/admin/propaganda/index.tsx
import React, { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseClient";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { usePropagandaStore } from "@/store/propaganda.store";
import PropagandaDashboard from "@/components/propaganda/PropagandaDashboard";
import MenuUser from "@/components/menu";
import type { IPost } from "@/types/propaganda";

interface PropagandaIndexProps {
  initialPosts: IPost[];
}

export default function PropagandaIndex({
  initialPosts,
}: PropagandaIndexProps) {
  const router = useRouter();
  const { posts, fetchPosts, deletePost, isLoading } = usePropagandaStore();

  useEffect(() => {
    // Sync store with initial server data
    usePropagandaStore.setState({ posts: initialPosts });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchPosts(user.uid);
      }
    });
    return () => unsubscribe();
  }, [initialPosts, fetchPosts]);

  const handleEdit = (post: IPost) => {
    // For now we use the create page as editor by passing data via state or query
    router.push({
      pathname: "/admin/propaganda/criar",
      query: { edit: post.id },
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deseja realmente excluir esta publicação?")) {
      await deletePost(id);
    }
  };

  return (
    <Container maxWidth="lg" className="py-10">
      <Box sx={{ position: "relative", zIndex: 10, mb: 4 }}>
        <MenuUser />
      </Box>

      <Box className="flex flex-col gap-6">
        <Box className="flex justify-between items-center">
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Propaganda & Marketing
            </Typography>
            <Breadcrumbs sx={{ mt: 1 }}>
              <MuiLink
                underline="hover"
                color="inherit"
                onClick={() => router.push("/dashboard")}
                sx={{ cursor: "pointer" }}
              >
                Dashboard
              </MuiLink>
              <Typography color="text.primary">Propaganda</Typography>
            </Breadcrumbs>
          </Box>
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            onClick={() => router.push("/admin/propaganda/criar")}
            size="large"
          >
            Nova Publicação
          </Button>
        </Box>

        <PropagandaDashboard
          posts={posts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const db = getAdminFirestore();
    const snapshot = await db
      .collection("posts")
      .orderBy("scheduledAt", "desc")
      .limit(20)
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

    return {
      props: {
        initialPosts,
      },
    };
  } catch (error) {
    console.error("Propaganda index SSR error:", error);
    return {
      props: {
        initialPosts: [],
      },
    };
  }
};
