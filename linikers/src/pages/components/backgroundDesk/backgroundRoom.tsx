import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BackgroundRoom({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const imageWidth = 1536;
      const imageHeight = 1024;

      // Calcula escala para preencher a tela (cover)
      const scaleX = viewportWidth / imageWidth;
      const scaleY = viewportHeight / imageHeight;
      const newScale = Math.max(scaleX, scaleY);

      setScale(newScale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="backgroundRoom"
      style={{
        position: "relative",
        width: "1536px", // FIXO
        height: "1024px", // FIXO
        transformOrigin: "center center",
        transform: `scale(${scale})`, // Escala responsiva
      }}
    >
      <Image
        src="/assets/bgroomhd.png"
        alt="room background"
        fill
        style={{
          objectFit: "cover",
          imageRendering: "pixelated",
        }}
        priority
      />
      {children}
    </motion.div>
  );
}
