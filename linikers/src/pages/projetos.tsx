import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Container,
  ListGroup,
} from "reactstrap";
import Image from "next/image";
import rickmorty from "../../public/rmtumbl.png";
import CardPortfolio from "@/components/card";
import MenuUser from "@/components/menu";

export default function Projetos() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <Container className=" bg-custom-black-0 flex flex-col items-center">
      <MenuUser />

      <ListGroup className="flex flex-wrap justify-center">
        <Card
          style={{
            width: "18rem",
          }}
        >
          <CardPortfolio
            imgUrl={`${basePath}/rmtumbl.png`}
            altText="RICK  and MORTY"
            title="Rick and Morty"
            subTitle="Utilizando API"
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
            title="Kenzie Hub"
            subTitle="Login e senha "
            description="Nesse Projeto foi usado React, typescript com login e senha e proteção de rotas criadas manualmente"
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
            altText="varify"
            title="Varify"
            subTitle="Utilização lib de Cores"
            description="Nesse Projeto foi usado React, typescript com login e senha sem verificação e tratamento"
            url="https://varify.vercel.app/"
          />
        </Card>

        <Card
          style={{
            width: "18rem",
          }}
        >
          <CardPortfolio
            imgUrl={`${basePath}/pktumbl.png`}
            altText="pokemon"
            title="Pokemon"
            subTitle="API Pokemon"
            description="Nesse Projeto foi usado React, typescript com login e senha sem verificação e tratamento"
            url="https://linikers.github.io/pokemonAPI-v2/"
          />
        </Card>

        <Card
          style={{
            width: "18rem",
          }}
        >
          <CardPortfolio
            imgUrl={`${basePath}/dntumbl.png`}
            altText="dianoite"
            title="Dia e Noite"
            subTitle="JS com data"
            description="Projeto utilizando animações feitas com CSS e javascript que de acordo com a hora ele mostra se é dia ou noite."
            url="https://linikers.github.io/DiaNoite/"
          />
        </Card>

        <Card
          style={{
            width: "18rem",
          }}
        >
          <CardPortfolio
            imgUrl={`${basePath}/twtumbl.png`}
            altText="Twniker"
            title="Twiniker"
            subTitle="layout basico"
            description="Esse foi um projeto básico com CSS, HTML5 e javascript puro."
            url="https://linikers.github.io/Twiniker/"
          />
        </Card>
      </ListGroup>
    </Container>
  );
}
