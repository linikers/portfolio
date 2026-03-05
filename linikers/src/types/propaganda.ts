// src/types/propaganda.ts

export type PostStatus = "draft" | "scheduled" | "published" | "paused";
export type SocialPlatform = "instagram" | "linkedin" | "x" | "whatsapp";

export interface IPost {
  id: string;
  uid: string;
  platforms: SocialPlatform[];
  content: string;
  scheduledAt: string; // ISO string
  status: PostStatus;
  isPaid: boolean;
  budget?: number;
  targetAudience?: string;
  createdAt: string; // ISO string
}

export const PLATFORM_OPTIONS: { value: SocialPlatform; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "x", label: "X (Twitter)" },
  { value: "whatsapp", label: "WhatsApp" },
];

export const STATUS_OPTIONS: {
  value: PostStatus;
  label: string;
  color:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "secondary";
}[] = [
  { value: "draft", label: "Rascunho", color: "default" },
  { value: "scheduled", label: "Agendado", color: "primary" },
  { value: "published", label: "Publicado", color: "success" },
  { value: "paused", label: "Pausado", color: "warning" },
];

export interface PropagandaFormValues {
  platforms: SocialPlatform[];
  content: string;
  scheduledAt: string;
  isPaid: boolean;
  budget?: number;
  targetAudience?: string;
}
