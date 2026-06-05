import type { AppProps } from "next/app";
import { useState, useCallback, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PaletteIcon from "@mui/icons-material/Palette";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.scss";

const themes = [
  { id: "terminal-verde", name: "Terminal Verde", primary: "#00ff41", bg: "#0a0a0a", paper: "#0d0d0d", text: "#00ff41", secondary: "#00cc33", radius: 2, font: "'IBM Plex Mono', monospace" },
  { id: "synthwave", name: "Synthwave", primary: "#ff00ff", bg: "#0d0221", paper: "#150530", text: "#f0e6ff", secondary: "#b39ddb", radius: 0, font: "'Orbitron', sans-serif" },
  { id: "cyberpunk", name: "Cyberpunk", primary: "#ffb000", bg: "#0a0a0a", paper: "#111111", text: "#ffe0a0", secondary: "#b3863d", radius: 0, font: "'Share Tech Mono', monospace" },
  { id: "matrix", name: "Matrix", primary: "#00ff41", bg: "#000000", paper: "#020802", text: "#00ff41", secondary: "#006620", radius: 0, font: "'Courier New', monospace" },
  { id: "retro-mac", name: "Retro Mac", primary: "#008080", bg: "#f5f0e0", paper: "#ffffff", text: "#1a1a1a", secondary: "#555555", radius: 0, font: "'Chicago', monospace", mode: "light" as const },
];

function buildTheme(t: typeof themes[0]) {
  const mode = (t as any).mode === "light" ? "light" : "dark";
  return createTheme({
    palette: {
      mode,
      primary: { main: t.primary, contrastText: mode === "dark" ? "#000" : "#fff" },
      secondary: { main: t.secondary },
      background: { default: t.bg, paper: t.paper },
      text: { primary: t.text, secondary: t.secondary },
      divider: mode === "dark" ? "#1e293b" : "#c0c0c0",
    },
    typography: {
      fontFamily: t.font,
      h2: { fontWeight: 900 },
      h3: { fontWeight: 700 },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontFamily: t.font },
    },
    shape: { borderRadius: t.radius },
    components: {
      MuiCard: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiButton: { styleOverrides: { root: { textTransform: "none", borderRadius: t.radius } } },
      MuiChip: { styleOverrides: { root: { fontFamily: t.font } } },
    },
  });
}

const STORAGE_KEY = "portfolio-theme";
const defaultId = "terminal-verde";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [themeId, setThemeId] = useState(defaultId);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && themes.some((t) => t.id === saved)) setThemeId(saved);
  }, []);

  const cycle = useCallback(() => {
    setThemeId((prev) => {
      const idx = themes.findIndex((t) => t.id === prev);
      const next = themes[(idx + 1) % themes.length];
      localStorage.setItem(STORAGE_KEY, next.id);
      return next.id;
    });
  }, []);

  const themeMeta = themes.find((t) => t.id === themeId) || themes[0];
  const theme = buildTheme(themeMeta);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <Box component="main" sx={{ flex: 1 }}>
          <Component {...pageProps} />
        </Box>
        <Footer />
      </Box>
      <Tooltip title={`Tema: ${themeMeta.name} (${themes.length} temas)`} placement="left">
        <IconButton
          onClick={cycle}
          size="small"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 10000,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            "&:hover": { bgcolor: "primary.main", color: "primary.contrastText", borderColor: "primary.main" },
          }}
        >
          <PaletteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </MuiThemeProvider>
  );
}
