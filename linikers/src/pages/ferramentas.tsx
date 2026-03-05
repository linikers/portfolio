import MenuUser from "@/components/menu";
import { Container, Box, keyframes, Grid2 } from "@mui/material";
import BoxGitDefault from "@/components/BoxGitDefault";
import BoxDev from "@/components/BoxDev";
import { motion } from "framer-motion";
import {
  DiJsBadge,
  DiCss3,
  DiLinux,
  DiBootstrap,
  DiDocker,
  DiGithub,
  DiGnu,
  DiMagento,
  DiMongodb,
  DiSass,
  DiPostgresql,
  DiReact,
  DiHtml5,
  DiScrum,
  DiUbuntu,
} from "react-icons/di";
import { TbBrandTypescript, TbBrandNextjs } from "react-icons/tb";

const JsIcon: any = DiJsBadge;
const CssIcon: any = DiCss3;
const LinuxIcon: any = DiLinux;
const TsIcon: any = TbBrandTypescript;
const BootstrapIcon: any = DiBootstrap;
const DockerIcon: any = DiDocker;
const GithubIcon: any = DiGithub;
const GnuIcon: any = DiGnu;
const MagentoIcon: any = DiMagento;
const MongodbIcon: any = DiMongodb;
const SassIcon: any = DiSass;
const PostgresqlIcon: any = DiPostgresql;
const ReactIcon: any = DiReact;
const HtmlIcon: any = DiHtml5;
const ScrumIcon: any = DiScrum;
const NextIcon: any = TbBrandNextjs;
const UbuntuIcon: any = DiUbuntu;
import { useEffect } from "react";

const ferramentas = [
  { icon: <DiJsBadge size={45} /> },
  { icon: <TbBrandTypescript size={45} /> },
  { icon: <TbBrandNextjs size={45} /> },
  { icon: <DiDocker size={45} /> },
  { icon: <DiGithub size={45} /> },
  { icon: <DiHtml5 size={45} /> },
  { icon: <DiScrum size={45} /> },
  { icon: <DiReact size={45} /> },
  { icon: <DiMagento size={45} /> },
  { icon: <DiCss3 size={45} /> },
  { icon: <DiGnu size={45} /> },
  { icon: <DiLinux size={45} /> },
  { icon: <DiBootstrap size={45} /> },
  { icon: <DiMongodb size={45} /> },
  { icon: <DiPostgresql size={45} /> },
  { icon: <DiSass size={45} /> },
  { icon: <DiUbuntu size={45} /> },
];

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(-50%); }
  100% { transform: translateX(-100%); }
  -50% { transform: translateX(50%); }
  0% { transform: translateX(0); }
`;

export default function Ferramentas() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { getAnalytics, logEvent } = require("firebase/analytics");
      try {
        const analytics = getAnalytics();
        logEvent(analytics, "Ferramentas", {
          page_name: "ferramentas",
        });
      } catch (error) {}
    }
  }, []);

  return (
    <Container
      sx={{
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#d4d0c4",
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Grid2
        sx={{
          zIndex: 888,
        }}
      >
        <MenuUser />
      </Grid2>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
          padding: "20px",
          backgroundColor: "#2e3440",
          borderRadius: "8px",
        }}
      >
        <BoxGitDefault />
      </Box>
      <Grid2>
        <BoxDev />
      </Grid2>
      <Box
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          flexDirection: "row",
          overflow: "hidden",
          width: "200%",
          padding: "20px 0",
          animation: `${scrollAnimation} 60s linear infinite`,
        }}
      >
        {ferramentas.map((ferramenta, index) => (
          <Box
            key={index}
            display="inline-block"
            margin="0 20px"
            color="secondary"
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              style={{ display: "inline-block", transformOrigin: "center" }}
            >
              {ferramenta.icon}
            </motion.div>
          </Box>
        ))}
        {ferramentas.map((ferramenta, index) => (
          <Box
            key={index + ferramentas.length}
            display="inline-block"
            margin="0 20px"
            color="secondary"
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              style={{ display: "inline-block", transformOrigin: "center" }}
            >
              {ferramenta.icon}
            </motion.div>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
