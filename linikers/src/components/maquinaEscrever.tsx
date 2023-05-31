import { useEffect, useState } from "react";

interface MaquinaProps {
  lines: string[];
  delay?: number;
  hideCursor?: boolean;
}

interface EscreverProps {
  texto: string;
  i?: number;
  linha?: number;
}

export default function MaquinaDeEscrever({
  lines,
  delay = 160,
  hideCursor = false,
}: MaquinaProps) {
  const [textState, setTextState] = useState<string>("");
  const [mostrarCursor, setMostrarCursor] = useState(!hideCursor);
  const [currentLine, setCurrentLine] = useState<number>(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const escrever = ({ texto, i = 0, linha = 0 }: EscreverProps) => {
      if (i < texto.length) {
        setTextState((prevText) => prevText + texto[i]);
        timeoutId = setTimeout(
          () => escrever({ texto, i: i + 1, linha }),
          delay
        );
      } else {
        setMostrarCursor(true);
        timeoutId = setTimeout(() => {
          setMostrarCursor(false);
          setCurrentLine((prevline) => prevline + 1);
        }, delay);
      }
    };

    if (currentLine < lines.length) {
      escrever({ texto: lines[currentLine] });
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [lines, delay, hideCursor, currentLine]);

  return (
    <>
      {textState}
      {mostrarCursor && (
        <span className="blink-cursor text-xl md:text-2xl ml-1 font-medium">
          |
        </span>
      )}
    </>
  );
}
