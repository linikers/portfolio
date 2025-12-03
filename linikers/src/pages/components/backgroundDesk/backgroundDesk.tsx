import React from "react";
import DeskImage from "./deskImage";
import styles from "./desk.module.css";

export default function BackgroundDesk({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className={styles["desk-wrapper"]}>
      <div className={styles["desk-container"]}>
        <DeskImage />
        {children}
      </div>
    </div>
  );
}
