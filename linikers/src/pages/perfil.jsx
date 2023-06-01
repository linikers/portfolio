import { useState } from "react";
import MaquinaDeEscrever from "../components/maquinaEscrever";

export default function Perfil() {
  const [typingComplete, setTypingComplete] = useState(false);
  const handleComplete = () => {
    setTypingComplete(true);
  };
  return (
    <div>
      <MaquinaDeEscrever
        lines={["testando a maquina de escrever"]}
        delay={120}
        onComplete={handleComplete}
      />
      <br />

      <MaquinaDeEscrever
        lines={["testando a maquina de escrever"]}
        delay={120}
        onComplete={handleComplete}
      />
    </div>
  );
}
