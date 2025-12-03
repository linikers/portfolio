import Monitor from "./components/backgroundDesk/Monitor";

export default function Home() {
  return (
    <div
      className="room-container"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: "url('/assets/bgroomhd.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
      }}
    >
      {/* Monitor CRT (direita) */}
      <Monitor />
    </div>
  );
}
