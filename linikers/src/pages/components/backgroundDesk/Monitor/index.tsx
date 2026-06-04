"use client";
import react, { useState } from "react";
import BootTerminal from "../../animatedPage/bootTerminal";
import styles from "./monitor.module.css";

export default function Monitor({ onBootComplete }: { onBootComplete?: () => void }) {
  const [finished, setFinished] = useState(false);

  function endBoot() {
    setFinished(true);
    if (onBootComplete) {
      onBootComplete();
    }
  }

  return (
    <div className={styles.monitorZone}>
      {!finished && <BootTerminal onFinish={endBoot} />}
      {finished && (
        <div className={styles.terminalReady}>
          <span>user@linikers:~$ </span>
        </div>
      )}
    </div>
  );
}
