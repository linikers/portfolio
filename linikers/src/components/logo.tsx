import { useEffect, useState } from "react";
import MaquinaDeEscrever from "./maquinaEscrever";

export default function Logo() {
  const [lines, setLines] = useState<string[]>([
    "    Olá, clique no avatar para saber mais sobre",
    "    LinikerS",
    "Front-End Developer | E-commerce | SEO",
  ]);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [showNextLine, setShowNextLine] = useState<boolean>(false);
  const [typingComplete, setTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    if (currentLine < lines.length) {
      const timeoutId = setTimeout(() => {
        setShowNextLine(true);
      }, 500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [currentLine, lines]);

  useEffect(() => {
    if (showNextLine && currentLine < lines.length) {
      const timeoutId = setTimeout(() => {
        setShowNextLine(false);
        setCurrentLine((prevLine) => prevLine + 1);
      }, 3000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showNextLine, currentLine, lines]);

  return (
    <figure className="font-source-code-pro font-bold text-lg p-2 m-1 text-center shadow-xl">
      {lines.map((line, index) => (
        <div key={index}>
          {index < currentLine ? (
            <>
              {index === 0 && (
                <span className="text-custom-base-1 shadow-xl">{line}</span>
              )}
              {index === 1 && (
                <p className="text-custom-base-2 text-xl mt-2 mb-2 shadow-xl">
                  {line}
                </p>
              )}
              {index === 2 && <span className="text-custom-red-1">{line}</span>}
            </>
          ) : (
            index === currentLine && (
              <span
                className={
                  index === 0
                    ? "text-custom-base-1 shadow-xl"
                    : index === 1
                    ? "text-custom-base-2 text-xl mt-2 mb-2 shadow-xl"
                    : "text-custom-red-1"
                }
              >
                <MaquinaDeEscrever
                  lines={[line]}
                  onComplete={() => {
                    if (currentLine < lines.length - 1) {
                      setCurrentLine((prevLine) => prevLine + 1);
                    } else {
                      setTypingComplete(true);
                    }
                  }}
                />
              </span>
            )
          )}
        </div>
      ))}
    </figure>
  );
}
