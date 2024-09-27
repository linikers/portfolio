import { Container } from "@mui/material";
import Image from "next/image";

export default function ProfileTop() {
  return (
    <Container className="h-screen">
      <div className="bg-cover bg-center">
        <Image
          src={"../../public/bg.jpg"}
          alt="background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-75"
        />
      </div>
    </Container>
  );
}
