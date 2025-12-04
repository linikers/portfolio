"use client";
import { useEffect, useRef, useState } from "react";
import Monitor from "./Monitor";
// import Monitor from "../Monitor";

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();

    img.onload = () => {
      // Desenha a imagem no canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Opcional: Limpa área do monitor (cria "buraco")
      // const monitorX = canvas.width * 0.62;
      // const monitorY = canvas.height * 0.30;
      // const monitorW = canvas.width * 0.18;
      // const monitorH = canvas.height * 0.24;
      // ctx.clearRect(monitorX, monitorY, monitorW, monitorH);
    };

    img.src = "/assets/bgroomhd.png";

    // Calcula escala responsiva
    const calculateScale = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const canvasWidth = 1536;
      const canvasHeight = 1024;

      const scaleX = viewportWidth / canvasWidth;
      const scaleY = viewportHeight / canvasHeight;
      const newScale = Math.max(scaleX, scaleY); // cover

      setScale(newScale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "1536px",
          height: "1024px",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Canvas com a imagem */}
        <canvas
          ref={canvasRef}
          width={1536}
          height={1024}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            imageRendering: "pixelated",
          }}
        />

        {/* Monitor overlay - agora % do canvas! */}
        <Monitor />
      </div>
    </div>
  );
}
