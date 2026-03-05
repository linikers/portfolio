import React from "react";
import styles from "./desk.module.css";
import Image from "next/image";

export default function DeskImage() {
  return (
    <div className={styles["desk-bg"]}>
      <Image
        src="/desk/bgroomhd.png"
        alt="desk linikerS"
        fill
        className={styles["desk-image"]}
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
}
