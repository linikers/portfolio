"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Box, Container, Typography, TextField, Button, Paper, Grid, Chip,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, Select, FormControl, InputAdornment, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Tooltip, Tab, Tabs,
} from "@mui/material";
import {
  Search as SearchIcon, Add as AddIcon, ContentCopy as CopyIcon,
  OpenInNew as OpenIcon, Phone as PhoneIcon,
  Delete as DeleteIcon, Store as StoreIcon,
  Upload as UploadIcon, Map as MapIcon,
} from "@mui/icons-material";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import dynamic from "next/dynamic";

ChartJS.register(ArcElement, ChartTooltip, Legend);

// Leaflet map (dynamic import — SSR avoidance)
const LeadMap = dynamic(() => import("../../components/LeadMap"), { ssr: false });

interface Prospect {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  category?: string;
  notes: string;
  status: "new" | "contacted" | "interested" | "converted" | "lost";
  lat?: number | null;
  lon?: number | null;
  createdAt: string;
  updatedAt: string;
  contactedAt?: string;
  source?: string;
}

interface Metrics {
  conversionRate: number;
  avgDaysToConvert: number;
}

const statusColors: Record<string, string> = {
  new: "#94a3b8",
  contacted: "#f59e0b",
  interested: "#6366f1",
  converted: "#22c55e",
  lost: "#ef4444",
};

const statusLabels: Record<string, string> = {
  new: "🆕 Novo",
  contacted: "📞 Contactado",
  interested: "⭐ Interessado",
  converted: "✅ Convertido",
  lost: "❌ Perdido",
};

