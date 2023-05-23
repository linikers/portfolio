import Logo from "@/components/logo";
import { Container } from "reactstrap";

export default function Home() {
  return (
    <Container className="bg-custom-base-0">
      <header className="py-4">
        <Logo />
      </header>
    </Container>
  );
}
