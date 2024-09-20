import MenuUser from "@/components/menu";
import { Container, Box, Typography, Grid2 } from "@mui/material";
import { motion } from "framer-motion";
import { Css, GitHub, Html, Javascript } from '@mui/icons-material'; 

const ferramentas = [
  { icon: <Html />, label: "HTML5" },
  { icon: <Css />, label: "CSS3" },
  { icon: <Javascript />, label: "JavaScript" },
  // { icon: <React />, label: "React" },
  // { icon: <TypeScript />, label: "TypeScript" },
  // { icon: <ReactIcon />, label: "Next" },
  // { icon: <Bootstrap />, label: "Bootstrap" },
  { icon: <GitHub />, label: "Git" },
];

export default function Ferramentas() {
  return (
    <Container sx={{ height: '100vh', bgcolor: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <MenuUser />
      <Grid2 container spacing={2} sx={{ maxWidth: 400, marginTop: 2 }}>
        {ferramentas.map((ferramenta, index) => (
          <Grid2 key={index}>
            <Box display="flex" alignItems="center" justifyContent="space-around" color="white">
              <motion.div
                initial={{ filter: "blur(0px)" }}
                whileHover={{ filter: "blur(4px)" }}
                whileTap={{ filter: "blur(8px)" }}
                style={{ display: "inline-block", transformOrigin: "center" }}
              >
                {ferramenta.icon}
              </motion.div>
              <Typography variant="h6">{ferramenta.label}</Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
