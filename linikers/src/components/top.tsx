import Image from "next/image";
import linikers from "../../public/linikersBg.jpg";
import { Container } from "reactstrap";
import { motion } from "framer-motion";

export default function BoxTop() {
  return (
    <Container className="h-screen">
      <div className="absolute inset-0 bg-black opacity-90">
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
            src={linikers}
            alt="Imagem da sombra de um garoto"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="brightness-75"
          />
        </motion.div>
      </div>
    </Container>
  );
}
