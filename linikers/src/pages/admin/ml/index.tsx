// src/pages/admin/ml/index.tsx
// Dashboard de Campanhas do Mercado Livre — dados reais da conta do Alcides
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  CircularProgress,
  Alert,
  Link,
} from "@mui/material";
import { MdStore, MdAttachMoney, MdTrendingUp, MdShoppingCart } from "react-icons/md";
import { SiMercadopago } from "react-icons/si";

const StoreIcon: any = MdStore;
const MoneyIcon: any = MdAttachMoney;
const TrendingIcon: any = MdTrendingUp;
const CartIcon: any = MdShoppingCart;
const MLIcon: any = SiMercadopago;

interface MlCampanha {
  id: string;
  content: string;
  platform: string;
  budget: number;
  revenue: number;
  sold: number;
  stock: number;
  roi: number;
  thumbnail: string;
  link: string;
  status: string;
}

export default function MercadoLivrePage() {
  const [data, setData] = useState<{
    loja: string;
    totalProdutos: number;
    totalRevenue: number;
    totalSold: number;
    avgRoi: number;
    campanhas: MlCampanha[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/ml/campanhas")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Carregando dados do Mercado Livre...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!data) return null;

  const { loja, totalProdutos, totalRevenue, totalSold, campanhas } = data;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <MLIcon size={40} color="#009EE3" />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Mercado Livre — Campanhas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {loja} · Dados reais via API oficial
          </Typography>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            label: "Produtos Ativos",
            value: totalProdutos,
            icon: <StoreIcon size={32} />,
            color: "#009EE3",
          },
          {
            label: "Total Vendidos",
            value: totalSold,
            icon: <CartIcon size={32} />,
            color: "#00A650",
          },
          {
            label: "Receita Bruta",
            value: `R$ ${totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            icon: <MoneyIcon size={32} />,
            color: "#FF6000",
          },
          {
            label: "Ticket Médio",
            value: `R$ ${(totalSold > 0 ? totalRevenue / totalSold : 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            icon: <TrendingIcon size={32} />,
            color: "#9C27B0",
          },
        ].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Card sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography variant="overline" color="text.secondary" fontWeight="bold">
                      {item.label}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" sx={{ color: item.color, mt: 0.5 }}>
                      {item.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: item.color, opacity: 0.7 }}>{item.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Products Table */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Produtos por Desempenho
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Produto</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Preço</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Vendidos</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Estoque</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Receita</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Comissão</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>ROI Est.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campanhas.map((c) => {
              const comissao = c.revenue * 0.16;
              const lucro = c.revenue - comissao;
              return (
                <TableRow key={c.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, maxWidth: 350 }}>
                      {c.thumbnail && (
                        <Avatar
                          src={c.thumbnail.replace("http://", "https://")}
                          alt={c.content}
                          variant="rounded"
                          sx={{ width: 40, height: 40 }}
                        />
                      )}
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {c.link ? (
                            <Link href={c.link} target="_blank" underline="hover" color="inherit">
                              {c.content}
                            </Link>
                          ) : (
                            c.content
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">
                      R$ {c.budget.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={c.sold}
                      color={c.sold > 10 ? "success" : c.sold > 0 ? "primary" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{c.stock}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    R$ {c.revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>
                    -R$ {comissao.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${c.roi}%`}
                      color={c.roi > 100 ? "success" : c.roi > 0 ? "primary" : "default"}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
        * Comissão ML estimada em 16%. ROI = (Receita - Comissão) / Comissão × 100.
        Dados atualizados via API do Mercado Livre.
      </Typography>
    </Container>
  );
}
