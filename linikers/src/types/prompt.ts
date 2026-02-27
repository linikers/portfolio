// src/types/prompt.ts
// Interface compartilhada para prompts — usada em pages, components e API routes.

export interface IPrompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: PromptCategory;
  platform: string;
  price: number;
  published: boolean;
  createdAt: string; // ISO string (serializado do Firestore Timestamp)
  uid: string;
  imageUrl?: string;
}

export type PromptCategory =
  | "carros"
  | "marketing"
  | "copywriting"
  | "seo"
  | "social"
  | "outro";

export const PROMPT_CATEGORIES: { value: PromptCategory; label: string }[] = [
  { value: "carros", label: "Carros" },
  { value: "marketing", label: "Marketing" },
  { value: "copywriting", label: "Copywriting" },
  { value: "seo", label: "SEO" },
  { value: "social", label: "Social Media" },
  { value: "outro", label: "Outro" },
];

export const PROMPT_PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "chatgpt", label: "ChatGPT" },
  { value: "x", label: "X (Twitter)" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "geral", label: "Geral" },
];

export const PROMPT_TONES = [
  { value: "profissional", label: "Profissional" },
  { value: "descontraido", label: "Descontraído" },
  { value: "tecnico", label: "Técnico" },
  { value: "persuasivo", label: "Persuasivo" },
  { value: "educacional", label: "Educacional" },
];

export const PROMPT_IDIOMAS = [
  { value: "pt-BR", label: "Português (BR)" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

/** Payload para criação/publicação de prompt */
export interface PublicarPromptPayload {
  title: string;
  description: string;
  price: number;
}

/** Form values para o FormGerador (Agora suportando modo manual e upload) */
export interface GeradorFormValues {
  // Campos Legados (IA)
  categoria?: PromptCategory | "";
  plataforma?: string;
  objetivo?: string;
  tom?: string;
  idioma?: string;

  // Novos Campos (Manual/Upload)
  prompt: string;
  imagem: File | null;
}
