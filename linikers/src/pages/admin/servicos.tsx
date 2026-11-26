"use client";

// src/pages/admin/servicos.tsx
// Catálogo de serviços: lista, filtro, criação/edição e exclusão (Firestore).
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Logout as LogoutIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import {
  CATEGORIAS,
  MARCAS,
  STATUS_SERVICO,
  formatarPreco,
  textoRecorrencia,
  type CategoriaServico,
  type MarcaServico,
  type Servico,
  type StatusServico,
  type TipoCobranca,
} from "@/data/servicos";

type FiltroMarca = MarcaServico | "todas";
type FiltroCategoria = CategoriaServico | "todas";
type FiltroStatus = StatusServico | "todos";

interface Formulario {
  id: string;
  marca: MarcaServico;
  categoria: CategoriaServico;
  nome: string;
  resumo: string;
  preco: string;
  precoAPartirDe: boolean;
  cobranca: TipoCobranca;
  temRecorrencia: boolean;
  recorrenciaValor: string;
  recorrenciaUnidade: "mes" | "ano";
  recorrenciaAPartirDe: string;
  recorrenciaObservacao: string;
  pagina: string;
  prazo: string;
  status: StatusServico;
  publico: string;
  entrega: string;
}

const VAZIO: Formulario = {
  id: "",
  marca: "bside",
  categoria: "sites",
  nome: "",
  resumo: "",
  preco: "",
  precoAPartirDe: false,
  cobranca: "unico",
  temRecorrencia: false,
  recorrenciaValor: "",
  recorrenciaUnidade: "mes",
  recorrenciaAPartirDe: "13",
  recorrenciaObservacao: "",
  pagina: "/bside",
  prazo: "",
  status: "ativo",
  publico: "",
  entrega: "",
};

function paraFormulario(s: Servico): Formulario {
  return {
    id: s.id,
    marca: s.marca,
    categoria: s.categoria,
    nome: s.nome,
    resumo: s.resumo,
    preco: String(s.preco),
    precoAPartirDe: s.precoAPartirDe,
    cobranca: s.cobranca,
    temRecorrencia: Boolean(s.recorrencia),
    recorrenciaValor: s.recorrencia ? String(s.recorrencia.valor) : "",
    recorrenciaUnidade: s.recorrencia?.unidade || "mes",
    recorrenciaAPartirDe: s.recorrencia?.aPartirDe ? String(s.recorrencia.aPartirDe) : "",
    recorrenciaObservacao: s.recorrencia?.observacao || "",
    pagina: s.pagina,
    prazo: s.prazo,
    status: s.status,
    publico: s.publico,
    entrega: s.entrega.join("\n"),
  };
}

function paraPayload(f: Formulario): Servico {
  return {
    id: f.id.trim().toLowerCase(),
    marca: f.marca,
    categoria: f.categoria,
    nome: f.nome.trim(),
    resumo: f.resumo.trim(),
    preco: Number(f.preco.replace(",", ".")),
    precoAPartirDe: f.precoAPartirDe,
    cobranca: f.cobranca,
    recorrencia: f.temRecorrencia
      ? {
          valor: Number(f.recorrenciaValor.replace(",", ".")),
          unidade: f.recorrenciaUnidade,
          ...(f.recorrenciaAPartirDe ? { aPartirDe: Number(f.recorrenciaAPartirDe) } : {}),
          ...(f.recorrenciaObservacao.trim() ? { observacao: f.recorrenciaObservacao.trim() } : {}),
        }
      : null,
    pagina: f.pagina.trim(),
    prazo: f.prazo.trim(),
    status: f.status,
    publico: f.publico.trim(),
    entrega: f.entrega
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
  };
}

function rotuloMarca(marca: string) {
  return MARCAS.find((m) => m.valor === marca)?.rotulo || marca;
}

function rotuloCategoria(categoria: string) {
  return CATEGORIAS.find((c) => c.valor === categoria)?.rotulo || categoria;
}

function corStatus(status: StatusServico) {
  if (status === "ativo") return "success";
  if (status === "rascunho") return "warning";
  return "default";
}

