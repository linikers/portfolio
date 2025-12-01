"use client";
import { useEffect, useState } from "react";
import { bootMessages } from "./bootSequence";

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
  }, [currentIndex]);

  return (
    <div className="terminal">
      {displayedLines.map((line, index) => (
        <div key={index} className="line">{line}</div>
      ))}
      <span className="blink">█</span>
    </div>
  );
}
