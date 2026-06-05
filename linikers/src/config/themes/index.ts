// Registry de temas retro — importe e use com ThemeContext
import { Theme } from "@mui/material/styles";
import terminalVerde from "./terminal-verde";
import synthwave from "./synthwave";
import cyberpunk from "./cyberpunk";
import matrix from "./matrix";
import retroMac from "./retro-mac";

export interface ThemeMeta {
  id: string;
  name: string;
  description: string;
  era: string;
  theme: Theme;
}

export const themes: ThemeMeta[] = [
  {
    id: "terminal-verde",
    name: "Terminal Verde",
    description: "Fósforo verde, IBM 3270, mainframe clássico",
    era: "1970s",
    theme: terminalVerde,
  },
  {
    id: "synthwave",
    name: "Synthwave",
    description: "Neon púrpura/ciano, grid, Outrun anos 80",
    era: "1980s",
    theme: synthwave,
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Âmbar industrial, scanlines, interface hacker",
    era: "1990s",
    theme: cyberpunk,
  },
  {
    id: "matrix",
    name: "Matrix",
    description: "Verde digital, fundo preto total, estética Matrix",
    era: "1990s",
    theme: matrix,
  },
  {
    id: "retro-mac",
    name: "Retro Mac",
    description: "Bege/cream, bordas pretas, Macintosh 1984",
    era: "1980s",
    theme: retroMac,
  },
];

export const defaultThemeId = "terminal-verde";

export function getThemeById(id: string): Theme {
  const found = themes.find((t) => t.id === id);
  return found ? found.theme : terminalVerde;
}