/** Recorrência em uma linha, para a coluna da tabela (observação fica no title). */
function recorrenciaCurta(s: Servico) {
  const rec = s.recorrencia;
  if (!rec) return "—";
  const unidade = rec.unidade === "mes" ? "mês" : "ano";
  const inicio = rec.aPartirDe ? `Do ${rec.aPartirDe}º ${unidade}: ` : "";
  return `${inicio}${formatarPreco(rec.valor)}/${unidade}`;
}

export default function AdminServicos() {
  const router = useRouter();
  const theme = useTheme();
  const compacto = useMediaQuery(theme.breakpoints.down("md"));

  const [servicos, setServicos] = useState<Servico[]>([]);
  const [origem, setOrigem] = useState<"firestore" | "codigo">("firestore");
  const [aviso, setAviso] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const [filtroMarca, setFiltroMarca] = useState<FiltroMarca>("todas");
  const [filtroCategoria, setFiltroCategoria] = useState<FiltroCategoria>("todas");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");

  const [dialogo, setDialogo] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState<Formulario>(VAZIO);
  const [errosForm, setErrosForm] = useState<string[]>([]);

  const [excluir, setExcluir] = useState<Servico | null>(null);
  const [snack, setSnack] = useState("");

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      const resposta = await fetch("/api/admin/servicos", {
        credentials: "same-origin",
        cache: "no-store",
      });
      if (resposta.status === 401) {
        router.replace("/admin/login?next=/admin/servicos");
        return;
      }
      const corpo = await resposta.json();
      if (!resposta.ok) throw new Error(corpo?.error || "Falha ao carregar");
      setServicos(corpo.servicos || []);
      setOrigem(corpo.origem === "codigo" ? "codigo" : "firestore");
      setAviso(corpo.aviso || "");
    } catch (e: any) {
      setErro(e?.message || "Falha ao carregar o catálogo.");
    } finally {
      setCarregando(false);
    }
  }, [router]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const filtrados = useMemo(
    () =>
      servicos.filter(
        (s) =>
          (filtroMarca === "todas" || s.marca === filtroMarca) &&
          (filtroCategoria === "todas" || s.categoria === filtroCategoria) &&
          (filtroStatus === "todos" || s.status === filtroStatus),
      ),
    [servicos, filtroMarca, filtroCategoria, filtroStatus],
  );

  function abrirNovo() {
    setEditandoId(null);
    setForm(VAZIO);
    setErrosForm([]);
    setDialogo(true);
  }

  function abrirEdicao(s: Servico) {
    setEditandoId(s.id);
    setForm(paraFormulario(s));
    setErrosForm([]);
    setDialogo(true);
  }

  function alterar<K extends keyof Formulario>(campo: K, valor: Formulario[K]) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  async function salvar() {
    setSalvando(true);
    setErrosForm([]);
    try {
      const resposta = await fetch("/api/admin/servicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(paraPayload(form)),
      });
      const corpo = await resposta.json().catch(() => ({}));
      if (!resposta.ok) {
        if (resposta.status === 401) {
          router.replace("/admin/login?next=/admin/servicos");
          return;
        }
        setErrosForm(corpo?.erros?.length ? corpo.erros : [corpo?.error || "Falha ao salvar"]);
        return;
      }
      setDialogo(false);
      setSnack(editandoId ? "Serviço atualizado." : "Serviço criado.");
      await carregar();
    } catch (e: any) {
      setErrosForm([e?.message || "Falha ao salvar"]);
    } finally {
      setSalvando(false);
    }
  }

  async function confirmarExclusao() {
    if (!excluir) return;
    const id = excluir.id;
    setExcluir(null);
    try {
      const resposta = await fetch(`/api/admin/servicos/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (resposta.status === 401) {
        router.replace("/admin/login?next=/admin/servicos");
        return;
      }
      if (!resposta.ok) {
        const corpo = await resposta.json().catch(() => ({}));
        throw new Error(corpo?.error || "Falha ao excluir");
      }
      setSnack("Serviço excluído.");
      await carregar();
    } catch (e: any) {
      setErro(e?.message || "Falha ao excluir.");
    }
  }

  async function publicarCatalogo() {
    setSalvando(true);
    try {
      const resposta = await fetch("/api/admin/servicos/seed", {
        method: "POST",
        credentials: "same-origin",
      });
      const corpo = await resposta.json().catch(() => ({}));
      if (!resposta.ok) throw new Error(corpo?.error || "Falha ao publicar");
      setSnack(`Catálogo publicado: ${corpo.criados} criados, ${corpo.preservados} preservados.`);
      await carregar();
    } catch (e: any) {
      setErro(e?.message || "Falha ao publicar catálogo.");
    } finally {
      setSalvando(false);
    }
  }

  async function sair() {
    await fetch("/api/admin/session", { method: "DELETE", credentials: "same-origin" }).catch(
      () => undefined,
    );
    router.replace("/admin/login");
  }

  return (
    <>
      <Head>
        <title>Serviços | Painel</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                Serviços
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                Preço, recorrência e o que cada serviço entrega. O que está aqui vale no painel; o
                catálogo de lançamento vem de <code>src/data/servicos.ts</code>.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button
                onClick={carregar}
                startIcon={<RefreshIcon />}
                variant="outlined"
                disabled={carregando}
              >
                Atualizar
              </Button>
              <Button onClick={sair} startIcon={<LogoutIcon />} variant="text">
                Sair
              </Button>
              <Button onClick={abrirNovo} startIcon={<AddIcon />} variant="contained">
                Novo serviço
              </Button>
            </Stack>
          </Stack>

          {erro ? (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErro("")}>
              {erro}
            </Alert>
          ) : null}

          {origem === "codigo" ? (
            <Alert
              severity="warning"
              sx={{ mb: 2 }}
              action={
                <Button color="inherit" size="small" onClick={publicarCatalogo} disabled={salvando}>
                  Publicar catálogo
                </Button>
              }
            >
              {aviso || "Catálogo ainda não publicado no Firestore."}
            </Alert>
          ) : null}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="filtro-marca">Marca</InputLabel>
              <Select
                labelId="filtro-marca"
                label="Marca"
                value={filtroMarca}
                onChange={(e) => setFiltroMarca(e.target.value as FiltroMarca)}
              >
                <MenuItem value="todas">Todas as marcas</MenuItem>
                {MARCAS.map((m) => (
                  <MenuItem key={m.valor} value={m.valor}>
                    {m.rotulo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel id="filtro-categoria">Categoria</InputLabel>
              <Select
                labelId="filtro-categoria"
                label="Categoria"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value as FiltroCategoria)}
              >
                <MenuItem value="todas">Todas as categorias</MenuItem>
                {CATEGORIAS.map((c) => (
                  <MenuItem key={c.valor} value={c.valor}>
                    {c.rotulo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel id="filtro-status">Status</InputLabel>
              <Select
                labelId="filtro-status"
                label="Status"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value as FiltroStatus)}
              >
                <MenuItem value="todos">Todos os status</MenuItem>
                {STATUS_SERVICO.map((s) => (
                  <MenuItem key={s.valor} value={s.valor}>
                    {s.rotulo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Typography sx={{ color: "text.secondary", fontSize: 13, mb: 1 }}>
            {filtrados.length} de {servicos.length} serviços
          </Typography>

          {carregando ? (
            <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
              <CircularProgress size={28} />
            </Box>
          ) : compacto ? (
            <Stack spacing={2}>
              {filtrados.map((s) => (
                <Card key={s.id} variant="outlined">
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>{s.nome}</Typography>
                        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{s.id}</Typography>
                      </Box>
                      <Chip size="small" label={STATUS_SERVICO.find((x) => x.valor === s.status)?.rotulo || s.status} color={corStatus(s.status)} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ my: 1.5 }} flexWrap="wrap" useFlexGap>
                      <Chip size="small" variant="outlined" label={rotuloMarca(s.marca)} />
                      <Chip size="small" variant="outlined" label={rotuloCategoria(s.categoria)} />
                    </Stack>
                    <Typography sx={{ fontWeight: 700 }}>
                      {s.precoAPartirDe ? "a partir de " : ""}
                      {formatarPreco(s.preco)}
                      {s.cobranca === "mensal" ? "/mês" : s.cobranca === "anual" ? "/ano" : ""}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                      {textoRecorrencia(s.recorrencia) || "Sem recorrência"}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      <Button size="small" startIcon={<EditIcon />} onClick={() => abrirEdicao(s)}>
                        Editar
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => setExcluir(s)}
                      >
                        Excluir
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <TableContainer component={Card} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Serviço</TableCell>
                    <TableCell>Marca</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell align="right">Preço</TableCell>
                    <TableCell>Recorrência</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtrados.map((s) => (
                    <TableRow key={s.id} hover>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{s.nome}</Typography>
                        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{s.id}</Typography>
                      </TableCell>
                      <TableCell>{rotuloMarca(s.marca)}</TableCell>
                      <TableCell>{rotuloCategoria(s.categoria)}</TableCell>
                      <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                        {s.precoAPartirDe ? "desde " : ""}
                        {formatarPreco(s.preco)}
                        {s.cobranca === "mensal" ? "/mês" : s.cobranca === "anual" ? "/ano" : ""}
                        {s.cobranca === "unico" ? (
                          <Typography component="span" sx={{ display: "block", fontSize: 11, color: "text.secondary" }}>
                            pagamento único
                          </Typography>
                        ) : null}
                      </TableCell>
                      <TableCell sx={{ fontSize: 13, maxWidth: 220 }}>
                        <Typography
                          sx={{ fontSize: 13, whiteSpace: "nowrap" }}
                          title={textoRecorrencia(s.recorrencia) || "Sem recorrência"}
                        >
                          {recorrenciaCurta(s)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip size="small" label={s.status} color={corStatus(s.status)} />
                      </TableCell>
                      <TableCell align="right" sx={{ whiteSpace: "nowrap", width: 110 }}>
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          <Button size="small" onClick={() => abrirEdicao(s)} aria-label={`Editar ${s.nome}`} title="Editar">
                            <EditIcon fontSize="small" />
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => setExcluir(s)}
                            aria-label={`Excluir ${s.nome}`}
                            title="Excluir"
                          >
                            <DeleteIcon fontSize="small" />
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </Box>

      <Dialog open={dialogo} onClose={() => !salvando && setDialogo(false)} fullWidth maxWidth="md" fullScreen={compacto}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          {editandoId ? "Editar serviço" : "Novo serviço"}
          <Button onClick={() => setDialogo(false)} disabled={salvando} aria-label="Fechar" size="small">
            Fechar
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          {errosForm.length ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {errosForm.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </Alert>
          ) : null}
          <Stack spacing={2} sx={{ pt: 0.5 }}>
            <Typography variant="overline" sx={{ color: "text.secondary", lineHeight: 1 }}>
              Identificação
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="id (slug)"
                value={form.id}
                onChange={(e) => alterar("id", e.target.value)}
                disabled={Boolean(editandoId)}
                helperText="Ex.: bside-pagina-profissional"
                fullWidth
                required
              />
              <TextField
                label="Nome"
                value={form.nome}
                onChange={(e) => alterar("nome", e.target.value)}
                fullWidth
                required
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="form-marca">Marca</InputLabel>
                <Select
                  labelId="form-marca"
                  label="Marca"
                  value={form.marca}
                  onChange={(e) => alterar("marca", e.target.value as MarcaServico)}
                >
                  {MARCAS.map((m) => (
                    <MenuItem key={m.valor} value={m.valor}>
                      {m.rotulo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel id="form-categoria">Categoria</InputLabel>
                <Select
                  labelId="form-categoria"
                  label="Categoria"
                  value={form.categoria}
                  onChange={(e) => alterar("categoria", e.target.value as CategoriaServico)}
                >
                  {CATEGORIAS.map((c) => (
                    <MenuItem key={c.valor} value={c.valor}>
                      {c.rotulo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel id="form-status">Status</InputLabel>
                <Select
                  labelId="form-status"
                  label="Status"
                  value={form.status}
                  onChange={(e) => alterar("status", e.target.value as StatusServico)}
                >
                  {STATUS_SERVICO.map((s) => (
                    <MenuItem key={s.valor} value={s.valor}>
                      {s.rotulo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <TextField
              label="Resumo (uma linha)"
              value={form.resumo}
              onChange={(e) => alterar("resumo", e.target.value)}
              fullWidth
              required
            />
            <Typography variant="overline" sx={{ color: "text.secondary", lineHeight: 1 }}>
              Preço e cobrança
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Preço (R$)"
                type="number"
                value={form.preco}
                onChange={(e) => alterar("preco", e.target.value)}
                fullWidth
                required
                inputProps={{ min: 0, step: 1 }}
              />
              <FormControl fullWidth size="small">
                <InputLabel id="form-cobranca">Cobrança</InputLabel>
                <Select
                  labelId="form-cobranca"
                  label="Cobrança"
                  value={form.cobranca}
                  onChange={(e) => alterar("cobranca", e.target.value as TipoCobranca)}
                >
                  <MenuItem value="unico">Pagamento único</MenuItem>
                  <MenuItem value="mensal">Mensal</MenuItem>
                  <MenuItem value="anual">Anual</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.precoAPartirDe}
                    onChange={(e) => alterar("precoAPartirDe", e.target.checked)}
                  />
                }
                label="Preço é piso (a partir de)"
              />
            </Stack>
            <FormControlLabel
              control={
                <Switch
                  checked={form.temRecorrencia}
                  onChange={(e) => alterar("temRecorrencia", e.target.checked)}
                />
              }
              label="Tem recorrência depois do período incluso"
            />
            {form.temRecorrencia ? (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Valor da recorrência (R$)"
                  type="number"
                  value={form.recorrenciaValor}
                  onChange={(e) => alterar("recorrenciaValor", e.target.value)}
                  fullWidth
                  inputProps={{ min: 0, step: 1 }}
                />
                <FormControl fullWidth size="small">
                  <InputLabel id="form-rec-unidade">Unidade</InputLabel>
                  <Select
                    labelId="form-rec-unidade"
                    label="Unidade"
                    value={form.recorrenciaUnidade}
                    onChange={(e) => alterar("recorrenciaUnidade", e.target.value as "mes" | "ano")}
                  >
                    <MenuItem value="mes">Por mês</MenuItem>
                    <MenuItem value="ano">Por ano</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="A partir do mês/ano"
                  type="number"
                  value={form.recorrenciaAPartirDe}
                  onChange={(e) => alterar("recorrenciaAPartirDe", e.target.value)}
                  fullWidth
                  inputProps={{ min: 1, step: 1 }}
                />
                <TextField
                  label="Observação"
                  value={form.recorrenciaObservacao}
                  onChange={(e) => alterar("recorrenciaObservacao", e.target.value)}
                  fullWidth
                />
              </Stack>
            ) : null}
            <Typography variant="overline" sx={{ color: "text.secondary", lineHeight: 1 }}>
              Entrega
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Página que vende"
                value={form.pagina}
                onChange={(e) => alterar("pagina", e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Prazo"
                value={form.prazo}
                onChange={(e) => alterar("prazo", e.target.value)}
                fullWidth
                required
              />
            </Stack>
            <Typography variant="overline" sx={{ color: "text.secondary", lineHeight: 1 }}>
              Descrição
            </Typography>
            <TextField
              label="Para quem é"
              value={form.publico}
              onChange={(e) => alterar("publico", e.target.value)}
              fullWidth
              multiline
              minRows={2}
              required
            />
            <TextField
              label="O que o cliente recebe (um item por linha)"
              value={form.entrega}
              onChange={(e) => alterar("entrega", e.target.value)}
              fullWidth
              multiline
              minRows={4}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogo(false)} disabled={salvando}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={salvar} disabled={salvando}>
            {salvando ? "Salvando..." : editandoId ? "Salvar alterações" : "Criar serviço"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(excluir)} onClose={() => setExcluir(null)}>
        <DialogTitle>Excluir serviço</DialogTitle>
        <DialogContent>
          <Typography>
            Excluir <strong>{excluir?.nome}</strong>? O documento sai da coleção <code>servicos</code>.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExcluir(null)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={confirmarExclusao}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={4000}
        onClose={() => setSnack("")}
        message={snack}
      />
    </>
  );
}
