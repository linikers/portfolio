import { motion } from "framer-motion";
import Image from "next/image";

export default function BackgroundRoom() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      <Image
        src="/assets/bg-room.png"
        alt="room background"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </motion.div>
  );
}
