import Logo from "@/components/logo";
import MenuUser from "@/components/menu";
import Social from "@/components/social";
import BoxTop from "@/components/top";
import { Container } from "reactstrap";

export default function Home() {
  return (
    <Container className="min-h-screen flex flex-col items-center justify-center">
      <div className="absolute z-10 flex flex-col items-center">
        <MenuUser />
        <div className=" z-10 flex flex-col items-center justify-center">
          <Logo />
        </div>
      </div>
      <div className="absolute bottom-0 z-10 flex flex-col items-end text-custom-base-1">
        <Social />
      </div>
      <div className="z-1">
        <BoxTop />
      </div>
    </Container>
  );
}
