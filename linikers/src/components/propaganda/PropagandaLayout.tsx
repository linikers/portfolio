// src/components/propaganda/PropagandaLayout.tsx
import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  MdDashboard,
  MdAddCircle,
  MdCalendarMonth,
  MdPayments,
  MdArrowBack,
} from "react-icons/md";
import MenuUser from "@/components/menu";

const drawerWidth = 240;

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/admin/propaganda",
    icon: <MdDashboard size={22} />,
  },
  {
    label: "Nova Publicação",
    path: "/admin/propaganda/criar",
    icon: <MdAddCircle size={22} />,
  },
  {
    label: "Calendário",
    path: "/admin/propaganda/calendario",
    icon: <MdCalendarMonth size={22} />,
  },
  {
    label: "Campanhas Pagas",
    path: "/admin/propaganda/pagas",
    icon: <MdPayments size={22} />,
  },
];

export default function PropagandaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerContent = (
    <Box
      sx={{
        overflow: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          fontWeight="bold"
          color="primary"
        >
          Propaganda
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = router.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => router.push(item.path)}
                selected={isActive}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  mb: 0.5,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                    "& .MuiListItemIcon-root": { color: "white" },
                  },
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 40, color: isActive ? "white" : "inherit" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/dashboard")}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <MdArrowBack size={22} />
            </ListItemIcon>
            <ListItemText primary="Voltar ao Painel" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Sidebar Desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid #e2e8f0",
              bgcolor: "white",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "flex-end",
            bgcolor: "white",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <MenuUser />
        </Box>
        <Box sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
