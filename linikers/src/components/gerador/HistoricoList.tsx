// src/components/gerador/HistoricoList.tsx
// Tabela de prompts criados pelo usuário com toggle publicar/despublicar.
// Componente puro: recebe dados e callbacks via props.

import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { MdDelete, MdPublish, MdUnpublished } from "react-icons/md";
import type { IPrompt } from "@/types/prompt";

interface HistoricoListProps {
  prompts: IPrompt[];
  onTogglePublish: (id: string, published: boolean) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
}

function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function formatPrice(price: number): string {
  if (price === 0) return "Gratuito";
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

export default function HistoricoList({
  prompts,
  onTogglePublish,
  onDelete,
}: HistoricoListProps) {
  if (prompts.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: "center",
          border: "1px dashed",
          borderColor: "divider",
        }}
      >
        <Typography color="text.secondary">
          Nenhum prompt criado ainda. Use o Gerador para criar seu primeiro
          prompt!
        </Typography>
        <Button href="/admin/gerador" sx={{ mt: 2, textTransform: "none" }}>
          Ir para o Gerador
        </Button>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ "& th": { fontWeight: 600 } }}>
            <TableCell>Título</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prompts.map((prompt) => (
            <TableRow key={prompt.id} hover>
              <TableCell>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  noWrap
                  sx={{ maxWidth: 250 }}
                >
                  {prompt.title || "Sem título"}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip label={prompt.category} size="small" variant="outlined" />
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {formatPrice(prompt.price)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(prompt.createdAt)}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={prompt.published ? "Publicado" : "Rascunho"}
                  size="small"
                  color={prompt.published ? "success" : "default"}
                />
              </TableCell>
              <TableCell align="right">
                <Box className="flex justify-end gap-1">
                  <Tooltip
                    title={prompt.published ? "Despublicar" : "Publicar"}
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        onTogglePublish(prompt.id, !prompt.published)
                      }
                      color={prompt.published ? "warning" : "success"}
                    >
                      {prompt.published ? (
                        <MdUnpublished size={18} />
                      ) : (
                        <MdPublish size={18} />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton
                      size="small"
                      onClick={() => onDelete(prompt.id)}
                      color="error"
                    >
                      <MdDelete size={18} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
