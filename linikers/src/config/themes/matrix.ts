// Tema 4: Matrix — Verde digital, chuva de código
// Inspirado no filme Matrix, cascading code, "follow the white rabbit"

import { createTheme } from "@mui/material/styles";

const matrix = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ff41",
      contrastText: "#000000",
    },
    secondary: {
      main: "#008f11",
    },
    background: {
      default: "#000000",
      paper: "#020802",
    },
    text: {
      primary: "#00ff41",
      secondary: "#006620",
    },
    divider: "#003300",
    error: { main: "#ff3333" },
    warning: { main: "#ffff00" },
    info: { main: "#00ff41" },
    success: { main: "#00ff41" },
  },
  typography: {
    fontFamily: "'Courier New', 'Fira Code', 'JetBrains Mono', monospace",
    h2: { fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase" },
    h3: { fontWeight: 700, letterSpacing: "0.05em" },
    h5: { fontWeight: 600, letterSpacing: "0.03em" },
    h6: { fontWeight: 600 },
    body1: { fontFamily: "'Courier New', monospace", lineHeight: 1.8 },
    body2: { fontFamily: "'Courier New', monospace" },
    button: { fontFamily: "'Courier New', monospace", letterSpacing: "0.05em", textTransform: "uppercase" },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#000000",
          "&::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            background: "radial-gradient(ellipse at center, rgba(0,20,0,0.4) 0%, rgba(0,0,0,0.9) 70%)",
            pointerEvents: "none",
            zIndex: 9998,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#020802",
          border: "1px solid #003300",
          "&:hover": {
            borderColor: "#00ff41",
            boxShadow: "0 0 15px rgba(0,255,65,0.15), inset 0 0 15px rgba(0,255,65,0.03)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#020802",
          border: "1px solid #003300",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "uppercase", borderRadius: 0, fontWeight: 700, letterSpacing: "0.08em", fontFamily: "'Courier New', monospace" },
        outlined: {
          borderColor: "#006620",
          color: "#00cc33",
          borderWidth: 1,
          "&:hover": {
            borderColor: "#00ff41",
            color: "#00ff41",
            background: "rgba(0,255,65,0.05)",
            boxShadow: "0 0 10px rgba(0,255,65,0.2)",
          },
        },
        contained: {
          background: "#006620",
          color: "#00ff41",
          border: "1px solid #00ff41",
          "&:hover": { background: "#008830", boxShadow: "0 0 15px rgba(0,255,65,0.3)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 0, fontFamily: "'Courier New', monospace", fontSize: "0.7rem" },
        outlined: {
          borderColor: "#003300",
          color: "#00ff41",
          backgroundColor: "rgba(0,255,65,0.03)",
          "&:hover": {
            borderColor: "#00ff41",
            backgroundColor: "rgba(0,255,65,0.08)",
            boxShadow: "0 0 8px rgba(0,255,65,0.2)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#000000",
          borderBottom: "1px solid #003300",
        },
      },
    },
  },
});

export default matrix;
