import { motion } from "framer-motion";
import Image from "next/image";

export default function BackgroundRoom({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="backgroundRoom"
      style={{
        position: "relative",
        width: "100%", // ← Preenche a tela
        height: "100%", // ← Preenche a tela
        minWidth: "1536px", // ← Tamanho mínimo (força zoom em telas menores)
        minHeight: "1024px",
        margin: "0 auto",
      }}
    >
      <Image
        // src="/assets/bg-room.png"
        src="/assets/bgroomhd.png"
        alt="room background"
        fill
        style={{
          objectFit: "cover", // ← Preenche tela toda (zoom/crop)
          imageRendering: "pixelated",
        }}
        priority
      />
      {children}
    </motion.div>
  );
}
