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
import Link from "next/link";

interface iCardPortfilioProps {
  imgUrl: string;
  altText: string;
  title: string;
  subTitle: string;
  description: string;
  url: string;
}
export default function CardPortfolio({
  imgUrl,
  altText,
  title,
  subTitle,
  description,
  url,
}: iCardPortfilioProps) {
  return (
    <Card className="m-4 border border-custom-base-1 rounded-xl">
      <Image
        src={imgUrl}
        alt={altText}
        quality={75}
        width={280}
        height={280}
        className="rounded-xl"
      />
      <CardBody className="text-center">
        <CardTitle tag="h5" className="text-custom-base-2 text-xl mt-4">
          {title}
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted text-custom-base-1 text-lg"
          tag="h6"
        >
          {subTitle}
        </CardSubtitle>
        <CardText className="text-custom-base-0">{description}</CardText>
        <Link href={url} target="_blank">
          <Button className="bg-custom-base-1 btn btn-link rounded-xl px-4 py-2 m-2">
            Acessar
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
}
