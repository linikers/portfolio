import { Container, ListGroup } from "reactstrap";
import { motion } from "framer-motion";
import {
  FaReact,
  FaJs,
  FaCode,
  FaBootstrap,
  FaJsSquare,
  FaHtml5,
  FaCss3,
  FaTrophy,
} from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";
import { BsBootstrap } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io5";
import { HiCode } from "react-icons/hi";
import MenuUser from "@/components/menu";

export default function Ferramentas() {
  return (
    <Container className="h-screen bg-black flex flex-col justify-center items-center">
      <MenuUser />
      <ListGroup
        className="h-full flex flex-col justify-center "
        style={{ maxWidth: 400 }}
      >
        <div className="flex  gap-2 text-white justify-around text-3xl">
          <motion.div
            initial={{ filter: "blur(0px)" }}
            whileHover={{ filter: "blur(4px)" }}
            whileTap={{ filter: "blur(8px)" }}
          >
            <FaHtml5 className="mr-2 text-3xl" />
          </motion.div>
          <span className="text-xl">HTML5</span>
        </div>

        <div className="flex gap-2 text-white text-3xl justify-around mt-2">
          <motion.div
            style={{ display: "inline-block", transformOrigin: "center" }}
            animate={{
              rotate: [0, 15, 0, -15, 0],
            }}
            exit={{
              rotate: 1,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaCss3 className="mr-2 text-3xl" />
          </motion.div>
          <span className="text-xl">CSS3</span>
        </div>

        <div className="flex gap-2 text-white text-3xl justify-around mt-2">
          <motion.div
            style={{ display: "inline-block", transformOrigin: "center" }}
            animate={{
              rotate: [0.6, 6.2, 0.6],
            }}
            exit={{
              scale: 6.2,
            }}
            transition={{
              duration: 4.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaJs className="mr-2 text-3xl" />
          </motion.div>
          <span className="text-xl">JavaScript</span>
        </div>

        <div className="flex gap-2 text-white text-3xl justify-around mt-2">
          <motion.div
            style={{ display: "inline-block", transformOrigin: "center" }}
            animate={{
              rotate: [0, 360],
            }}
            exit={{
              rotate: 0,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaReact className="mr-2 text-3xl" />
          </motion.div>
          <span className="text-xl">React</span>
        </div>

        <div className="flex gap-2 text-white text-3xl justify-around mt-2">
          <motion.div
            style={{ display: "inline-block", transformOrigin: "center" }}
            animate={{
              rotate: [0, 25, -25, 0],
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
            <SiTypescript className="mr-2 text-3xl" />
          </motion.div>
          <span className="text-xl">Typescript</span>
        </div>

        <div className="flex gap-2 text-white text-3xl justify-around mt-2 ">
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
            <SiNextdotjs className="mr-2 text-3xl" />
          </motion.div>
          <span className="text-xl">Next</span>
        </div>

        <div className="flex gap-2 text-white text-3xl justify-around mt-2 ">
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
            <HiCode className="mr-2 text-3xl" />
          </motion.div>
          <span className="text-xl">Tailwind</span>
        </div>

        <div className="flex gap-2 text-white text-3xl justify-around mt-2 ">
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
            <BsBootstrap className="mr-2 text-3xl" />
          </motion.div>
          <span className="text-xl">Bootstrap</span>
        </div>

        <div className="flex gap-2 text-white text-3xl justify-around mt-2 ">
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
            <IoLogoGithub className="mr-2 text-3xl" />
          </motion.div>
          <span className="text-xl">Git</span>
        </div>
      </ListGroup>
    </Container>
  );
}
