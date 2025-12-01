"use client";
import react, { useState } from "react";
import BootTerminal from "../../animatedPage/bootTerminal";
import { useRouter } from "next/navigation";
import "./src/pages/components/backgroundDesk/Monitor/monitor.css";

export default function Monitor() {
  const [finished, setFinished] = useState(false);
  const router = useRouter();

  function endBoot() {
    setFinished(true);
    setTimeout(() => router.push("/perfil"), 1800);
  }

  return (
    <div className="monitor-zone">
      {!finished && <BootTerminal onFinish={endBoot} />}
      {finished && (
        <div className="terminal-ready">
          <span>user@linikers:~$ </span>
        </div>
      )}
    </div>
  );
}
