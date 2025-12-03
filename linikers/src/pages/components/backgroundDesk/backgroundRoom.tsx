import { motion } from "framer-motion";
import Image from "next/image";

export default function BackgroundRoom() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="backgroundRoom"
      style={{
        position: "relative",
        width: "1536px", // Tamanho FIXO
        height: "1024px", // Tamanho FIXO
        margin: "0 auto",
      }}
    >
      <Image
        src="/assets/bg-room.png"
        alt="room background"
        fill
        style={{
          objectFit: "contain",
          imageRendering: "pixelated",
        }}
        priority
      />
    </motion.div>
  );
}
