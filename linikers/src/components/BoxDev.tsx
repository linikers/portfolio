import { BugReport, DeveloperBoard, DesignServices } from "@mui/icons-material";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { TbUxCircle } from "react-icons/tb";
import { MdImportantDevices } from "react-icons/md";
import { TbBugOff } from "react-icons/tb";

const UxIcon: any = TbUxCircle;
const BugIcon: any = TbBugOff;
const DeviceIcon: any = MdImportantDevices;

interface DevItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}

const items: DevItemProps[] = [
  {
    icon: <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><UxIcon size={28} /><DesignServices fontSize="small" /></Box>,
    title: "UX/UI Design",
    desc: "Interfaces intuitivas, design systems, prototipagem, responsividade e experiencia do usuario.",
    color: "#ec4899",
  },
  {
    icon: <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><DeveloperBoard fontSize="small" /><DeviceIcon size={28} /></Box>,
    title: "Desenvolvimento",
    desc: "Aplicacoes web completas, APIs, integracoes, deploy e monitoramento.",
    color: "#22d3ee",
  },
  {
    icon: <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><BugReport fontSize="small" /><BugIcon size={28} /></Box>,
    title: "Correcoes",
    desc: "Debug, revisao de codigo, otimizacao de performance e resolucao de bugs.",
    color: "#f59e0b",
  },
];

export default function BoxDev() {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
      {items.map((item) => (
        <Card
          key={item.title}
          sx={{
            width: 220,
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(8px)",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            transition: "all 0.25s",
            "&:hover": {
              borderColor: item.color,
              transform: "translateY(-2px)",
              boxShadow: `0 4px 20px ${item.color}10`,
            },
          }}
        >
          <CardContent sx={{ p: 3, textAlign: "center" }}>
            <Box sx={{ color: item.color, mb: 1.5, display: "flex", justifyContent: "center" }}>
              {item.icon}
            </Box>
            <Typography
              variant="h6"
              sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.9rem", mb: 1 }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: "0.8rem", lineHeight: 1.6 }}
            >
              {item.desc}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
