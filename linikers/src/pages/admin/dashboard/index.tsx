import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import ava from "../../../../public/next.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Link from "next/link";
import PainelCotacao from "./painelCotacao";
import {
  MdAddCircle,
  MdHistory,
  MdCampaign,
  MdStore,
  MdDashboard,
} from "react-icons/md";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["React", "Mysql", "Postgres", "MJ", "NextJs", "Ts"],
  datasets: [
    {
      label: "Ferramentas",
      data: [12, 19, 21, 8, 60, 18],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      bordeColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const STORE_MENU_ITEMS = [
  {
    title: "Gerador de Prompts",
    icon: <MdAddCircle size={40} />,
    link: "/admin/gerador",
    color: "#4f46e5",
  },
  {
    title: "Histórico de Prompts",
    icon: <MdHistory size={40} />,
    link: "/admin/gerador/historico",
    color: "#0891b2",
  },
  {
    title: "Propagandas",
    icon: <MdCampaign size={40} />,
    link: "/admin/propaganda",
    color: "#db2777",
  },
  {
    title: "Ver Loja",
    icon: <MdStore size={40} />,
    link: "/loja",
    color: "#059669",
  },
];

export default function AdminPage() {
  return (
    <Container sx={{ mt: 4, pb: 8 }}>
      <Card
        sx={{
          p: 2,
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Box display="flex">
          <Avatar
            alt="Adminimg"
            src={ava.src}
            sx={{
              width: 100,
              height: 100,
              mr: { sm: 2 },
              mb: { xs: 2, sm: 0 },
            }}
          />
          <Box textAlign="left" sx={{ mr: { sm: 2 } }}>
            <Typography variant="h5">Seja bem vindo</Typography>
            <Typography variant="subtitle1">Admin</Typography>
          </Box>
        </Box>
        <Box sx={{ zIndex: 999 }}>
          <Link href="/dashboard/painel">
            <Button variant="contained" startIcon={<MdDashboard />}>
              Dashboard Global
            </Button>
          </Link>
        </Box>
      </Card>

      {/* Seção Gerenciamento da Loja */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          🛒 Gerenciamento da Loja
        </Typography>
        <Grid2 container spacing={3}>
          {STORE_MENU_ITEMS.map((item, index) => (
            <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Link href={item.link} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                    transition: "all 0.2s",
                    cursor: "pointer",
                    border: "1px solid transparent",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                      borderColor: item.color,
                    },
                  }}
                >
                  <Box sx={{ color: item.color, mb: 2 }}>{item.icon}</Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    align="center"
                  >
                    {item.title}
                  </Typography>
                </Card>
              </Link>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        📊 Atividade Recente
      </Typography>
      <Grid2 container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
        {["Ultimos Tweets", "Ultimos Posts Linkedin", "Ultimos PR"].map(
          (title, index) => (
            <Grid2
              key={index}
              size={{ xs: 12, sm: 4 }}
              sx={{
                display: "flex",
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 2,
                  width: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" align="center">
                    {title}
                  </Typography>
                  <Typography variant="h4" align="center">
                    {index === 0 ? "421" : index === 1 ? "408" : "802"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ),
        )}
      </Grid2>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={600} align="center">
          Projetos distribuídos
        </Typography>
        <Card sx={{ margin: 4, mt: 2, maxWidth: 600, width: "100%" }}>
          <Pie data={data} />
        </Card>
      </Box>
      <PainelCotacao />
    </Container>
  );
}
