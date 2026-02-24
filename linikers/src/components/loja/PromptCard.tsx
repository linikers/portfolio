// src/components/loja/PromptCard.tsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import type { IPrompt } from "@/types/prompt";

interface PromptCardProps {
  prompt: IPrompt;
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function PromptCard({ prompt }: PromptCardProps) {
  const router = useRouter();

  const handleDetails = () => {
    router.push(`/loja/${prompt.id}`);
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        onClick={handleDetails}
        sx={{
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow 0.3s",
          "&:hover": { boxShadow: 6 },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}
          >
            <Chip
              label={prompt.category}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
            />
            <Typography variant="h6" color="success.main" fontWeight="bold">
              {prompt.price === 0 ? "Grátis" : `R$ ${prompt.price.toFixed(2)}`}
            </Typography>
          </Box>

          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            fontWeight="bold"
            noWrap
          >
            {prompt.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              minHeight: "4.5em",
            }}
          >
            {prompt.description}
          </Typography>
        </CardContent>
        <Box p={2} pt={0}>
          <Button
            fullWidth
            variant="contained"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Ver Detalhes
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
}
