import { useEffect, useState } from "react";

interface MaquinaProps {
  text: string;
  delay?: number;
  hideCursor?: boolean;
}

interface EscreverProps {
  texto: string;
  i?: number;
}

export default function MaquinaDeEscrever({
  text,
  delay = 160,
  hideCursor = false,
}: MaquinaProps) {
  const [textState, setTextState] = useState<string>("");
  const [mostrarCursor, setMostrarCursor] = useState(!hideCursor);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const escrever = ({ texto, i = 0 }: EscreverProps) => {
      if (i < texto.length) {
        setTextState(texto.slice(0, i + 1));
        timeoutId = setTimeout(
          () => escrever({ texto: texto, i: i + 1 }),
          delay
        );
      } else {
        setMostrarCursor(!hideCursor);
      }
    };

    timeoutId = setTimeout(() => escrever({ texto: text }), delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, delay, hideCursor]);

  return (
    <>
      {textState}
      {mostrarCursor && (
        <span className="blink-cursor text-xl md:text-2xl ml-1 font-medium">
          {""}
        </span>
      )}
    </>
  );
}
