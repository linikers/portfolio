// src/components/propaganda/CampanhasPagas.tsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  Card,
  CardContent,
} from "@mui/material";
import { FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";

const InstagramIcon: any = FaInstagram;
const LinkedinIcon: any = FaLinkedin;
const TwitterIcon: any = FaTwitter;
const WhatsappIcon: any = FaWhatsapp;
// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";
import type { IPost } from "@/types/propaganda";
import { STATUS_OPTIONS } from "@/types/propaganda";

interface CampanhasPagasProps {
  posts: IPost[];
  onUpdateROI: (id: string, roi: number) => void;
}

const platformIcons: Record<string, JSX.Element> = {
  instagram: <InstagramIcon className="text-[#E1306C]" />,
  linkedin: <LinkedinIcon className="text-[#0077B5]" />,
  x: <TwitterIcon className="text-[#000000]" />,
  whatsapp: <WhatsappIcon className="text-[#25D366]" />,
};

export default function CampanhasPagas({
  posts,
  onUpdateROI,
}: CampanhasPagasProps) {
  // Calculations
  const totalBudget = posts.reduce((sum, p) => sum + (p.budget || 0), 0);
  const activeCampaigns = posts.filter((p) => p.status === "published").length;

  // Find most used platform
  const platformUsage = posts.reduce(
    (acc, p) => {
      p.platforms.forEach((plat) => (acc[plat] = (acc[plat] || 0) + 1));
      return acc;
    },
    {} as Record<string, number>,
  );

  const topPlatform =
    Object.entries(platformUsage).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <Box className="flex flex-col gap-8">
      {/* Summary Cards */}
      <Grid container spacing={3}>
        {[
          {
            label: "Investimento Total",
            value: `R$ ${totalBudget.toLocaleString("pt-BR")}`,
            color: "primary.main",
          },
          {
            label: "Campanhas Ativas",
            value: activeCampaigns,
            color: "success.main",
          },
          {
            label: "Rede mais usada",
            value: topPlatform.toUpperCase(),
            color: "secondary.main",
          },
        ].map((item) => (
          <Grid item xs={12} md={4} key={item.label}>
            <Card sx={{ bgcolor: "white", borderRadius: 2 }}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  variant="overline"
                  fontWeight="bold"
                >
                  {item.label}
                </Typography>
                <Typography variant="h4" fontWeight="bold" color={item.color}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Campanha</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Redes</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Investimento</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Público-Alvo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>ROI Estimado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} hover>
                <TableCell
                  sx={{
                    maxWidth: 250,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.content}
                </TableCell>
                <TableCell>
                  <Box className="flex gap-2 text-lg">
                    {post.platforms.map((p) => (
                      <span key={p} title={p}>
                        {platformIcons[p]}
                      </span>
                    ))}
                  </Box>
                </TableCell>
                <TableCell fontWeight="bold">
                  R$ {post.budget?.toLocaleString("pt-BR")}
                </TableCell>
                <TableCell
                  sx={{ color: "text.secondary", fontSize: "0.875rem" }}
                >
                  {post.targetAudience || "Não definido"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={
                      STATUS_OPTIONS.find((s) => s.value === post.status)?.label
                    }
                    color={
                      STATUS_OPTIONS.find((s) => s.value === post.status)?.color
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    defaultValue={(post as any).roi || 0}
                    onBlur={(e) => onUpdateROI(post.id, Number(e.target.value))}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">x</InputAdornment>
                      ),
                      sx: { maxWidth: 100 },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
