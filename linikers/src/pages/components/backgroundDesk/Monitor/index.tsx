import React from "react";
import MonitorFrame from "./MonitorFrame";
import TerminalUI from "./TerminalUI";

export default function Monitor() {
  return (
    <div className="monitor-position">
      <MonitorFrame>
        <TerminalUI />
      </MonitorFrame>
    </div>
  );
}
