import { Container, Typography, Box, keyframes } from "@mui/material";
import BoxGitDefault from "@/components/BoxGitDefault";
import BoxDev from "@/components/BoxDev";
import { motion } from "framer-motion";
import {
  DiJsBadge, DiCss3, DiLinux, DiDocker, DiGithub, DiMongodb,
  DiSass, DiPostgresql, DiReact, DiHtml5, DiScrum, DiUbuntu,
} from "react-icons/di";
import { TbBrandTypescript, TbBrandNextjs } from "react-icons/tb";

const JsIcon: any = DiJsBadge;
const CssIcon: any = DiCss3;
const LinuxIcon: any = DiLinux;
const TsIcon: any = TbBrandTypescript;
const DockerIcon: any = DiDocker;
const GithubIcon: any = DiGithub;
const MongodbIcon: any = DiMongodb;
const SassIcon: any = DiSass;
const PostgresqlIcon: any = DiPostgresql;
const ReactIcon: any = DiReact;
const HtmlIcon: any = DiHtml5;
const ScrumIcon: any = DiScrum;
const NextIcon: any = TbBrandNextjs;
const UbuntuIcon: any = DiUbuntu;

const ferramentas = [
  { icon: <JsIcon size={40} /> },
  { icon: <TsIcon size={40} /> },
  { icon: <NextIcon size={40} /> },
  { icon: <DockerIcon size={40} /> },
  { icon: <GithubIcon size={40} /> },
  { icon: <HtmlIcon size={40} /> },
  { icon: <ScrumIcon size={40} /> },
  { icon: <ReactIcon size={40} /> },
  { icon: <CssIcon size={40} /> },
  { icon: <LinuxIcon size={40} /> },
  { icon: <MongodbIcon size={40} /> },
  { icon: <PostgresqlIcon size={40} /> },
  { icon: <SassIcon size={40} /> },
  { icon: <UbuntuIcon size={40} /> },
];

const scrollAnim = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export default function Ferramentas() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "monospace",
          fontWeight: 900,
          mb: 1,
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        ferramentas/
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.85rem", mb: 4 }}
      >
        $ which dev
      </Typography>

      {/* GitHub Stats */}
      <Box
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BoxGitDefault />
      </Box>

      {/* Dev Badges */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <BoxDev />
      </Box>

      {/* Scrolling Icons */}
      <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          py: 3,
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            animation: `${scrollAnim} 40s linear infinite`,
            gap: 3,
          }}
        >
          {[...ferramentas, ...ferramentas].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2 }}
              style={{ display: "inline-flex", color: "inherit" }}
            >
              <Box sx={{ color: "text.secondary", "&:hover": { color: "primary.main" }, transition: "color 0.2s" }}>
                {f.icon}
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
