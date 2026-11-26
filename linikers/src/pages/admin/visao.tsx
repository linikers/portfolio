"use client";

// src/pages/admin/visao.tsx
// Visão do site: serviços, páginas e origem do lead a partir dos eventos reais.
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
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Insights as InsightsIcon,
  Refresh as RefreshIcon,
  Logout as LogoutIcon,
  Inventory2 as InventoryIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import type { Dias, Visao } from "@/lib/visao";
import { ROTULOS_TIPO } from "@/data/rotas";

const NUM = new Intl.NumberFormat("pt-BR");
const MOEDA = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function pct(valor: number | null) {
  if (valor === null || valor === undefined) return "—";
  return `${(valor * 100).toFixed(1).replace(".", ",")}%`;
}

function inteiro(valor: number | null | undefined) {
  return typeof valor === "number" ? NUM.format(valor) : "—";
}

function dinheiro(valor: number | null | undefined) {
  return typeof valor === "number" ? MOEDA.format(valor) : "—";
}

function dataCurta(iso: string) {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

const CORES_TIPO: Record<string, "success" | "warning" | "default"> = {
  organica: "success",
  ads: "warning",
  privada: "default",
  nao_catalogada: "default",
};

const ROTULO_TIPO_LOCAL: Record<string, string> = {
  ...ROTULOS_TIPO,
  nao_catalogada: "Fora do inventário",
};

function Kpi({
  titulo,
  valor,
  detalhe,
}: {
  titulo: string;
  valor: string;
  detalhe?: string;
}) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography sx={{ color: "text.secondary", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {titulo}
        </Typography>
        <Typography sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 700, lineHeight: 1.2 }}>{valor}</Typography>
        {detalhe ? (
          <Typography sx={{ color: "text.secondary", fontSize: 12.5 }}>{detalhe}</Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}

function TituloBloco({ titulo, descricao, acao }: { titulo: string; descricao?: string; acao?: React.ReactNode }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={1} sx={{ mb: 1.5 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {titulo}
        </Typography>
        {descricao ? (
          <Typography sx={{ color: "text.secondary", fontSize: 13 }}>{descricao}</Typography>
        ) : null}
      </Box>
      {acao}
    </Stack>
  );
}

function Vazio({ texto }: { texto: string }) {
  return (
    <Typography sx={{ color: "text.secondary", fontSize: 13, fontStyle: "italic", py: 1 }}>
      {texto}
    </Typography>
  );
}

export default function AdminVisao() {
  const router = useRouter();
  const theme = useTheme();
  const [dias, setDias] = useState<Dias>(30);
  const [visao, setVisao] = useState<Visao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregar = useCallback(
    async (periodo: Dias) => {
      setCarregando(true);
      setErro("");
      try {
        const resposta = await fetch(`/api/admin/visao?dias=${periodo}`, {
          credentials: "same-origin",
          cache: "no-store",
        });
        if (resposta.status === 401) {
          router.replace("/admin/login?next=/admin/visao");
          return;
        }
        const corpo = await resposta.json().catch(() => ({}));
        if (!resposta.ok) throw new Error(corpo?.error || "Falha ao carregar a visão");
        setVisao(corpo as Visao);
      } catch (e: unknown) {
        setErro(e instanceof Error ? e.message : "Falha ao carregar a visão.");
      } finally {
        setCarregando(false);
      }
    },
    [router],
  );

  useEffect(() => {
    carregar(dias);
  }, [carregar, dias]);

  async function sair() {
    await fetch("/api/admin/session", { method: "DELETE", credentials: "same-origin" }).catch(() => {});
    router.replace("/admin/login");
  }

  const maiorFonte = useMemo(
    () => Math.max(1, ...(visao?.origem.fontes || []).map((f) => f.visitas)),
    [visao],
  );

  const maiorDia = useMemo(
    () => Math.max(1, ...(visao?.serie || []).map((s) => s.visitas)),
    [visao],
  );

  return (
    <>
      <Head>
        <title>Visão do site | Painel</title>
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
                Visão do site
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                Visitas e cliques no WhatsApp medidos pelo próprio site (coleção <code>eventos</code>,
                retenção de 90 dias).
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
              <ToggleButtonGroup
                size="small"
                exclusive
                value={dias}
                onChange={(_, valor: Dias | null) => {
                  if (valor) setDias(valor);
                }}
                aria-label="Período"
              >
                <ToggleButton value={7}>7 dias</ToggleButton>
                <ToggleButton value={30}>30 dias</ToggleButton>
                <ToggleButton value={90}>90 dias</ToggleButton>
              </ToggleButtonGroup>
              <Button onClick={() => carregar(dias)} startIcon={<RefreshIcon />} variant="outlined" disabled={carregando}>
                Atualizar
              </Button>
              <Button component="a" href="/admin/servicos" startIcon={<InventoryIcon />} variant="text">
                Serviços
              </Button>
              <Button onClick={sair} startIcon={<LogoutIcon />} variant="text">
                Sair
              </Button>
            </Stack>
          </Stack>

          {erro ? (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErro("")}>
              {erro}
            </Alert>
          ) : null}

          {visao?.truncado ? (
            <Alert severity="warning" sx={{ mb: 2 }}>
              A consulta atingiu o teto de {NUM.format(50000)} eventos. Os números do período estão
              incompletos — reduza o período ou ative o TTL para manter a coleção pequena.
            </Alert>
          ) : null}

          {carregando && !visao ? (
            <Box sx={{ display: "grid", placeItems: "center", py: 8 }}>
              <CircularProgress size={28} />
            </Box>
          ) : visao ? (
            <Stack spacing={3}>
              {visao.vazio ? (
                <Alert severity="info">
                  Sem dados no período de {visao.periodo.dias} dias. Nenhum evento foi registrado na
                  coleção <code>eventos</code> entre {dataCurta(visao.periodo.de)} e {dataCurta(visao.periodo.ate)}.
                </Alert>
              ) : null}

              <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" } }}>
                <Kpi
                  titulo="Visitas"
                  valor={inteiro(visao.resumo.visitas)}
                  detalhe={`${inteiro(visao.resumo.sessoes)} sessões anônimas`}
                />
                <Kpi titulo="Cliques no WhatsApp" valor={inteiro(visao.resumo.cliques)} detalhe="em qualquer página" />
                <Kpi titulo="Taxa de clique" valor={pct(visao.resumo.taxaClique)} detalhe="cliques ÷ visitas" />
                <Kpi
                  titulo="Período"
                  valor={`${visao.periodo.dias} dias`}
                  detalhe={`${dataCurta(visao.periodo.de)} a ${dataCurta(visao.periodo.ate)}`}
                />
              </Box>

              {/* ─── Serviços ─────────────────────────────────────────────── */}
              <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
                <TituloBloco
                  titulo="Serviços"
                  descricao="Catálogo do painel (coleção servicos). Ticket médio considera só os ativos."
                  acao={
                    <Button size="small" endIcon={<OpenInNewIcon />} href="/admin/servicos" component="a">
                      Editar catálogo
                    </Button>
                  }
                />
                {visao.servicos.fonte === "indisponivel" ? (
                  <Vazio texto="Não foi possível ler a coleção servicos no Firestore." />
                ) : visao.servicos.total === 0 ? (
                  <Vazio texto="Nenhum serviço cadastrado. Publique o catálogo em /admin/servicos." />
                ) : (
                  <>
                    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr 1fr 1fr", md: "repeat(3, minmax(0, 220px))" }, mb: 2 }}>
                      <Kpi titulo="Serviços" valor={inteiro(visao.servicos.total)} detalhe={`${inteiro(visao.servicos.ativos)} ativos`} />
                      <Kpi titulo="Ticket médio" valor={dinheiro(visao.servicos.ticketMedio)} detalhe="média dos ativos" />
                      <Kpi
                        titulo="Categorias"
                        valor={inteiro(visao.servicos.porCategoria.length)}
                        detalhe={`${inteiro(visao.servicos.porMarca.length)} marcas`}
                      />
                    </Box>
                    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 1 }}>Por categoria</Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Categoria</TableCell>
                                <TableCell align="right">Serviços</TableCell>
                                <TableCell align="right">Ticket médio</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {visao.servicos.porCategoria.map((linha) => (
                                <TableRow key={linha.chave}>
                                  <TableCell>{linha.rotulo}</TableCell>
                                  <TableCell align="right">{inteiro(linha.quantidade)}</TableCell>
                                  <TableCell align="right">{dinheiro(linha.ticketMedio)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 1 }}>Por marca</Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Marca</TableCell>
                                <TableCell align="right">Serviços</TableCell>
                                <TableCell align="right">Ticket médio</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {visao.servicos.porMarca.map((linha) => (
                                <TableRow key={linha.chave}>
                                  <TableCell>{linha.rotulo}</TableCell>
                                  <TableCell align="right">{inteiro(linha.quantidade)}</TableCell>
                                  <TableCell align="right">{dinheiro(linha.ticketMedio)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Box>
                  </>
                )}
              </Paper>

              {/* ─── Páginas ──────────────────────────────────────────────── */}
              <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
                <TituloBloco
                  titulo="Páginas"
                  descricao="Inventário de rotas (src/data/rotas.ts) com as visitas reais de cada uma."
                />
                <TableContainer sx={{ maxHeight: 520 }}>
                  <Table size="small" stickyHeader sx={{ minWidth: 820 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Página</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell align="center">Indexável</TableCell>
                        <TableCell align="right">Visitas 7d</TableCell>
                        <TableCell align="right">Visitas 30d</TableCell>
                        <TableCell align="right">Visitas período</TableCell>
                        <TableCell align="right">Cliques</TableCell>
                        <TableCell align="right">Taxa</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {visao.paginas.map((linha) => (
                        <TableRow key={linha.path} hover>
                          <TableCell>
                            <Typography sx={{ fontWeight: 600, fontSize: 13.5 }}>{linha.rotulo}</Typography>
                            <Typography component="code" sx={{ fontSize: 12, color: "text.secondary" }}>
                              {linha.path}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={ROTULO_TIPO_LOCAL[linha.tipo] || linha.tipo}
                              color={CORES_TIPO[linha.tipo] || "default"}
                              variant={linha.tipo === "privada" ? "outlined" : "filled"}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {linha.indexavel === null ? (
                              <Tooltip title="Rota não catalogada: não dá para afirmar se é indexável">
                                <span>—</span>
                              </Tooltip>
                            ) : linha.indexavel ? (
                              "Sim"
                            ) : (
                              "Não"
                            )}
                          </TableCell>
                          <TableCell align="right">{inteiro(linha.visitas7)}</TableCell>
                          <TableCell align="right">{inteiro(linha.visitas30)}</TableCell>
                          <TableCell align="right">{inteiro(linha.visitas)}</TableCell>
                          <TableCell align="right">{inteiro(linha.cliques)}</TableCell>
                          <TableCell align="right">{pct(linha.taxaClique)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              {/* ─── Origem do lead ───────────────────────────────────────── */}
              <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
                <TituloBloco
                  titulo="Origem do lead"
                  descricao="Atribuição first-touch: a origem guardada na primeira visita da sessão."
                />

                {visao.origem.fontes.length === 0 ? (
                  <Vazio texto="Sem dados no período." />
                ) : (
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 1 }}>Visitas por origem</Typography>
                    <Stack spacing={1}>
                      {visao.origem.fontes.slice(0, 8).map((fonte) => {
                        const rotulo = fonte.source
                          ? [fonte.source, fonte.medium, fonte.campaign].filter(Boolean).join(" · ")
                          : "(direto)";
                        const largura = Math.max(2, Math.round((fonte.visitas / maiorFonte) * 100));
                        return (
                          <Stack key={`${fonte.source}|${fonte.medium}|${fonte.campaign}`} direction="row" spacing={1.5} alignItems="center">
                            <Typography sx={{ width: { xs: 140, sm: 240 }, fontSize: 13, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {rotulo}
                            </Typography>
                            <Box sx={{ flex: 1, bgcolor: "action.hover", borderRadius: 1, height: 18, overflow: "hidden" }}>
                              <Box
                                sx={{
                                  width: `${largura}%`,
                                  height: "100%",
                                  bgcolor: "primary.main",
                                  opacity: 0.75,
                                  borderRadius: 1,
                                }}
                              />
                            </Box>
                            <Typography sx={{ width: 56, textAlign: "right", fontSize: 13, fontWeight: 600 }}>
                              {inteiro(fonte.visitas)}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Box>
                )}

                <Divider sx={{ my: 2 }} />

                <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 1 }}>Campanhas</Typography>
                {visao.origem.fontes.length === 0 ? (
                  <Vazio texto="Sem dados no período." />
                ) : (
                  <TableContainer>
                    <Table size="small" sx={{ minWidth: 620 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>utm_source</TableCell>
                          <TableCell>utm_medium</TableCell>
                          <TableCell>utm_campaign</TableCell>
                          <TableCell align="right">Visitas</TableCell>
                          <TableCell align="right">Sessões</TableCell>
                          <TableCell align="right">Cliques</TableCell>
                          <TableCell align="right">Taxa</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {visao.origem.fontes.map((fonte) => (
                          <TableRow key={`f-${fonte.source}|${fonte.medium}|${fonte.campaign}`}>
                            <TableCell>{fonte.source || "(direto)"}</TableCell>
                            <TableCell>{fonte.medium || "—"}</TableCell>
                            <TableCell>{fonte.campaign || "—"}</TableCell>
                            <TableCell align="right">{inteiro(fonte.visitas)}</TableCell>
                            <TableCell align="right">{inteiro(fonte.sessoes)}</TableCell>
                            <TableCell align="right">{inteiro(fonte.cliques)}</TableCell>
                            <TableCell align="right">{pct(fonte.taxaClique)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}

                <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, mt: 3 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 1 }}>Referrer</Typography>
                    {visao.origem.referrers.length === 0 ? (
                      <Vazio texto="Sem referrer externo no período." />
                    ) : (
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Site de origem</TableCell>
                              <TableCell align="right">Visitas</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {visao.origem.referrers.map((ref) => (
                              <TableRow key={`r-${ref.referrer || "nenhum"}`}>
                                <TableCell>{ref.referrer || "(nenhum)"}</TableCell>
                                <TableCell align="right">{inteiro(ref.visitas)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 1 }}>Landing page</Typography>
                    {visao.origem.landings.length === 0 ? (
                      <Vazio texto="Sem dados no período." />
                    ) : (
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Primeira página</TableCell>
                              <TableCell align="right">Sessões</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {visao.origem.landings.map((landing) => (
                              <TableRow key={`l-${landing.path}`}>
                                <TableCell>
                                  <Typography sx={{ fontSize: 13.5 }}>{landing.rotulo}</Typography>
                                  <Typography component="code" sx={{ fontSize: 12, color: "text.secondary" }}>
                                    {landing.path}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">{inteiro(landing.sessoes)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Box>
                </Box>
              </Paper>

              {/* ─── Série diária ─────────────────────────────────────────── */}
              <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
                <TituloBloco titulo="Visitas por dia" descricao="Contagem direta por dia do evento." />
                {visao.serie.length === 0 ? (
                  <Vazio texto="Sem dados no período." />
                ) : (
                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 0.75, height: 140, overflowX: "auto", pb: 1 }}>
                    {visao.serie.map((ponto) => (
                      <Tooltip key={ponto.dia} title={`${ponto.dia}: ${ponto.visitas} visitas, ${ponto.cliques} cliques`}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 26, height: "100%", justifyContent: "flex-end" }}>
                          <Typography sx={{ fontSize: 10.5, color: "text.secondary", mb: 0.25 }}>{ponto.visitas}</Typography>
                          <Box
                            sx={{
                              width: 18,
                              height: `${Math.max(4, Math.round((ponto.visitas / maiorDia) * 100))}%`,
                              bgcolor: "primary.main",
                              opacity: 0.7,
                              borderRadius: "3px 3px 0 0",
                            }}
                          />
                          <Typography sx={{ fontSize: 10.5, color: "text.secondary", mt: 0.5 }}>{dataCurta(ponto.dia)}</Typography>
                        </Box>
                      </Tooltip>
                    ))}
                  </Box>
                )}
              </Paper>

              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                Medição first-party (sem GA, sem cookie de terceiro): {inteiro(visao.resumo.visitas)} visitas e{" "}
                {inteiro(visao.resumo.cliques)} cliques no período. Nenhum dado pessoal é gravado em{" "}
                <code>eventos</code>; a retenção é de 90 dias. Gerado em{" "}
                {new Date(visao.geradoEm).toLocaleString("pt-BR")} · tema {theme.palette.mode}.
              </Typography>
            </Stack>
          ) : null}
        </Container>
      </Box>
    </>
  );
}
