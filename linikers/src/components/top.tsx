import Image from "next/image";
import linikers from "../../public/linikersBg.jpg";
import { Container } from "reactstrap";

export default function BoxTop() {
  return (
    <Container className="h-screen">
      <Image
        src={linikers}
        alt="Imagem da sombra de um garoto"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </Container>
  );
}
