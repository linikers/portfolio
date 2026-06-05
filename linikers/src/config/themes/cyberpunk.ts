// Tema 3: Cyberpunk — Âmbar/laranja, scanlines, glitch
// Inspirado em interfaces de hacker filme 90s, Blade Runner, Ghost in the Shell

import { createTheme } from "@mui/material/styles";

const cyberpunk = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffb000",
      contrastText: "#0a0a0a",
    },
    secondary: {
      main: "#ff6b00",
    },
    background: {
      default: "#0a0a0a",
      paper: "#111111",
    },
    text: {
      primary: "#ffe0a0",
      secondary: "#b3863d",
    },
    divider: "#2a1f0a",
    error: { main: "#ff3333" },
    warning: { main: "#ffb000" },
    info: { main: "#ffb000" },
    success: { main: "#66ff66" },
  },
  typography: {
    fontFamily: "'Share Tech Mono', 'Fira Code', 'Courier New', monospace",
    h2: { fontWeight: 900, letterSpacing: "0.05em", textTransform: "uppercase" },
    h3: { fontWeight: 700, letterSpacing: "0.03em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontFamily: "'Share Tech Mono', 'Fira Code', monospace" },
    body2: { fontFamily: "'Share Tech Mono', 'Fira Code', monospace" },
    button: { fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.05em", textTransform: "uppercase" },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#0a0a0a",
          "&::after": {
            content: '""',
            position: "fixed",
            inset: 0,
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
            pointerEvents: "none",
            zIndex: 9999,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#111111",
          border: "1px solid #2a1f0a",
          "&:hover": {
            borderColor: "#ffb000",
            boxShadow: "4px 4px 0px rgba(255,176,0,0.15)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none", backgroundColor: "#111111", border: "1px solid #2a1f0a" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          borderRadius: 0,
          fontWeight: 700,
          letterSpacing: "0.08em",
          fontFamily: "'Share Tech Mono', monospace",
          clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
        },
        outlined: {
          borderColor: "#ffb000",
          color: "#ffb000",
          borderWidth: 2,
          "&:hover": { borderColor: "#ff6b00", color: "#ff6b00", background: "rgba(255,176,0,0.08)" },
        },
        contained: {
          background: "#ffb000",
          color: "#0a0a0a",
          "&:hover": { background: "#ff6b00" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 0, fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem" },
        outlined: {
          borderColor: "#2a1f0a",
          color: "#ffe0a0",
          backgroundColor: "rgba(255,176,0,0.05)",
          "&:hover": { borderColor: "#ffb000", backgroundColor: "rgba(255,176,0,0.1)" },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#0a0a0a",
          borderBottom: "2px solid #ffb000",
        },
      },
    },
  },
});

export default cyberpunk;
