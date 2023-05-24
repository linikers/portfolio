import Logo from "@/components/logo";
import BoxTop from "@/components/top";
import { Container } from "reactstrap";

export default function Home() {
  return (
    <Container className="bg-custom-base-0">
      <header className="py-4">
        <Logo />
      </header>
      <main>
        <BoxTop />
      </main>
    </Container>
  );
}
