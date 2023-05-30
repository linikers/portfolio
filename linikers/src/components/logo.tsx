import MaquinaDeEscrever from "./maquinaEscrever";

export default function Logo() {
  return (
    <figure className="font-source-code-pro font-bold text-lg  p-2 m-1 text-center shadow-xl">
      <span className="text-custom-base-1 shadow-xl">
        <MaquinaDeEscrever
          text="Olá, clique no avatar para saber mais sobre"
          delay={180}
        />
      </span>
      <p className="text-custom-base-2 text-xl mt-2 mb-2 shadow-xl">
        <MaquinaDeEscrever text="LinikerS" delay={380} />
      </p>
      <span className="text-custom-red-1">
        <MaquinaDeEscrever
          text="Front-End Developer | E-commerce | SEO"
          delay={480}
        />
      </span>
    </figure>
  );
}
