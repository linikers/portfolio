import { Container, ListGroup } from "reactstrap";
import { motion } from "framer-motion";
import { FaReact, FaJs, FaCode, FaBootstrap } from "react-icons/fa";
import MenuUser from "@/components/menu";

export default function Ferramentas() {
  return (
    <Container className="h-screen bg-black">
      <MenuUser />
      <ListGroup className="h-full flex flex-col justify-center items-center">
        <div className="flex items-center gap-4 text-white text-3xl">
          <motion.div
            style={{ display: "inline-block", transformOrigin: "center" }}
            animate={{
              rotate: [0, 25, 0, -25, 0],
            }}
            exit={{
              rotate: 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaJs className="mr-2" />
          </motion.div>
          <span>JavaScript</span>
        </div>

        <div className="flex items-center gap-4 text-white text-3xl">
          <motion.div
            style={{ display: "inline-block", transformOrigin: "center" }}
            animate={{
              rotate: [0, 360],
            }}
            exit={{
              rotate: 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaReact className="mr-2" />
          </motion.div>
          <span>React</span>
        </div>

        <div className="flex items-center gap-4 text-white text-3xl">
          <motion.div
            style={{ display: "inline-block", transformOrigin: "center" }}
            animate={{
              rotate: [0, 25, 0, -25, 0],
            }}
            exit={{
              rotate: 0,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaCode className="mr-2" />
          </motion.div>
          <span>Tailwind</span>
        </div>

        <div className="flex items-center gap-4 text-white text-3xl">
          <motion.div
            style={{ display: "inline-block", transformOrigin: "center" }}
            animate={{
              rotate: [0, 25, 0, -25, 0],
            }}
            exit={{
              rotate: 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaBootstrap className="mr-2" />
          </motion.div>
          <span>Bootstrap</span>
        </div>
      </ListGroup>
    </Container>
  );
}
