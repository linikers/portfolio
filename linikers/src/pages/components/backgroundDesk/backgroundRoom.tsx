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
        width: "100%",
        height: "100%",
        // maxWidth: "1536px",
        // maxHeight: "1024px",
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
