// src/components/propaganda/PropagandaDashboard.tsx
import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { MdEdit, MdDelete, MdContentCopy } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { IPost } from "@/types/propaganda";
import { STATUS_OPTIONS } from "@/types/propaganda";

// Register ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface PropagandaDashboardProps {
  posts: IPost[];
  onEdit: (post: IPost) => void;
  onDelete: (id: string) => void;
}

const platformIcons: Record<string, JSX.Element> = {
  instagram: <FaInstagram className="text-[#E1306C]" />,
  linkedin: <FaLinkedin className="text-[#0077B5]" />,
  x: <FaTwitter className="text-[#000000]" />, // X (Twitter)
  whatsapp: <FaWhatsapp className="text-[#25D366]" />,
};

export default function PropagandaDashboard({
  posts,
  onEdit,
  onDelete,
}: PropagandaDashboardProps) {
  // Metrics calculation
  const totalPosts = posts.length;
  const scheduledPosts = posts.filter((p) => p.status === "scheduled").length;
  const publishedPosts = posts.filter((p) => p.status === "published").length;
  const pausedPosts = posts.filter((p) => p.status === "paused").length;

  // Chart data
  const platformCounts = posts.reduce(
    (acc, post) => {
      post.platforms.forEach((p) => {
        acc[p] = (acc[p] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = {
    labels: ["Instagram", "LinkedIn", "X", "WhatsApp"],
    datasets: [
      {
        label: "Posts por Rede",
        data: [
          platformCounts.instagram || 0,
          platformCounts.linkedin || 0,
          platformCounts.x || 0,
          platformCounts.whatsapp || 0,
        ],
        backgroundColor: [
          "#E1306C", // Instagram
          "#0077B5", // LinkedIn
          "#000000", // X
          "#25D366", // WhatsApp
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Volume por Plataforma" },
    },
  };

  return (
    <Box className="flex flex-col gap-8">
      {/* Metrics Cards */}
      <Grid container spacing={3}>
        {[
          { label: "Total Posts", value: totalPosts, color: "primary.main" },
          { label: "Agendados", value: scheduledPosts, color: "info.main" },
          { label: "Publicados", value: publishedPosts, color: "success.main" },
          { label: "Pausados", value: pausedPosts, color: "warning.main" },
        ].map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.label}>
            <Card sx={{ borderLeft: `5px solid`, borderColor: metric.color }}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  variant="overline"
                  display="block"
                >
                  {metric.label}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {metric.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Chart and Recent Table Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Bar data={chartData} options={chartOptions} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, height: "100%" }}
          >
            <Table>
              <TableHead sx={{ bgcolor: "#f8fafc" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Conteúdo</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Redes</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.slice(0, 5).map((post) => (
                  <TableRow key={post.id} hover>
                    <TableCell
                      sx={{
                        maxWidth: 200,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {post.content}
                    </TableCell>
                    <TableCell>
                      <Box className="flex gap-2">
                        {post.platforms.map((p) => (
                          <span key={p} title={p}>
                            {platformIcons[p]}
                          </span>
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          STATUS_OPTIONS.find((s) => s.value === post.status)
                            ?.label
                        }
                        color={
                          STATUS_OPTIONS.find((s) => s.value === post.status)
                            ?.color
                        }
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => onEdit(post)}>
                        <MdEdit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(post.id)}
                      >
                        <MdDelete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
