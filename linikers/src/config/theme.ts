// src/config/theme.ts
// Tema MUI consistente para todo o portfólio
// Baseado nas cores originais do projeto (globals.scss)

import { createTheme } from "@mui/material/styles";

const palette = {
  // Cores originais do globals.scss
  customBase0: "#d8ccc8",
  customBase1: "#c7ff3a",
  customBase2: "#3c0675",
  customBlack0: "#302a2b",
  customRed1: "#ff9f0d",
  customBlue1: "#699fcb",

  // Cores do dark theme (home, loja)
  darkBg: "#0a0a0f",
  darkSurface: "#111827",
  darkBorder: "#1e293b",
  darkText: "#f0f0f0",
  darkMuted: "#64748b",
  accent: "#22d3ee",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: palette.accent,
      contrastText: "#000",
    },
    secondary: {
      main: palette.customBase1,
    },
    background: {
      default: palette.darkBg,
      paper: palette.darkSurface,
    },
    text: {
      primary: palette.darkText,
      secondary: palette.darkMuted,
    },
    divider: palette.darkBorder,
  },

  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h2: {
      fontWeight: 900,
    },
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: palette.darkSurface,
          border: `1px solid ${palette.darkBorder}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          fontWeight: 600,
        },
        outlined: {
          borderColor: palette.darkBorder,
          color: palette.darkMuted,
          "&:hover": {
            borderColor: palette.accent,
            color: palette.accent,
            background: "rgba(34, 211, 238, 0.08)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "monospace",
        },
        outlined: {
          borderColor: palette.darkBorder,
          color: "#cbd5e1",
          backgroundColor: "rgba(255,255,255,0.03)",
          "&:hover": {
            borderColor: palette.accent,
            backgroundColor: "rgba(34, 211, 238, 0.08)",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "&.MuiContainer-maxWidthLg": {
            maxWidth: "1200px",
          },
        },
      },
    },
  },
});

export default theme;
export { palette };
