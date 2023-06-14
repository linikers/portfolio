import Social from "@/components/social";
import BoxTop from "@/components/top";
import { IoLogoWhatsapp } from "react-icons/io5";
import { Container } from "reactstrap";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Contato() {
  const [isShock, setIsShock] = useState(false);

  useEffect(() => {
    setIsShock(true);
  }, []);

  const shockVar = {
    shocked: {
      scale: [1, 1.1, 0.9, 1],
      rotate: [-1, 1, -1, 0],
      transition: {
        duration: 0.5,
        repeat: 4,
        ease: "easeInOut",
      },
    },
  };

  const fadeVar = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.9,
      },
    },
  };

  return (
    <Container className="flex flex-col justify-center items-center mt-20">
      <div className="absolute inset-0 z-0">
        <BoxTop />
      </div>
      <div className="relative z-1 flex flex-col justify-center items-center">
        <motion.span
          className="text-custom-base-2 text-xl mt-6"
          variants={fadeVar}
          initial="initial"
          animate="animate"
        >
          Entre em contato com{" "}
        </motion.span>
        <p className="text-custom-blue-1 text-5xl mt-6 text-stroke text-stroke-xl">
          Liniker&#39;S
        </p>
        <span>
          <a
            href="https://wa.me/5544984198075?text=Oi%20Liniker%20vi%20seu%20portfolio"
            target="_blank"
          >
            <motion.div
              whileHover={{ filter: "blur(2px) brightness(1.8)" }}
              whileTap={{ filter: "blur(8px) brightness(0.8)" }}
              className="transition-all"
            >
              <IoLogoWhatsapp className="text-custom-base-0 text-4xl m-4 shadow-xl" />
            </motion.div>
          </a>
        </span>
      </div>
      <div className="relative z-1 h-full flex justify-center items-center">
        <div className="text-custom-base-1">
          <Social />
        </div>
      </div>
    </Container>
  );
}
