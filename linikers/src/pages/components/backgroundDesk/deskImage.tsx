import React from "react";
import styles from "./desk.module.css";

export default function DeskImage() {
  return (
    <div className={styles["desk-bg"]}>
      <img
        src="/desk/bgroomhd.png"
        alt="desk linikerS"
        className={styles["desk-image"]}
      />
    </div>
  );
}
