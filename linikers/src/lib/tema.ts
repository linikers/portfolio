"use client";

/**
 * Tema do portfólio: Papel (claro, padrão) e Grafite (escuro).
 *
 * A escolha vive no `localStorage` e é aplicada em `document.documentElement.dataset.theme`
 * antes da primeira pintura (script inline em `_document.jsx`) para não piscar a tela.
 * Na primeira visita, respeita `prefers-color-scheme`.
 */

export type Modo = "light" | "dark";

export const CHAVE_TEMA = "portfolio-tema";

const ouvintes = new Set<() => void>();
let cache: Modo | null = null;

function lerArmazenado(): Modo | null {
  try {
    const valor = localStorage.getItem(CHAVE_TEMA);
    return valor === "light" || valor === "dark" ? valor : null;
  } catch {
    return null;
  }
}

function prefereEscuro(): boolean {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

/** Modo do primeiro render no cliente (o servidor sempre renderiza "light"). */
export function modoInicial(): Modo {
  return lerArmazenado() ?? (prefereEscuro() ? "dark" : "light");
}

function modoCacheado(): Modo {
  if (cache) return cache;
  cache = modoInicial();
  return cache;
}

function aplicar(modo: Modo) {
  cache = modo;
  document.documentElement.dataset.theme = modo;
  document.documentElement.style.colorScheme = modo;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", modo === "dark" ? "#0a0d12" : "#f6f5f1");
  ouvintes.forEach((fn) => fn());
}

export function assinarModo(fn: () => void): () => void {
  ouvintes.add(fn);
  return () => ouvintes.delete(fn);
}

export function obterModo(): Modo {
  return modoCacheado();
}

export function obterModoServidor(): Modo {
  return "light";
}

export function definirModo(modo: Modo) {
  try {
    localStorage.setItem(CHAVE_TEMA, modo);
  } catch {
    /* modo privado / storage bloqueado: aplica só nesta sessão */
  }
  aplicar(modo);
}

export function alternarModo() {
  definirModo(modoCacheado() === "dark" ? "light" : "dark");
}

/** Sincroniza o atributo do <html> com o estado do React (mount/hydration). */
export function sincronizarAtributo(modo: Modo) {
  document.documentElement.dataset.theme = modo;
  document.documentElement.style.colorScheme = modo;
}
