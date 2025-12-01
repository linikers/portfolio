"use client";

import React, { useEffect, useState } from "react";
import { bootMessages } from "./bootSequence";
import { animateTerminal } from "./gsapTerminal";
import DeskScene from "../backgroundDesk";

export default function AnimatedPage({ onFinish }: { onFinish?: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDone(true);
      if (onFinish) onFinish();
    }, (bootMessages.length * 250) + 800);
  }, []);

  if (!done) {
    return (
      <DeskScene>
        {/* terminal já aparece no monitor */}
      </DeskScene>
    );
  }

  // quando terminar a animação, vai para app
  return <>{onFinish && onFinish()}</>;
}
