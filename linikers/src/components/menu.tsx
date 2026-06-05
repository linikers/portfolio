"use client";

import { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Grow,
  Divider,
} from "@mui/material";
import {
  PersonOutline,
  ArticleOutlined,
  BuildOutlined,
  FolderOutlined,
  MailOutlined,
  HomeOutlined,
} from "@mui/icons-material";

const menuItems = [
  { href: "/", label: "Home", icon: <HomeOutlined fontSize="small" /> },
  { href: "/perfil", label: "Perfil", icon: <PersonOutline fontSize="small" /> },
  { href: "/blog", label: "Blog", icon: <ArticleOutlined fontSize="small" /> },
  { href: "/ferramentas", label: "Ferramentas", icon: <BuildOutlined fontSize="small" /> },
  { href: "/projetos", label: "Projetos", icon: <FolderOutlined fontSize="small" /> },
  { href: "/contato", label: "Contato", icon: <MailOutlined fontSize="small" /> },
];

export default function MenuUser() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          p: 0.5,
          borderRadius: "50%",
          border: "2px solid transparent",
          transition: "all 0.2s",
          "&:hover": {
            borderColor: "primary.main",
            boxShadow: "0 0 12px rgba(34, 211, 238, 0.3)",
          },
        }}
      >
        <Avatar
          alt="Liniker"
          src="https://live.staticflickr.com/65535/53846668019_bdd38aef38_n.jpg"
          sx={{ width: 48, height: 48 }}
        />
      </Box>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={200}>
            <Paper
              sx={{
                mt: 1,
                minWidth: 200,
                background: "#111827",
                border: "1px solid #1e293b",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList dense>
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.href}
                      component="a"
                      href={item.href}
                      onClick={handleClose}
                      sx={{
                        py: 1.2,
                        px: 2,
                        fontFamily: "monospace",
                        fontSize: "0.85rem",
                        color: "#94a3b8",
                        transition: "all 0.15s",
                        "&:hover": {
                          color: "#22d3ee",
                          background: "rgba(34, 211, 238, 0.08)",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.label} />
                    </MenuItem>
                  ))}
                  <Divider sx={{ borderColor: "#1e293b", my: 0.5 }} />
                  <MenuItem
                    component="a"
                    href="https://github.com/linikers"
                    target="_blank"
                    onClick={handleClose}
                    sx={{
                      py: 1.2,
                      px: 2,
                      fontFamily: "monospace",
                      fontSize: "0.8rem",
                      color: "#64748b",
                      "&:hover": {
                        color: "#22d3ee",
                        background: "rgba(34, 211, 238, 0.08)",
                      },
                    }}
                  >
                    <ListItemText primary="GitHub ↗" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
