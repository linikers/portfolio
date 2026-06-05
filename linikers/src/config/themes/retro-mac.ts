// Tema 5: Retro Mac — Beige/cream, teal, pixel-perfect
// Inspirado no Macintosh original (1984), Apple II, interfaces WIMP clássicas

import { createTheme } from "@mui/material/styles";

const retroMac = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#008080",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#c0c0c0",
    },
    background: {
      default: "#f5f0e0",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#555555",
    },
    divider: "#c0c0c0",
    error: { main: "#cc0000" },
    warning: { main: "#cc6600" },
    info: { main: "#000080" },
    success: { main: "#008000" },
  },
  typography: {
    fontFamily: "'Chicago', 'VT323', 'Press Start 2P', 'Courier New', monospace",
    h2: { fontWeight: 400, letterSpacing: "0.02em" },
    h3: { fontWeight: 400, letterSpacing: "0.02em" },
    h5: { fontWeight: 400 },
    h6: { fontWeight: 700 },
    body1: { fontFamily: "'Chicago', 'Geneva', 'Inter', sans-serif", fontWeight: 400 },
    body2: { fontFamily: "'Chicago', 'Geneva', 'Inter', sans-serif" },
    button: {
      fontFamily: "'Chicago', 'VT323', monospace",
      fontWeight: 400,
      textTransform: "none",
      fontSize: "0.85rem",
    },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#f5f0e0",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d5d0c0' fill-opacity='0.6'%3E%3Ccircle cx='3' cy='3' r='0.5'/%3E%3C/g%3E%3C/svg%3E\")",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#ffffff",
          border: "2px solid #000000",
          borderRadius: 0,
          boxShadow: "4px 4px 0px rgba(0,0,0,0.15)",
          "&:hover": { boxShadow: "6px 6px 0px rgba(0,128,128,0.2)" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#ffffff",
          border: "1px solid #c0c0c0",
          borderRadius: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 0,
          fontWeight: 700,
          fontFamily: "'Chicago', 'VT323', monospace",
          border: "2px solid #000",
          boxShadow: "2px 2px 0px rgba(0,0,0,0.3)",
        },
        outlined: {
          borderColor: "#000000",
          color: "#000000",
          background: "#ffffff",
          borderWidth: 2,
          "&:hover": {
            background: "#000000",
            color: "#ffffff",
            boxShadow: "3px 3px 0px rgba(0,128,128,0.3)",
          },
        },
        contained: {
          background: "#000000",
          color: "#ffffff",
          border: "2px solid #000",
          "&:hover": { background: "#008080", borderColor: "#008080", boxShadow: "3px 3px 0px rgba(0,128,128,0.3)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 0, fontFamily: "'Chicago', 'VT323', monospace", fontSize: "0.75rem", border: "1px solid #000" },
        outlined: {
          borderColor: "#000",
          color: "#1a1a1a",
          backgroundColor: "#ffffff",
          "&:hover": { backgroundColor: "#000", color: "#fff" },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#ffffff",
          color: "#000000",
          borderBottom: "2px solid #000000",
          boxShadow: "none",
        },
      },
    },
  },
});

export default retroMac;
