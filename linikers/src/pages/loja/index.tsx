// src/pages/loja/index.tsx
import { useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
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
    transition: {
      staggerChildren: 0.1,
    },
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
    <Container maxWidth="lg" className="py-12">
      <Head>
        <title>Loja de Prompts | Linikers</title>
        <meta
          name="description"
          content="Explore nossa vitrine de prompts otimizados para IA. Copywriting, Marketing, SEO e muito mais."
        />
      </Head>

      <Box className="flex flex-col gap-2 mb-10">
        <Typography variant="h3" component="h1" fontWeight="bold">
          Loja de Prompts
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Prompts profissionais validados para alavancar seu workflow.
        </Typography>
      </Box>

      <LojaFilters
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={category + search}
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <Grid container spacing={3}>
            {filteredPrompts.map((prompt) => (
              <Grid item key={prompt.id} xs={12} sm={6} lg={4}>
                <PromptCard prompt={prompt} />
              </Grid>
            ))}
            {filteredPrompts.length === 0 && (
              <Grid item xs={12}>
                <Box py={8} textAlign="center">
                  <Typography variant="h6" color="text.secondary">
                    Nenhum prompt encontrado para os filtros selecionados.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const db = getAdminFirestore();
    const snapshot = await db
      .collection("prompts")
      .where("published", "==", true)
      //   .orderBy("createdAt", "desc")
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
      };
    });

    return {
      props: {
        prompts,
      },
    };
  } catch (error) {
    console.error("[Loja SSR] Erro:", error);
    return {
      props: {
        prompts: [],
      },
    };
  }
};