export default function ProspectPage() {
  const [tab, setTab] = useState(0);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [stats, setStats] = useState<any>({});
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProspect, setEditProspect] = useState<Partial<Prospect>>({});
  const [editing, setEditing] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);

  const fetchProspects = async (status = "all") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/prospects?status=${status}`);
      const data = await res.json();
      if (data.prospects) {
        setProspects(data.prospects);
        setStats(data.stats);
        setMetrics(data.metrics || null);
        localStorage.setItem("crm_prospects", JSON.stringify(data.prospects));
        localStorage.setItem("crm_stats", JSON.stringify(data.stats));
      }
    } catch (e) {
      console.error(e);
      const cached = localStorage.getItem("crm_prospects");
      if (cached) {
        setProspects(JSON.parse(cached));
        const s = localStorage.getItem("crm_stats");
        if (s) setStats(JSON.parse(s));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProspects(); }, []);

  useEffect(() => {
    // Recalculate percentuais quando stats mudar
    if (stats.total > 0) {
      const percents = ["new", "contacted", "interested", "converted", "lost"].map((s) => ({
        status: s,
        count: stats[s] || 0,
        pct: Math.round(((stats[s] || 0) / stats.total) * 100),
      }));
    }
  }, [stats]);

  const doughnutData = useMemo(() => {
    const labels = ["Novo", "Contactado", "Interessado", "Convertido", "Perdido"];
    const data = [stats.new || 0, stats.contacted || 0, stats.interested || 0, stats.converted || 0, stats.lost || 0];
    const colors = ["#94a3b8", "#f59e0b", "#6366f1", "#22c55e", "#ef4444"];
    return {
      labels,
      datasets: [{ data, backgroundColor: colors, borderWidth: 0 }],
    };
  }, [stats]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(`/api/prospects/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data.businesses || []);
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  const addFromSearch = async (biz: any) => {
    try {
      const res = await fetch("/api/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: biz.name,
          address: biz.address,
          phone: biz.phone,
          website: biz.website,
          category: biz.category,
          source: "maps",
          lat: biz.lat,
          lon: biz.lon,
        }),
      });
      if (!res.ok) return;
      fetchProspects();
    } catch (e) { console.error(e); }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/prospects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchProspects();
  };

  const deleteProspect = async (id: string) => {
    if (!confirm("Remover este prospect?")) return;
    await fetch(`/api/prospects?id=${id}`, { method: "DELETE" });
    fetchProspects();
  };

  const saveManual = async () => {
    if (editing) {
      await fetch("/api/prospects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editProspect }),
      });
    } else {
      await fetch("/api/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProspect),
      });
    }
    setDialogOpen(false);
    setEditProspect({});
    setEditing(false);
    fetchProspects();
  };

  const openManual = () => {
    setEditProspect({ name: "", notes: "" });
    setEditing(false);
    setDialogOpen(true);
  };

  const copyPortfolioLink = (prospect: Prospect) => {
    const link = `${window.location.origin}/portfolio?ref=${encodeURIComponent(prospect.name)}`;
    navigator.clipboard.writeText(link);
  };

  const handleImport = async () => {
    setImporting(true);
    setImportResult(null);
    try {
      let data;
      try { data = JSON.parse(importText); }
      catch { return setImportResult("❌ JSON inválido. Cole um array de leads."); }
      const list = Array.isArray(data) ? data : data.prospects;
      if (!list || !list.length) return setImportResult("❌ Array vazio. Nenhum lead pra importar.");
      const res = await fetch("/api/prospects/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prospects: list }),
      });
      const result = await res.json();
      if (result.success) {
        setImportResult(`✅ ${result.imported} leads importados (total: ${result.total})`);
        fetchProspects();
      } else {
        setImportResult(`❌ Erro: ${result.error}`);
      }
    } catch (e: any) {
      setImportResult(`❌ Erro: ${e.message}`);
    } finally {
      setImporting(false);
    }
  };

  const getStatusProspects = (status: string) => {
    if (status === "all") return prospects;
    return prospects.filter((p) => p.status === status);
  };

  const statusTabs = [
    { value: "all", label: `Todos (${stats.total || 0})` },
    { value: "new", label: `Novos (${stats.new || 0})` },
    { value: "contacted", label: `Contactados (${stats.contacted || 0})` },
    { value: "interested", label: `Interessados (${stats.interested || 0})` },
    { value: "converted", label: `Convertidos (${stats.converted || 0})` },
  ];

  const filteredProspects = getStatusProspects(statusTabs[tab]?.value || "all");

  const leadsWithCoords = prospects.filter((p) => p.lat && p.lon);

  return (
    <Box sx={{ minHeight: "100vh", background: "#0a0a0f", py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff", mb: 1 }}>
          🎯 Prospecção
        </Typography>
        <Typography sx={{ color: "#94a3b8", mb: 4 }}>
          Encontre negócios no mapa, gerencie contatos e acompanhe conversões.
        </Typography>

        {/* Métricas do Funil */}
        {metrics && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, textAlign: "center" }}>
                <Typography sx={{ color: "#64748b", fontSize: "0.8rem", mb: 0.5 }}>Total Leads</Typography>
                <Typography sx={{ color: "#e2e8f0", fontSize: "2rem", fontWeight: 800 }}>{stats.total || 0}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, textAlign: "center" }}>
                <Typography sx={{ color: "#64748b", fontSize: "0.8rem", mb: 0.5 }}>Conversão</Typography>
                <Typography sx={{ color: stats.converted > 0 ? "#22c55e" : "#64748b", fontSize: "2rem", fontWeight: 800 }}>
                  {metrics.conversionRate}%
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, textAlign: "center" }}>
                <Typography sx={{ color: "#64748b", fontSize: "0.8rem", mb: 0.5 }}>Temp. Médio Conversão</Typography>
                <Typography sx={{ color: "#e2e8f0", fontSize: "2rem", fontWeight: 800 }}>
                  {metrics.avgDaysToConvert > 0 ? `${metrics.avgDaysToConvert}d` : "-"}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, textAlign: "center" }}>
                <Typography sx={{ color: "#64748b", fontSize: "0.8rem", mb: 0.5 }}>Funil</Typography>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5, height: 56 }}>
                  {["new", "contacted", "interested", "converted", "lost"].map((s) => (
                    <Tooltip key={s} title={`${statusLabels[s]}: ${stats[s] || 0}`}>
                      <Box sx={{
                        width: 20, height: 20 + ((stats[s] || 0) / Math.max(stats.total || 1, 1)) * 36,
                        background: statusColors[s], borderRadius: "4px 4px 0 0", opacity: 0.8,
                        transition: "0.3s", "&:hover": { opacity: 1 },
                      }} />
                    </Tooltip>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Busca no Mapa */}
        <Paper sx={{ p: 3, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, mb: 4 }}>
          <Typography sx={{ color: "#e2e8f0", fontWeight: 600, mb: 2 }}>
            <StoreIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            Buscar negócios por região
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Ex: oficina suspensão Maringá PR"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#64748b" }} /></InputAdornment>,
                sx: { color: "#e2e8f0", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={searching}
              sx={{ background: "#6366f1", "&:hover": { background: "#4f46e5" }, minWidth: 120 }}
            >
              {searching ? <CircularProgress size={20} /> : "Buscar"}
            </Button>
          </Box>

          {searchResults.length > 0 && (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#94a3b8" }}>Nome</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Endereço</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Telefone</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((biz: any) => (
                    <TableRow key={biz.id} sx={{ "& td": { borderColor: "rgba(255,255,255,0.05)" } }}>
                      <TableCell sx={{ color: "#e2e8f0" }}>{biz.name}</TableCell>
                      <TableCell sx={{ color: "#94a3b8", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {biz.address || "-"}
                      </TableCell>
                      <TableCell sx={{ color: "#94a3b8" }}>{biz.phone || "-"}</TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => addFromSearch(biz)} sx={{ color: "#818cf8", minWidth: 0 }}>
                          <AddIcon fontSize="small" />
                        </Button>
                        {biz.phone && (
                          <Tooltip title={biz.phone}>
                            <IconButton size="small" href={`tel:${biz.phone}`} sx={{ color: "#22c55e" }}>
                              <PhoneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Leads com Mapa */}
        <Paper sx={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <Typography sx={{ color: "#e2e8f0", fontWeight: 600 }}>Leads</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {leadsWithCoords.length > 0 && (
                <Button variant="outlined" size="small" startIcon={<MapIcon />} onClick={() => setMapOpen(!mapOpen)}
                  sx={{ color: "#22c55e", borderColor: "rgba(34,197,94,0.3)" }}>
                  Mapa
                </Button>
              )}
              <Button variant="outlined" size="small" startIcon={<UploadIcon />} onClick={() => setImportDialogOpen(true)}
                sx={{ color: "#818cf8", borderColor: "rgba(99,102,241,0.3)" }}>
                Importar
              </Button>
              <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={openManual}
                sx={{ color: "#818cf8", borderColor: "rgba(99,102,241,0.3)" }}>
                Adicionar Manual
              </Button>
            </Box>
          </Box>

          {/* Mapa de leads */}
          {mapOpen && leadsWithCoords.length > 0 && (
            <Box sx={{ height: 350, m: 2, borderRadius: 2, overflow: "hidden" }}>
              <LeadMap prospects={leadsWithCoords} />
            </Box>
          )}

          {/* Gráfico doughnut */}
          {stats.total > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2, gap: 3, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Box sx={{ width: 120, height: 120 }}>
                <Doughnut data={doughnutData} options={{ cutout: "65%", plugins: { legend: { display: false } }, maintainAspectRatio: true }} />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 0.5 }}>
                {["new", "contacted", "interested", "converted", "lost"].map((s) => (
                  <Box key={s} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: statusColors[s] }} />
                    <Typography sx={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                      {statusLabels[s]}: {stats[s] || 0}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ "& .MuiTab-root": { color: "#64748b", textTransform: "none" }, "& .Mui-selected": { color: "#818cf8" }, "& .MuiTabs-indicator": { background: "#818cf8" } }}>
            {statusTabs.map((t) => (
              <Tab key={t.value} label={t.label} />
            ))}
          </Tabs>

          {loading ? (
            <Box sx={{ textAlign: "center", py: 8 }}><CircularProgress /></Box>
          ) : filteredProspects.length === 0 ? (
            <Typography sx={{ color: "#64748b", textAlign: "center", py: 8, fontStyle: "italic" }}>
              Nenhum lead encontrado. Busque negócios no mapa acima.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#94a3b8" }}>Nome</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Contato</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Origem</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Status</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProspects.map((p) => (
                    <TableRow key={p.id} sx={{ "& td": { borderColor: "rgba(255,255,255,0.05)" } }}>
                      <TableCell>
                        <Typography sx={{ color: "#e2e8f0", fontWeight: 600 }}>{p.name}</Typography>
                        <Typography sx={{ color: "#64748b", fontSize: "0.8rem" }}>{p.category}</Typography>
                      </TableCell>
                      <TableCell>
                        {p.phone && <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>{p.phone}</Typography>}
                        {p.address && <Typography sx={{ color: "#64748b", fontSize: "0.8rem", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>{p.address}</Typography>}
                      </TableCell>
                      <TableCell>
                        <Chip label={p.source} size="small" sx={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc", fontSize: "0.75rem" }} />
                      </TableCell>
                      <TableCell>
                        <FormControl size="small">
                          <Select
                            value={p.status}
                            onChange={(e) => updateStatus(p.id, e.target.value)}
                            sx={{
                              color: statusColors[p.status],
                              fontSize: "0.8rem",
                              "& fieldset": { borderColor: `${statusColors[p.status]}40` },
                              "& .MuiSelect-icon": { color: statusColors[p.status] },
                            }}
                          >
                            <MenuItem value="new">🆕 Novo</MenuItem>
                            <MenuItem value="contacted">📞 Contactado</MenuItem>
                            <MenuItem value="interested">⭐ Interessado</MenuItem>
                            <MenuItem value="converted">✅ Convertido</MenuItem>
                            <MenuItem value="lost">❌ Perdido</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                          <Tooltip title="Copiar link do portfolio">
                            <IconButton size="small" onClick={() => copyPortfolioLink(p)} sx={{ color: "#818cf8" }}>
                              <CopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Abrir portfolio">
                            <IconButton size="small" href={`/portfolio?ref=${encodeURIComponent(p.name)}`} target="_blank" sx={{ color: "#22c55e" }}>
                              <OpenIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Remover">
                            <IconButton size="small" onClick={() => deleteProspect(p.id)} sx={{ color: "#ef4444" }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Dialog Adicionar/Editar */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} PaperProps={{ sx: { background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 3, minWidth: 400 } }}>
          <DialogTitle sx={{ color: "#e2e8f0", fontWeight: 700 }}>
            {editing ? "Editar Lead" : "Novo Lead Manual"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <TextField label="Nome" value={editProspect.name || ""} onChange={(e) => setEditProspect({ ...editProspect, name: e.target.value })}
                InputLabelProps={{ sx: { color: "#64748b" } }}
                InputProps={{ sx: { color: "#e2e8f0", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } } }} />
              <TextField label="Telefone" value={editProspect.phone || ""} onChange={(e) => setEditProspect({ ...editProspect, phone: e.target.value })}
                InputLabelProps={{ sx: { color: "#64748b" } }}
                InputProps={{ sx: { color: "#e2e8f0", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } } }} />
              <TextField label="Endereço" value={editProspect.address || ""} onChange={(e) => setEditProspect({ ...editProspect, address: e.target.value })}
                InputLabelProps={{ sx: { color: "#64748b" } }}
                InputProps={{ sx: { color: "#e2e8f0", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } } }} />
              <TextField label="Website" value={editProspect.website || ""} onChange={(e) => setEditProspect({ ...editProspect, website: e.target.value })}
                InputLabelProps={{ sx: { color: "#64748b" } }}
                InputProps={{ sx: { color: "#e2e8f0", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } } }} />
              <TextField label="Categoria" value={editProspect.category || ""} onChange={(e) => setEditProspect({ ...editProspect, category: e.target.value })}
                InputLabelProps={{ sx: { color: "#64748b" } }}
                InputProps={{ sx: { color: "#e2e8f0", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } } }} />
              <TextField label="Observações" multiline rows={3} value={editProspect.notes || ""} onChange={(e) => setEditProspect({ ...editProspect, notes: e.target.value })}
                InputLabelProps={{ sx: { color: "#64748b" } }}
                InputProps={{ sx: { color: "#e2e8f0", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } } }} />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setDialogOpen(false)} sx={{ color: "#64748b" }}>Cancelar</Button>
            <Button variant="contained" onClick={saveManual} disabled={!editProspect.name}
              sx={{ background: "#6366f1", "&:hover": { background: "#4f46e5" } }}>
              {editing ? "Salvar" : "Adicionar"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Importar */}
        <Dialog open={importDialogOpen} onClose={() => { setImportDialogOpen(false); setImportResult(null); setImportText(""); }}
          PaperProps={{ sx: { background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 3, minWidth: 500 } }}>
          <DialogTitle sx={{ color: "#e2e8f0", fontWeight: 700 }}>Importar Leads</DialogTitle>
          <DialogContent>
            <Typography sx={{ color: "#64748b", fontSize: "0.85rem", mb: 2 }}>
              Cole um array JSON com os leads. Formato:
            </Typography>
            <Box sx={{ background: "rgba(0,0,0,0.3)", p: 1.5, borderRadius: 1, mb: 2, fontFamily: "monospace", fontSize: "0.75rem", color: "#a5b4fc" }}>
              {`[\n  { "name": "Oficina Exemplo", "phone": "(44)99999", "address": "Rua X", "category": "car_repair" }\n]`}
            </Box>
            <TextField
              fullWidth multiline rows={8}
              placeholder='Cole o JSON aqui...'
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              InputProps={{ sx: { color: "#e2e8f0", fontFamily: "monospace", fontSize: "0.8rem", "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } } }}
            />
            {importResult && (
              <Typography sx={{ mt: 2, color: importResult.startsWith("✅") ? "#22c55e" : "#ef4444", fontWeight: 600 }}>
                {importResult}
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => { setImportDialogOpen(false); setImportResult(null); setImportText(""); }} sx={{ color: "#64748b" }}>Fechar</Button>
            <Button variant="contained" onClick={handleImport} disabled={!importText.trim() || importing}
              sx={{ background: "#6366f1", "&:hover": { background: "#4f46e5" } }}>
              {importing ? <CircularProgress size={20} /> : "Importar"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
