import React from "react";
import BackgroundDesk from "./backgroundDesk";
import Monitor from "./Monitor";

export default function DeskScene({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <BackgroundDesk>
      <Monitor />
    </BackgroundDesk>
  );
}
