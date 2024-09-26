// // import { useState } from "react";
// // import MaquinaDeEscrever from "../components/maquinaEscrever";
// // import ProfileTop from "../components/topProfile";
// // import MenuUser from "@/components/menu";
// // import Link from "next/link";
// // import { FaBriefcase, FaPersonBooth } from "react-icons/fa";

// export default function Perfil2() {
//   const [typingComplete, setTypingComplete] = useState(false);
//   const handleComplete = () => {
//     setTypingComplete(true);
//   };

//   return (
//     <div className="bg-custom-black-0">
//       <div className="flex justify-center">
//         <MenuUser />
//       </div>
//       <div className="flex flex-col items-center justify-center text-custom-base-0 text-2xl mt-8">
//         <MaquinaDeEscrever
//           lines={["Seja bem vindo!"]}
//           delay={120}
//           onComplete={handleComplete}
//         />
//         <div className="bg-custom-base-1 bg-opacity-75 flex m-12 rounded-lg relative overflow-hidden">
//           <div className="absolute top-0 left-0 right-0 bottom-0 bg-custom-base-1 bg-blur rounded-lg"></div>
//           <div className="absolute top-0 left-0 right-0 bottom-0 bg-custom-blue-1 bg-blur rounded-lg"></div>
//           <p className="text-custom-black-0 p-8 relative z-10">
//             Olá, meu nome é Liniker e esta é a minha página de perfil. Aqui você
//             poderá conhecer um pouco mais sobre mim e minha paixão pela
//             programação. Sou um desenvolvedor entusiasmado com o desenvolvimento
//             web e projetos, especializado em JavaScript, React, Next.js, MUI
//             Tailwind e Bootstrap, entre outras bibliotecas. Tenho trabalhado em
//             diversos projetos desafiadores, buscando constantemente aprender e
//             aprimorar minhas habilidades.
//             <br />
//             Estou sempre explorando novas tecnologias e tendências, mantendo-me
//             atualizado para entregar soluções inovadoras e eficientes. Aqui você
//             encontrará informações sobre meus projetos pessoais. Sinta-se à
//             vontade para explorar e descobrir mais sobre meu trabalho e
//             conquistas. Estou entusiasmado em compartilhar meu conhecimento e
//             colaborar em projetos empolgantes. Se você estiver interessado em
//             trabalharmos juntos ou tiver alguma ideia para compartilhar, não
//             hesite em entrar em contato comigo. Vamos construir algo incrível
//             juntos! Sou apaixonado pela criação e pelo mundo da programação.
//             <br />
//             Tenho experiência em infraestrutura, implantação de ERP e SEO.
//             Atualmente, trabalho como desenvolvedor independente e 
//             Sistemas escolares. Além disso, tenho
//             experiência em trabalho em equipe e colaboração, clique no icone
//             abaixo para conferir alguns trabalhos.
//             <br />
//             <Link href={"projetos"}>
//               <FaBriefcase className=" m-6 text-4xl animate-bounce text-custom-base-1" />
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
