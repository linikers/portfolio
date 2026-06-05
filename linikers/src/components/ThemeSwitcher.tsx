"use client";

import { Box, IconButton, Tooltip, keyframes } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { useThemeContext } from "@/config/ThemeContext";

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 4px rgba(34,211,238,0.3); }
  50% { box-shadow: 0 0 16px rgba(34,211,238,0.6); }
`;

export default function ThemeSwitcher() {
  const { cycleTheme, currentThemeId, themeCount } = useThemeContext();

  return (
    <Tooltip title={`Tema: ${currentThemeId} (${themeCount} temas)`} placement="left">
      <IconButton
        onClick={cycleTheme}
        size="small"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 10000,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          animation: `${pulse} 3s ease-in-out infinite`,
          "&:hover": {
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderColor: "primary.main",
          },
        }}
      >
        <PaletteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
