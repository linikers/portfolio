"use client";

import { useState, useEffect } from "react";
import {
  Box, Container, Typography, TextField, Button, Paper, Grid, Chip,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, Select, FormControl, InputLabel, InputAdornment, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Tooltip, Tab, Tabs,
} from "@mui/material";
import {
  Search as SearchIcon, Add as AddIcon, ContentCopy as CopyIcon,
  OpenInNew as OpenIcon, CheckCircle as CheckIcon, Phone as PhoneIcon,
  Delete as DeleteIcon, Store as StoreIcon,
} from "@mui/icons-material";

interface Prospect {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  category?: string;
  notes: string;
  status: "new" | "contacted" | "interested" | "converted" | "lost";
  createdAt: string;
  updatedAt: string;
  contactedAt?: string;
  source?: string;
}

const statusColors: Record<string, string> = {
  new: "#94a3b8",
  contacted: "#f59e0b",
  interested: "#6366f1",
  converted: "#22c55e",
  lost: "#ef4444",
};

export default function ProspectPage() {
  const [tab, setTab] = useState(0);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProspect, setEditProspect] = useState<Partial<Prospect>>({});
  const [editing, setEditing] = useState(false);

  const fetchProspects = async (status = "all") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/prospects?status=${status}`);
      const data = await res.json();
      setProspects(data.prospects);
      setStats(data.stats);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProspects();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      // Passo 1: Geocode da cidade via server (Nominatim)
      const res = await fetch(`/api/prospects/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      
      // Passo 2: Se achou cidade, busca negocios via Overpass (do browser, funciona)
      const { coords } = data;
      if (coords) {
        const radius = 5000;
        const overpassQuery = `
          [out:json][timeout:15];
          (
            node["shop"](around:${radius},${coords.lat},${coords.lon});
            node["craft"](around:${radius},${coords.lat},${coords.lon});
            node["amenity"](around:${radius},${coords.lat},${coords.lon});
            way["shop"](around:${radius},${coords.lat},${coords.lon});
            way["craft"](around:${radius},${coords.lat},${coords.lon});
            way["amenity"](around:${radius},${coords.lat},${coords.lon});
          );
          out body;
          out center;
        `;

        const osmRes = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
        );
        
        if (osmRes.ok) {
          const osmData = await osmRes.json();
          const businesses = (osmData.elements || [])
            .filter((el: any) => el.tags?.name)
            .map((el: any) => ({
              id: `osm_${el.type}_${el.id}`,
              name: el.tags?.name || el.tags?.operator || el.tags?.brand || "Sem nome",
              address: [el.tags?.["addr:street"], el.tags?.["addr:housenumber"], el.tags?.["addr:city"]].filter(Boolean).join(", ") || "",
              phone: el.tags?.phone || el.tags?.["contact:phone"] || "",
              website: el.tags?.website || el.tags?.["contact:website"] || "",
              category: el.tags?.shop || el.tags?.craft || el.tags?.office || el.tags?.amenity || "",
              lat: el.lat || el.center?.lat,
              lon: el.lon || el.center?.lon,
            }))
            .slice(0, 30);
          setSearchResults(businesses);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  const addFromSearch = async (biz: any) => {
    await fetch("/api/prospects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: biz.name,
        address: biz.address,
        phone: biz.phone,
        website: biz.website,
        category: biz.category,
        source: "maps",
      }),
    });
    fetchProspects();
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

  return (
    <Box sx={{ minHeight: "100vh", background: "#0a0a0f", py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff", mb: 1 }}>
          🎯 Prospecção
        </Typography>
        <Typography sx={{ color: "#94a3b8", mb: 4 }}>
          Encontre negócios no mapa, gerencie contatos e acompanhe conversões.
        </Typography>

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
                          <IconButton size="small" href={`tel:${biz.phone}`} sx={{ color: "#22c55e" }}>
                            <PhoneIcon fontSize="small" />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Lista de Prospects */}
        <Paper sx={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <Typography sx={{ color: "#e2e8f0", fontWeight: 600 }}>Leads</Typography>
            <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={openManual}
              sx={{ color: "#818cf8", borderColor: "rgba(99,102,241,0.3)" }}>
              Adicionar Manual
            </Button>
          </Box>

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
      </Container>
    </Box>
  );
}
