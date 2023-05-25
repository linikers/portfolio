import Logo from "@/components/logo";
import MenuUser from "@/components/menu";
import BoxTop from "@/components/top";
import { Container } from "reactstrap";

export default function Home() {
  return (
    <Container className="bg-custom-base-0 min-h-screen flex flex-col items-center justify-center">
      <div className="absolute top-0 right-0 z-10">
        <MenuUser />
      </div>
      <div className="z-10">
        <Logo />
      </div>
      <div className="z-0">
        <BoxTop />
      </div>
    </Container>
  );
}
