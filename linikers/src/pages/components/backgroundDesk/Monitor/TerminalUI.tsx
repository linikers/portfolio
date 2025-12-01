import React, { useEffect, useRef } from "react";
import { animateTerminal } from "../../animatedPage/gsapTerminal";
// import { animateTerminal } from "@/components/animatedPage/gsapTerminal";

const TerminalUI: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) animateTerminal(ref.current);
  }, []);

  return (
    <div className="terminal-ui" ref={ref}>
      <span className="cmd">booting system...</span>
      <span className="cmd">starting network interface...</span>
      <span className="cmd">loading LinikerS.dev UI...</span>
      <span className="cmd">ok</span>
    </div>
  );
};

export default TerminalUI;
