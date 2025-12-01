import React from "react";
import BackgroundDesk from "./backgroundDesk";
import Monitor from "./Monitor";

export default function DeskScene() {
  return (
    <BackgroundDesk>
      <Monitor />
    </BackgroundDesk>
  );
}
