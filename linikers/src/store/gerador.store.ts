// src/store/gerador.store.ts
// Zustand store para o módulo Gerador de Prompts.
// Transporta dados entre as páginas index → resultado → historico.

import { create } from "zustand";
import type { GeradorFormValues } from "@/types/prompt";

interface GeradorState {
  /** Prompt gerado pela IA */
  generatedPrompt: string;
  /** Provider que gerou o prompt (groq ou gemini) */
  provider: "groq" | "gemini" | null;
  /** Valores do formulário que originaram a geração */
  formValues: GeradorFormValues | null;
  /** Loading state global */
  isLoading: boolean;

  setGeneratedPrompt: (prompt: string, provider: "groq" | "gemini") => void;
  setFormValues: (values: GeradorFormValues) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const initialState = {
  generatedPrompt: "",
  provider: null as "groq" | "gemini" | null,
  formValues: null as GeradorFormValues | null,
  isLoading: false,
};

export const useGeradorStore = create<GeradorState>((set) => ({
  ...initialState,

  setGeneratedPrompt: (prompt, provider) =>
    set({ generatedPrompt: prompt, provider }),

  setFormValues: (values) => set({ formValues: values }),

  setLoading: (loading) => set({ isLoading: loading }),

  reset: () => set(initialState),
}));
