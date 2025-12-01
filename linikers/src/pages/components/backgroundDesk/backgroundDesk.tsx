import React from "react";
import DeskImage from "./deskImage";

export default function BackgroundDesk({ children }: { children?: React.ReactNode }) {
  return (
    <div className="desk-wrapper">
      <DeskImage />
      {children}
    </div>
  );
}
