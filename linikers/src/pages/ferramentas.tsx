import { Container, Typography, Box, Grid2, Card, CardContent, Chip, keyframes } from "@mui/material";
import BoxGitDefault from "@/components/BoxGitDefault";
import BoxDev from "@/components/BoxDev";
import { motion } from "framer-motion";
import {
  DiJsBadge, DiCss3, DiLinux, DiDocker, DiGithub, DiMongodb,
  DiSass, DiPostgresql, DiReact, DiHtml5, DiScrum, DiUbuntu,
} from "react-icons/di";
import { TbBrandTypescript, TbBrandNextjs } from "react-icons/tb";
import {
  Code, Storage, Cloud, Palette, DataObject, Terminal,
} from "@mui/icons-material";

const icons: Record<string, any> = {
  js: DiJsBadge, ts: TbBrandTypescript, next: TbBrandNextjs, react: DiReact,
  docker: DiDocker, github: DiGithub, html: DiHtml5, css: DiCss3,
  linux: DiLinux, mongo: DiMongodb, postgres: DiPostgresql, sass: DiSass,
  scrum: DiScrum, ubuntu: DiUbuntu,
};

const skillCards = [
  { title: "Frontend", desc: "Next.js, React, TypeScript, MUI, Tailwind, HTML5, CSS3, Sass", icon: <Code />, color: "#22d3ee" },
  { title: "Backend", desc: "Express 5, Node.js, REST APIs, TypeORM, Prisma, PostgreSQL, MongoDB", icon: <Storage />, color: "#a78bfa" },
  { title: "DevOps", desc: "Docker, Kubernetes (EKS), Helm, CI/CD, Linux, Ubuntu Server", icon: <Cloud />, color: "#f59e0b" },
  { title: "Design", desc: "Figma, UI/UX, Design Systems, Impeccable, glassmorphism, dark themes", icon: <Palette />, color: "#ec4899" },
  { title: "Blockchain", desc: "Solidity, Web3.js, MetaMask, Hardhat, Sepolia testnet, ERC20", icon: <DataObject />, color: "#10b981" },
  { title: "CLI/Tools", desc: "Git, GitHub, npm, PM2, Vercel, Cloudinary, RabbitMQ, Scrum", icon: <Terminal />, color: "#6366f1" },
];

const scrollAnim = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export default function Ferramentas() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" sx={{ fontFamily: "monospace", fontWeight: 900, mb: 1, fontSize: { xs: "1.5rem", md: "2rem" } }}>
        ferramentas/
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.85rem", mb: 6 }}>
        $ which dev && dpkg -l | grep skill
      </Typography>

      {/* Skill Cards */}
      <Grid2 container spacing={3} sx={{ mb: 6 }}>
        {skillCards.map((card) => (
          <Grid2 key={card.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(8px)",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                transition: "all 0.25s",
                "&:hover": {
                  borderColor: card.color,
                  transform: "translateY(-2px)",
                  boxShadow: `0 4px 20px ${card.color}10`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ color: card.color, mb: 1.5 }}>{card.icon}</Box>
                <Typography variant="h6" sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.9rem", mb: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem", lineHeight: 1.6 }}>
                  {card.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* GitHub Stats */}
      <Box
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <BoxGitDefault />
      </Box>

      {/* Dev Badges */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
        <BoxDev />
      </Box>

      {/* Scrolling Tech Icons */}
      <Box sx={{ overflow: "hidden", whiteSpace: "nowrap", py: 3, borderTop: "1px solid", borderBottom: "1px solid", borderColor: "divider" }}>
        <Box sx={{ display: "inline-flex", animation: `${scrollAnim} 40s linear infinite`, gap: 3 }}>
          {[...Object.entries(icons), ...Object.entries(icons)].map(([name, Icon], i) => (
            <motion.div key={i} whileHover={{ scale: 1.2 }} style={{ display: "inline-flex" }}>
              <Box sx={{ color: "text.secondary", "&:hover": { color: "primary.main" }, transition: "color 0.2s", fontSize: 40 }}>
                <Icon size={40} />
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
