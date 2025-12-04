"use client";
import react, { useState } from "react";
import BootTerminal from "../../animatedPage/bootTerminal";
import { useRouter } from "next/navigation";
import styles from "./monitor.module.css";

export default function Monitor() {
  const [finished, setFinished] = useState(false);
  const router = useRouter();

  function endBoot() {
    setFinished(true);
    // setTimeout(() => router.push("/perfil"), 2800);
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
