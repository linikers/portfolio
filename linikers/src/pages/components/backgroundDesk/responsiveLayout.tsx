import React from "react";

export default function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-responsive">
      {children}
    </div>
  );
}
