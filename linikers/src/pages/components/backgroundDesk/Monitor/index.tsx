"use client";

// import BootTerminal from "@animatedPage/bootTerminal";
import { useState } from "react";
import BootTerminal from "../../animatedPage/bootTerminal";
// import router from "next/router";
import { useRouter } from "next/navigation";

export default function Monitor() {
  const [finished, setFinished] = useState(false);
  const router = useRouter();

  function endBoot() {
    setFinished(true);
    setTimeout(() => router.push("/perfil"), 1800);
  }
  
  return (
    <div className="monitor-ui">
      {!finished && <BootTerminal onFinish={endBoot} />}
      {finished && (
        <div className="terminal-ready">
          <span>user@linikers:~$ </span>
        </div>
      )}
    </div>
  );
}
