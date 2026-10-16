import { useEffect, useState } from "react";
import s from "@/styles/bside.module.scss";
import { wa, WA_MSG } from "@/lib/bside";

/**
 * Peças visuais compartilhadas da família /bside (LP + demos).
 * Tudo escopado pelo CSS Module (src/styles/bside.module.scss), sem vazar
 * para o resto do portfólio.
 */

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */

/**
 * Logo oficial da Bside (redesenho vetorial de `bside-logo.svg`).
 * Asset final em public/bside/bside-logo.svg: monograma "BS" inclinado
 * (B em contorno ciano, S solido branco) com a dispersao de pixels, o
 * "DIGITAL" de tracking largo e a tagline entre filetes. Fundo transparente
 * (renderiza sobre o navy da LP). Tamanhos da direcao de arte: 132 no header,
 * 168 no footer. Proporcao do arquivo: 925 x 550.
 */
export function BsLogo({ size = 132 }: { size?: number }) {
  return (
    <img
      className={s.logo}
      src="/bside/bside-logo.svg"
      alt="Bside Digital Studio"
      width={size}
      height={Math.round((size * 550) / 925)}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Motivo de pixels (DIRECAO-DE-ARTE-LP.md, seção 1.5)                 */
/* ------------------------------------------------------------------ */

const PIXELS: Array<{
  x: number;
  y: number;
  w: number;
  o: number;
  c: "cyan" | "white";
}> = [
  { x: 0, y: 6, w: 10, o: 1, c: "cyan" },
  { x: 14, y: 18, w: 8, o: 0.9, c: "white" },
  { x: 26, y: 32, w: 6, o: 0.8, c: "cyan" },
  { x: 36, y: 12, w: 5, o: 0.65, c: "cyan" },
  { x: 46, y: 44, w: 4, o: 0.5, c: "white" },
  { x: 54, y: 26, w: 3, o: 0.4, c: "cyan" },
  { x: 62, y: 54, w: 3, o: 0.3, c: "cyan" },
  { x: 70, y: 38, w: 2, o: 0.22, c: "white" },
  { x: 78, y: 60, w: 2, o: 0.15, c: "cyan" },
];

/** Apenas a grade de pixels (sem o filete), para usos como a saída do CTA. */
export function PixelTrail({
  variant = "cyan",
}: {
  variant?: "cyan" | "white";
}) {
  return (
    <svg
      className={s.dividerPixels}
      width="180"
      height="72"
      viewBox="0 0 180 72"
      fill="none"
      aria-hidden="true"
    >
      {PIXELS.map((p) => {
        const cor = variant === "white" ? (p.c === "white" ? "cyan" : "white") : p.c;
        return (
          <rect
            key={`${p.x}-${p.y}`}
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.w}
            fill={cor === "cyan" ? "#00B8E6" : "#FFFFFF"}
            opacity={p.o}
          />
        );
      })}
    </svg>
  );
}

/**
 * Divisor canônico da rodada 1 (seção 1.5): filete de 1px que se desfaz em
 * pixels na ponta direita. A variante "white" é a saída do bloco de CTA
 * ciano (pixels brancos vazando para o navy).
 */
export function PixelDivider({
  variant = "cyan",
}: {
  variant?: "cyan" | "white";
}) {
  return (
    <div
      className={`${s.divider} ${variant === "white" ? s.dividerWhite : ""}`}
      aria-hidden="true"
    >
      <span className={s.dividerRule} />
      <PixelTrail variant={variant} />
    </div>
  );
}

/** 3 pixels ciano soltos do canto superior direito do hero (nunca centralizados). */
export function PixelCorner() {
  return (
    <svg
      className={s.pixelCorner}
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <rect x="52" y="6" width="8" height="8" fill="#00B8E6" opacity=".9" />
      <rect x="40" y="22" width="5" height="5" fill="#00B8E6" opacity=".6" />
      <rect x="62" y="30" width="3" height="3" fill="#00B8E6" opacity=".35" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ícones das células (traço 1.5, geometria própria, sem banco)        */
/* ------------------------------------------------------------------ */

export type IconeNome =
  | "pagina"
  | "site"
  | "cardapio"
  | "agenda"
  | "automacao"
  | "sistema"
  | "hospedagem"
  | "anuncios"
  | "painel"
  | "notas"
  | "mais";

export function CellIcon({ nome }: { nome: IconeNome }) {
  return (
    <svg
      className={s.cellIcon}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {nome === "pagina" && (
        <>
          <rect x="3" y="4.5" width="18" height="15" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <rect x="5.5" y="11.5" width="6" height="5" />
          <line x1="14" y1="12" x2="18.5" y2="12" />
          <line x1="14" y1="15.5" x2="18.5" y2="15.5" />
        </>
      )}
      {nome === "site" && (
        <>
          <rect x="4" y="3.5" width="12" height="12" />
          <rect x="8" y="8.5" width="12" height="12" />
        </>
      )}
      {nome === "cardapio" && (
        <>
          <rect x="5" y="3" width="14" height="18" />
          <line x1="8" y1="7.5" x2="16" y2="7.5" />
          <line x1="8" y1="11" x2="16" y2="11" />
          <line x1="8" y1="14.5" x2="13" y2="14.5" />
          <line x1="8" y1="18" x2="11" y2="18" />
        </>
      )}
      {nome === "agenda" && (
        <>
          <rect x="3.5" y="5" width="17" height="15.5" />
          <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" />
          <line x1="8" y1="3" x2="8" y2="6.5" />
          <line x1="16" y1="3" x2="16" y2="6.5" />
          <path d="m8.5 14.5 2.5 2.5 4.5-5" />
        </>
      )}
      {nome === "automacao" && (
        <>
          <path d="M4 5.5 h16 v10.5 h-9.5 l-3.5 3.5 v-3.5 H4 z" />
          <path d="M12.9 8 10.6 11.8 h2.3 L11.7 15.6 14.8 11.5 h-2.3 z" />
        </>
      )}
      {nome === "sistema" && (
        <>
          <rect x="3.5" y="3.5" width="7.5" height="7.5" />
          <rect x="13" y="3.5" width="7.5" height="4.5" />
          <rect x="13" y="10" width="7.5" height="10.5" />
          <rect x="3.5" y="13" width="7.5" height="7.5" />
        </>
      )}
      {nome === "hospedagem" && (
        <>
          <rect x="4" y="4" width="16" height="6.5" />
          <rect x="4" y="13.5" width="16" height="6.5" />
          <circle cx="7.5" cy="7.25" r=".9" fill="currentColor" stroke="none" />
          <circle cx="7.5" cy="16.75" r=".9" fill="currentColor" stroke="none" />
          <line x1="11" y1="7.25" x2="17" y2="7.25" />
          <line x1="11" y1="16.75" x2="17" y2="16.75" />
        </>
      )}
      {nome === "anuncios" && (
        <>
          <path d="M4.5 10 v4 h3.5 l6.5 3.5 v-11 L8 10 z" />
          <path d="M17 9.2 a4.2 4.2 0 0 1 0 5.6" />
          <line x1="5.5" y1="14.5" x2="6.8" y2="19" />
        </>
      )}
      {nome === "painel" && (
        <>
          <rect x="3.5" y="4" width="17" height="16" />
          <path d="M7 16 l3.5-4 2.5 2.5 4-5.5" />
          <circle cx="17" cy="9" r=".9" fill="currentColor" stroke="none" />
        </>
      )}
      {nome === "notas" && (
        <>
          <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="9" y1="12" x2="15" y2="12" />
        </>
      )}
      {nome === "mais" && (
        <>
          <line x1="12" y1="5.5" x2="12" y2="18.5" />
          <line x1="5.5" y1="12" x2="18.5" y2="12" />
        </>
      )}
    </svg>
  );
}

/** Check ciano do traço 1.5, usado nas listas de preço e nos compromissos. */
export function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      className={s.check}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="m2.5 8.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

/** Ícone de WhatsApp dos botões (caminho oficial, sem texto dentro do desenho). */
export function WhatsAppIcon() {
  return (
    <svg
      className={s.waIcon}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.95 9.95 0 0 0 4.73 1.2h.01a9.9 9.9 0 0 0 9.93-9.9A9.86 9.86 0 0 0 12.04 2Zm5.83 14.12c-.25.7-1.45 1.33-2 1.37-.51.04-1.16.06-1.87-.12a17 17 0 0 1-1.7-.63c-2.98-1.29-4.93-4.3-5.08-4.5-.15-.2-1.22-1.62-1.22-3.1 0-1.47.77-2.19 1.04-2.49.27-.3.6-.37.79-.37h.57c.18 0 .43-.07.67.51.25.6.85 2.07.92 2.22.08.15.13.32.03.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.3.15.47.13.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.35.07.12.07.72-.18 1.42Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Camadas globais e barra mobile                                      */
/* ------------------------------------------------------------------ */

/** Grain global (≤6%, 4% no mobile): por cima do fundo, discreto, nunca > 8%. */
export function GrainOverlay() {
  return <div className={s.grain} aria-hidden="true" />;
}

/**
 * Barra fixa de WhatsApp do mobile (<900px): 64px, ciano, texto navy.
 * Some quando o bloco do CTA final (#orcamento) entra na tela.
 */
export function MobileWhatsAppBar() {
  const [oculta, setOculta] = useState(false);

  useEffect(() => {
    const alvo = document.getElementById("orcamento");
    if (!alvo || typeof IntersectionObserver === "undefined") return;
    const observador = new IntersectionObserver(
      ([entrada]) => setOculta(entrada.isIntersecting),
      { threshold: 0.12 }
    );
    observador.observe(alvo);
    return () => observador.disconnect();
  }, []);

  return (
    <a
      className={`${s.mobileBar} ${oculta ? s.mobileBarHidden : ""}`}
      href={wa(WA_MSG.geral)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon />
      Falar no WhatsApp agora
    </a>
  );
}
