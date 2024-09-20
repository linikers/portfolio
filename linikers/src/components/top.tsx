import Image from "next/image";
// import linikers from "../../public/linikersBg.jpg";
import { motion } from "framer-motion";
import { Box, Container } from "@mui/material";

export default function BoxTop() {
  return (
    <Container sx={{
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Box sx={{ position: 'absolute', inset: 0, backgroundColor: 'black', opacity: 0.9 }}>
        <motion.div
          style={{
            width: "100%",
            height: "100%",
          }}
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: "easeOut",
            },
          }}
        >
          <Image
            src={"/../public/linikersbg.jpg"}
            alt="Imagem da sombra de um garoto"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="brightness-75"
          />
        </motion.div>
      </Box>
    </Container>
  );
}
