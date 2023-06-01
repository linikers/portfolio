import Image from "next/image";
import bg from "../../public/bg.jpg";
import { Container } from "reactstrap";

export default function ProfileTop() {
  return (
    <Container className="h-screen">
      <div className="absolute inset-0 bg-black opacity-90">
        <Image
          src={bg}
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
