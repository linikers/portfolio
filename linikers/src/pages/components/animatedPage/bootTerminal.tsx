"use client";
import { useEffect, useState } from "react";
import { bootMessages } from "@/utils/animatedPage/bootSequence";
import styles from "./terminal.module.css";

export default function BootTerminal({ onFinish }: { onFinish: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    if (currentIndex < bootMessages.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, bootMessages[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => onFinish(), 600);
    }
  }, [currentIndex, onFinish]);

  return (
    <div className={styles.terminal}>
      {displayedLines.map((line, index) => (
        <div key={index} className={styles.line}>
          {line}
        </div>
      ))}
      <span className="blink">█</span>
    </div>
  );
}
