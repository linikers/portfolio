// src/components/loja/PromptCard.tsx
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import type { IPrompt } from "@/types/prompt";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

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
      whileHover={{ y: -6, rotate: 0.5 }}
      transition={{ type: "spring", stiffness: 200 }}
      style={{ height: "100%" }}
    >
      <Card
        onClick={handleDetails}
        sx={{
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#151515",
          border: "2px solid #222",
          boxShadow: "8px 8px 0px #000",
          transition: "all .2s ease",
          "&:hover": {
            boxShadow: "12px 12px 0px #FF003C",
            transform: "translate(-2px,-2px)",
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 0 }}>
          {prompt.imageUrl && (
            <Box
              sx={{
                width: "100%",
                height: 160,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={prompt.imageUrl}
                alt={prompt.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(40%) contrast(110%)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8))",
                }}
              />
            </Box>
          )}

          <Box p={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              mb={2}
            >
              <Chip
                label={prompt.category}
                size="small"
                sx={{
                  background: "transparent",
                  border: "1px solid #FF003C",
                  color: "#FF003C",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: 11,
                }}
              />

              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#00F0FF" }}
              >
                {prompt.price === 0
                  ? "GRÁTIS"
                  : `R$ ${prompt.price.toFixed(2)}`}
              </Typography>
            </Box>

            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              fontWeight={900}
              sx={{
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
              noWrap
            >
              {prompt.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.7)",
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
          </Box>
        </CardContent>

        <Box p={2} pt={0}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleDetails}
            sx={{
              background: "#FF003C",
              color: "#fff",
              fontWeight: 700,
              letterSpacing: 1,
              "&:hover": {
                background: "#cc0030",
              },
            }}
          >
            VER DETALHES
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
}
