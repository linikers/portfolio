import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import Image from "next/image";
import rickmorty from "../../public/rmtumbl.png";

export default function Projetos() {
  return (
    <Card
      style={{
        width: "18rem",
      }}
    >
      <Image
        src={rickmorty}
        alt="tumblr1"
        quality={75}
        width={300}
        height={300}
      />
      <CardBody>
        <CardTitle tag="h5">RICK e MORTY</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Projeto Rick e Morty
        </CardSubtitle>
        <CardText>
          Nesse projeto foi usado Next.Js com Sass utilizando API Rick e Morty
          com busca e opção de favoritos.
        </CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
}
