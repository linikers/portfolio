import { useState } from "react";
import MaquinaDeEscrever from "../components/maquinaEscrever";
import ProfileTop from "../components/topProfile";

export default function Perfil() {
  const [typingComplete, setTypingComplete] = useState(false);
  const handleComplete = () => {
    setTypingComplete(true);
  };
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center relative z-10 text-custom-red-1 text-2xl bg-base-0 mt-8">
        <MaquinaDeEscrever
          lines={["Seja bem vindo!"]}
          delay={120}
          onComplete={handleComplete}
        />
        <div>
          <p className="bg-custom-black-0 text-custom-base-0 flex m-12 p-8 rounded-lg">
            Olá, meu nome é [Seu Nome] e esta é a minha página de perfil. Aqui
            você poderá conhecer um pouco mais sobre mim e minha paixão pela
            programação. Sou um desenvolvedor entusiasmado com [especificar suas
            principais áreas de expertise ou interesse, como desenvolvimento
            web, aplicativos móveis, etc.]. Desde que entrei nesse mundo
            fascinante da codificação, tenho trabalhado em diversos projetos
            desafiadores, buscando sempre aprender e aprimorar minhas
            habilidades. Estou constantemente explorando novas tecnologias e
            tendências, mantendo-me atualizado para entregar soluções inovadoras
            e eficientes. Aqui você encontrará informações sobre minha formação
            acadêmica, experiências profissionais e projetos pessoais. Sinta-se
            à vontade para explorar e descobrir mais sobre meu trabalho e
            conquistas. Estou animado para compartilhar meu conhecimento e
            colaborar em projetos empolgantes. Se você estiver interessado em
            trabalhar juntos ou apenas quiser trocar algumas ideias, não hesite
            em entrar em contato comigo. Vamos construir algo incrível juntos!
            Este sou eu, apaixonado pela criação e pelo mundo da programação.
          </p>
        </div>
      </div>

      <ProfileTop className="z-0" />
    </div>
  );
}
