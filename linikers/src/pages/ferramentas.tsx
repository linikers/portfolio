import MenuUser from "@/components/menu";
// import { Container, Box, keyframes } from "@mui/material";
import { motion } from "framer-motion";
import { DiJsBadge } from "react-icons/di/index.js";
import { DiCss3 } from "react-icons/di/index.js";
import { DiLinux } from "react-icons/di/index.js";
import { TbBrandTypescript } from "react-icons/tb/index.js";
import { DiBootstrap } from "react-icons/di/index.js";
import { DiDocker } from "react-icons/di/index.js";
import { DiGithub } from "react-icons/di/index.js";
import { DiGnu } from "react-icons/di/index.js";
import { DiMagento } from "react-icons/di/index.js";
import { DiMongodb } from "react-icons/di/index.js";
import { DiSass } from "react-icons/di/index.js";
import { DiPostgresql } from "react-icons/di/index.js";
import { DiReact } from "react-icons/di/index.js";
import { DiHtml5 } from "react-icons/di/index.js";
import { DiScrum } from "react-icons/di/index.js";
import { TbBrandNextjs } from "react-icons/tb/index.js";
import { Box, Container, keyframes } from "@chakra-ui/react";

const ferramentas = [
  { icon: <DiJsBadge size={45} />},
  { icon: <TbBrandTypescript size={45} />},
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
];

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  // 50% { transform: translateX(-50%); }
  100% { transform: translateX(-100%); }
  // 50% { transform: translateX(50%); }
  // 25% { transform: translateX(25%); }
  // 0% { transform: translateX(0); }
`
const ScrollContainer = motion(Box);

export default function Ferramentas() {
  return (
    <Container 
      sx={{ 
        justifyContent: 'center', 
        flexDirection: 'column', 
        alignItems: 'center',
        bgcolor: '#d4d0c4', 
        display: 'flex', 
        height: '100vh',
        overflow: 'hidden',
        width: '100%',
      }}>
        <MenuUser />
      <Box
        sx={{
          display: 'flex',
          whiteSpace: 'nowrap',
          flexDirection: 'row',
          overflow: 'hidden',
          width: '200%',
          // justifyContent: 'center',
          padding: '20px 0',
          animation: `${scrollAnimation} 18s linear infinite`,
        }}
      >
        {ferramentas.map((ferramenta, index) => (
            <Box key={index} display='inline-block' margin='0 20px' color="secondary">
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
          <Box key={index + ferramentas.length} display="inline-block" margin="0 20px" color="secondary">
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
