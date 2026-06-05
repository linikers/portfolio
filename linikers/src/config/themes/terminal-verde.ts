// Tema 1: Terminal Verde — IBM 3270 / phosphor green
// Inspirado em terminais de mainframe dos anos 70-80

import { createTheme } from "@mui/material/styles";

const terminalVerde = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ff41",
      contrastText: "#0a0a0a",
    },
    secondary: {
      main: "#008f11",
    },
    background: {
      default: "#0a0a0a",
      paper: "#0d0d0d",
    },
    text: {
      primary: "#00ff41",
      secondary: "#00cc33",
    },
    divider: "#0d3b0d",
    error: { main: "#ff3333" },
    warning: { main: "#ffcc00" },
    info: { main: "#00ff41" },
    success: { main: "#00ff41" },
  },
  typography: {
    fontFamily: "'IBM Plex Mono', 'JetBrains Mono', 'Courier New', monospace",
    h2: { fontWeight: 900, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace" },
    body2: { fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace" },
    button: { fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace", textTransform: "none" },
  },
  shape: { borderRadius: 2 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "radial-gradient(ellipse at center, #0d1f0d 0%, #0a0a0a 70%)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#0d0d0d",
          border: "1px solid #0d3b0d",
          "&:hover": { borderColor: "#00ff41", boxShadow: "0 0 20px rgba(0,255,65,0.1)" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none", backgroundColor: "#0d0d0d", border: "1px solid #0d3b0d" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", borderRadius: 4, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" },
        outlined: {
          borderColor: "#0d3b0d",
          color: "#00cc33",
          "&:hover": { borderColor: "#00ff41", color: "#00ff41", background: "rgba(0,255,65,0.05)" },
        },
        contained: {
          background: "#00ff41",
          color: "#0a0a0a",
          "&:hover": { background: "#00cc33" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: "'IBM Plex Mono', monospace", borderRadius: 2 },
        outlined: {
          borderColor: "#0d3b0d",
          color: "#00cc33",
          backgroundColor: "rgba(0,255,65,0.03)",
          "&:hover": { borderColor: "#00ff41", backgroundColor: "rgba(0,255,65,0.08)" },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { background: "#0a0a0a", borderBottom: "2px solid #00ff41" },
      },
    },
  },
});

export default terminalVerde;
