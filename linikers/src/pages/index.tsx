import BackgroundRoom from "./components/backgroundDesk/backgroundRoom";
import Monitor from "./components/backgroundDesk/Monitor";

export default function Home() {
  return (
    <div
      className="home-root"
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
      <BackgroundRoom />
      <Monitor />
    </div>
  );
}
