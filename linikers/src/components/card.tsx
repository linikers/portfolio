import { Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
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
    <Card className="card-image-wrapper m-4 border border-custom-base-1 rounded-xl">
      <Image
        src={imgUrl}
        alt={altText}
        quality={75}
        width={280}
        height={280}
        className="rounded-xl"
      />
      <CardContent className="text-center d-flex flex-column">
        <Typography variant="h5" className="text-custom-base-2 text-xl mt-4">
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          className="mb-2 text-muted text-custom-base-1 text-lg"
        >
          {subTitle}
        </Typography>
        <Typography className="text-custom-base-0">
          {description}
        </Typography>
        <div className="">
          <Link href={url} target="_blank" className="">
            <Button className="bg-custom-base-1 btn btn-link rounded-xl px-4 py-2 m-2 mb-1">
              Acessar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
