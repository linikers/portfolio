import React from "react";
import "./monitor.css";

interface Props {
  children: React.ReactNode;
}

const MonitorFrame: React.FC<Props> = ({ children }) => {
  return (
    <div className="monitor-frame">
      <div className="monitor-inner">
        {children}
      </div>
    </div>
  );
};

export default MonitorFrame;
