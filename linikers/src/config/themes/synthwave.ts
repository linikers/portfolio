// Tema 2: Synthwave — Neon púrpura/rosa, grid lines, anos 80
// Inspirado em Outrun, Drive, Hotline Miami

import { createTheme } from "@mui/material/styles";

const synthwave = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff00ff",
      contrastText: "#0d0221",
    },
    secondary: {
      main: "#00ffff",
    },
    background: {
      default: "#0d0221",
      paper: "#150530",
    },
    text: {
      primary: "#f0e6ff",
      secondary: "#b39ddb",
    },
    divider: "#2d1060",
    error: { main: "#ff1744" },
    warning: { main: "#ff9100" },
    info: { main: "#00ffff" },
    success: { main: "#76ff03" },
  },
  typography: {
    fontFamily: "'Orbitron', 'Rajdhani', 'Inter', sans-serif",
    h2: { fontWeight: 900, letterSpacing: "0.05em", textTransform: "uppercase" },
    h3: { fontWeight: 700, letterSpacing: "0.03em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600, letterSpacing: "0.02em" },
    body1: { fontFamily: "'Rajdhani', 'Inter', sans-serif", fontSize: "1.05rem" },
    body2: { fontFamily: "'Rajdhani', 'Inter', sans-serif" },
    button: { fontFamily: "'Orbitron', 'Rajdhani', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `
            linear-gradient(180deg, #0d0221 0%, #1a0533 50%, #0d0221 100%),
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,0,255,0.02) 50px, rgba(255,0,255,0.02) 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,0,255,0.02) 50px, rgba(255,0,255,0.02) 51px)
          `,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(135deg, #150530, #1a0840)",
          border: "1px solid #2d1060",
          "&:hover": {
            borderColor: "#ff00ff",
            boxShadow: "0 0 30px rgba(255,0,255,0.2), 0 0 60px rgba(0,255,255,0.1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "uppercase", borderRadius: 0, fontWeight: 700, letterSpacing: "0.08em" },
        outlined: {
          borderColor: "#ff00ff",
          color: "#ff00ff",
          borderWidth: 2,
          "&:hover": {
            borderColor: "#00ffff",
            color: "#00ffff",
            background: "rgba(255,0,255,0.1)",
            boxShadow: "0 0 20px rgba(255,0,255,0.3)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #ff00ff, #9900ff)",
          color: "#fff",
          "&:hover": { background: "linear-gradient(135deg, #ff33ff, #aa33ff)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 0, fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem" },
        outlined: {
          borderColor: "#ff00ff",
          color: "#f0e6ff",
          backgroundColor: "rgba(255,0,255,0.05)",
          "&:hover": { borderColor: "#00ffff", backgroundColor: "rgba(255,0,255,0.12)" },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #0d0221, #1a0533, #0d0221)",
          borderBottom: "2px solid #ff00ff",
        },
      },
    },
  },
});

export default synthwave;
