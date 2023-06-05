import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  ListGroup,
} from "reactstrap";
import Image from "next/image";
import rickmorty from "../../public/rmtumbl.png";
import CardPortfolio from "@/components/card";

export default function Projetos() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <ListGroup className="flex flex-wrap bg-custom-black-0">
      <Card
        style={{
          width: "18rem",
        }}
      >
        <CardPortfolio
          imgUrl={`${basePath}/rmtumbl.png`}
          altText="RICK  and MORTY"
          title="RB Nail Design"
          subTitle=" Rafa Bach Nails"
          description="Nesse Projeto foi usado Next.Js, tailwind, Sass, typescript e bootstrap com reactstrap, utilizando API Rick e Morty
        com  opção de busca e opção de favoritos."
          url="https://rick-morty-ecru.vercel.app/"
        />
      </Card>

      <Card
        style={{
          width: "18rem",
        }}
      >
        <CardPortfolio
          imgUrl={`${basePath}/rbtumbl.png`}
          altText="rb nails"
          title="RB Nail Design"
          subTitle=" Rafa Bach Nails"
          description="Nesse Projeto foi usado Next.Js, tailwind, Sass, typescript e bootstrap com reactstrap"
          url="https://rafabach-nails.vercel.app/"
        />
      </Card>

      <Card
        style={{
          width: "18rem",
        }}
      >
        <CardPortfolio
          imgUrl={`${basePath}/khtumbl.png`}
          altText="rb nails"
          title="RB Nail Design"
          subTitle=" Rafa Bach Nails"
          description="Nesse Projeto foi usado Next.Js, tailwind, Sass, typescript e bootstrap com reactstrap"
          url="https://n-delta-lake.vercel.app/"
        />
      </Card>

      <Card
        style={{
          width: "18rem",
        }}
      >
        <CardPortfolio
          imgUrl={`${basePath}/vartumbl.png`}
          altText="rb nails"
          title="RB Nail Design"
          subTitle=" Rafa Bach Nails"
          description="Nesse Projeto foi usado Next.Js, tailwind, Sass, typescript e bootstrap com reactstrap"
          url="https://varify.vercel.app/"
        />
      </Card>
    </ListGroup>
  );
}
