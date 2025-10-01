import { useEffect, useState } from "react";
import MaquinaDeEscrever from "./maquinaEscrever";

export default function Logo() {
  const [lines, ] = useState<string[]>([
    "   Hey, clique no avatar para saber mais sobre",
    "  LinikerS",
    " Web Developer ",
  ]);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [showNextLine, setShowNextLine] = useState<boolean>(false);
  const [, setTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    if (currentLine < lines.length) {
      const timeoutId = setTimeout(() => {
        setShowNextLine(true);
      }, 50);
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
      }, 9000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showNextLine, currentLine, lines]);

  return (
    <figure className="font-source-code-pro font-bold text-lg p-2 m-1 text-center md:text-xl lg:text-2xl ">
      {lines.map((line, index) => (
        <div key={index}>
          {index < currentLine ? (
            <>
              {index === 0 && (
                <span className="text-custom-base-1 text-lg md:text-xl lg:text-2xl text-shadow-base-1">
                  {line}
                </span>
              )}
              {index === 1 && (
                <p className="text-custom-blue-1 text-2xl mt-2 mb-2 text-shadow-base-2">
                  {line}
                </p>
              )}
              {index === 2 && (
                <span className="text-custom-red-1 text-lg md:text-xl lg:text-2xl text-shadow-base-1">
                  {line}
                </span>
              )}
            </>
          ) : (
            index === currentLine && (
              <span
                className={
                  index === 0
                    ? "text-custom-base-1"
                    : index === 1
                    ? "text-custom-base-2 text-xl mt-2 mb-2"
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
