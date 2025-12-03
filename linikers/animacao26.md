# Ambiente Pixel Art + Monitor Animado + Boot Linux

## 📁 Estrutura de pastas

public/
└── assets/
└── bg-room.png # imagem pixel art da sala

components/
├── animatedPage/
│ ├── bootSequence.ts # lista de mensagens do boot
│ ├── bootTerminal.tsx # animação do texto linha por linha
│ └── terminal.css # estilo da interface terminal
├── backgroundDesk/
│ ├── backgroundRoom.tsx # gerencia a imagem de fundo
│ └── monitorFrame.tsx # (opcional)
└── monitor/
├── Monitor.tsx # renderiza o terminal/monitor
└── monitor.css # estilo visual do monitor

app/
├── index.tsx 
└── perfil/page.tsx


---

## 🖼️ Imagem de fundo
O arquivo:
public/assets/bg-room.png

representa:
- a sala pixel art
- ambiente de madrugada
- estilo vintage/ambâr
- fonte da verdade da ambientação visual

Esse fundo NÃO é animado.

Animações acontecem em elementos React sobrepostos à imagem.

---

## 🧠 Boot sequence

Arquivo:  
`components/animatedPage/bootSequence.ts`

Contém:



BIOS initialized
CPU: Pentium 4 — OK
…
LOGIN: user


---

## ⏳ Animação do boot

Arquivo:  
`components/animatedPage/bootTerminal.tsx`

Exibe as mensagens com delay linha por linha.

---

## 🖥️ Monitor animado

Arquivo:  
`components/monitor/Monitor.tsx`

- envolve o terminal
- controla quando termina o boot
- envia para `/perfil`

---

## 🔄 Fluxo

1. Carrega o BG pixel art da sala
2. Renderiza monitor digital por cima
3. Boot sequence roda
4. Ao terminar → redireciona para `/perfil`

---

# (2) Agora resolvendo seu problema do index.tsx

Você escreveu:

```ts
// import MonitorBoot from "@/components/MonitorBoot";
import MonitorBoot from "./components/monitorBoot";

export default function Home() {
  return <MonitorBoot />;
}

❗ Aqui está o erro:

O componente não se chama MonitorBoot
O nome correto (do que criamos) é:

✔ Monitor
ou
✔ BootTerminal
ou
✔ Monitor.tsx

Mas NÃO existe monitorBoot.tsx

Como deveria ser o index.tsx correto

Se o componente principal chama:

components/monitor/Monitor.tsx

então:

import Monitor from "@/components/monitor/Monitor";

export default function Home() {
  return <Monitor />;
}

Outra coisa importante:

Você também precisa renderizar o fundo:

import BackgroundRoom from "@/components/backgroundDesk/backgroundRoom";
import Monitor from "@/components/monitor/Monitor";

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <BackgroundRoom />
      <Monitor />
    </div>
  );
}

