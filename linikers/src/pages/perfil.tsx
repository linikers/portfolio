import { useState } from "react";
import MaquinaDeEscrever from "../components/maquinaEscrever";
import ProfileTop from "../components/topProfile";
import MenuUser from "@/components/menu";

export default function Perfil() {
  const [typingComplete, setTypingComplete] = useState(false);
  const handleComplete = () => {
    setTypingComplete(true);
  };
  return (
    <div className="z-0">
      <div className=" absolute z-50">
        <MenuUser />
      </div>
      <div className="flex flex-col items-center justify-center relative z-10 text-custom-red-1 text-2xl bg-base-0 mt-8">
        <MaquinaDeEscrever
          lines={["Seja bem vindo!"]}
          delay={120}
          onComplete={handleComplete}
        />
        <div className="bg-custom-black-0 flex m-12 rounded-lg">
          <p className=" text-custom-base-0 p-8 ">
            Olá, meu nome é Liniker e esta é a minha página de perfil. Aqui você
            poderá conhecer um pouco mais sobre mim e minha paixão pela
            programação. Sou um desenvolvedor entusiasmado com desenvolvimento e
            projetos web, atualmente trabalho com JavaScript, React, Next.Js,
            Tailwind, Bootstrap entre outras libs. Desde que entrei nesse mundo
            fascinante da codificação, tenho trabalhado em diversos projetos
            desafiadores, buscando sempre aprender e aprimorar minhas
            habilidades.
            <br />
            Estou constantemente explorando novas tecnologias e tendências,
            mantendo-me atualizado para entregar soluções inovadoras e
            eficientes. Aqui você encontrará informações sobre minha formação
            acadêmica, experiências profissionais e projetos pessoais. Sinta-se
            à vontade para explorar e descobrir mais sobre meu trabalho e
            conquistas. Estou animado para compartilhar meu conhecimento e
            colaborar em projetos empolgantes. Se você estiver interessado em
            trabalhar juntos ou apenas quiser trocar algumas ideias, não hesite
            em entrar em contato comigo. Vamos construir algo incrível juntos!
            Este sou eu, apaixonado pela criação e pelo mundo da programação.
            <br />
            Tenho experiencia com infra estrutura, implantação de ERP, SEO e no
            momento trabalhando como Dev independente.
          </p>
        </div>
      </div>

      <div className="z-0">
        <ProfileTop />
      </div>
    </div>
  );
}
