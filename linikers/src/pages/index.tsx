import BackgroundRoom from "./components/backgroundDesk/backgroundRoom";
import Monitor from "./components/backgroundDesk/Monitor";

export default function Home() {
  return (
    <div className="home-root">
      <BackgroundRoom />
      <Monitor />
    </div>
  );
}
