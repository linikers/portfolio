// src/pages/loja/index.tsx
import { useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const AnimatePresenceProxy: any = AnimatePresence;
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import type { IPrompt } from "@/types/prompt";
import PromptCard from "@/components/loja/PromptCard";
import LojaFilters from "@/components/loja/LojaFilters";

interface LojaPageProps {
  prompts: IPrompt[];
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export default function LojaPage({ prompts }: LojaPageProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredPrompts = prompts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0E0E0E 0%, #111 100%)",
        color: "#F5F5F5",
      }}
    >
      <Head>
        <title>Loja de Prompts | Linikers</title>
        <meta
          name="description"
          content="Prompts profissionais validados para alavancar seu workflow."
        />
      </Head>

      <Container maxWidth="lg" sx={{ py: 12 }}>
        {/* HERO */}
        <Box sx={{ mb: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              fontWeight={900}
              sx={{ textTransform: "uppercase", letterSpacing: 3 }}
            >
              PROMPTS NÃO SÃO DECORAÇÃO
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mt: 2,
                maxWidth: 600,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              São ferramentas para dominar IA, automação e criação.
            </Typography>
          </motion.div>
        </Box>

        {/* FILTROS */}
        <Box sx={{ mb: 8 }}>
          <LojaFilters
            search={search}
            category={category}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
          />
        </Box>

        {/* GRID */}
        <AnimatePresenceProxy mode="wait">
          <motion.div
            key={category + search}
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <Grid container spacing={4}>
              {filteredPrompts.map((prompt) => (
                <Grid item key={prompt.id} xs={12} sm={6} lg={4}>
                  <PromptCard prompt={prompt} />
                </Grid>
              ))}

              {filteredPrompts.length === 0 && (
                <Grid item xs={12}>
                  <Box py={10} textAlign="center">
                    <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
                      Nenhum prompt encontrado.
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </motion.div>
        </AnimatePresenceProxy>
      </Container>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const db = getAdminFirestore();
    const snapshot = await db
      .collection("prompts")
      .where("published", "==", true)
      .get();

    const prompts = snapshot.docs.map((doc: any) => {
      const data = doc.data();
      return {
        id: doc.id,
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
        imageUrl: data.imageUrl || "",
      };
    });

    return { props: { prompts } };
  } catch (error) {
    console.error("[Loja SSR] Erro:", error);
    return { props: { prompts: [] } };
  }
};
