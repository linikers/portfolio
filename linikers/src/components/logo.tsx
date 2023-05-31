import { useEffect, useState } from "react";
import MaquinaDeEscrever from "./maquinaEscrever";

export default function Logo() {
  const [lines, setLines] = useState<string[]>([
    "Olá, clique no avatar para saber mais sobre",
    "LinikerS",
    "Front-End Developer | E-commerce | SEO",
  ]);
  const [currentLine, setCurrentLine] = useState<number>(0);

  useEffect(() => {
    if (currentLine < lines.length) {
      const timeoutId = setTimeout(() => {
        setCurrentLine((prevLine) => prevLine + 1);
      }, 2000); // Delay entre cada linha (2000ms)

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [currentLine, lines]);

  return (
    <figure className="font-source-code-pro font-bold text-lg p-2 m-1 text-center shadow-xl">
      {lines.map((line, index) => (
        <div key={index}>
          {index < currentLine ? (
            <>
              {index === 0 && (
                <span className="text-custom-base-1 shadow-xl">
                  <MaquinaDeEscrever lines={[line]} />
                </span>
              )}
              {index === 1 && (
                <p className="text-custom-base-2 text-xl mt-2 mb-2 shadow-xl">
                  <MaquinaDeEscrever lines={[line]} />
                </p>
              )}
              {index === 2 && (
                <span className="text-custom-red-1">
                  <MaquinaDeEscrever lines={[line]} />
                </span>
              )}
            </>
          ) : null}
        </div>
      ))}
    </figure>
  );
}
