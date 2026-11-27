"use client";

// src/components/admin/AdminGuard.tsx
/**
 * Casca do /admin: só renderiza a página depois que o servidor confirma a
 * sessão (`GET /api/admin/session`). Sem sessão → volta para o login.
 * O middleware já redireciona quando não há cookie; este guard cobre cookie
 * inválido/expirado e o primeiro paint client-side.
 */
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [estado, setEstado] = useState<"checando" | "ok" | "negado">("checando");

  useEffect(() => {
    let vivo = true;
    fetch("/api/admin/session", { credentials: "same-origin", cache: "no-store" })
      .then((r) => {
        if (!vivo) return;
        setEstado(r.ok ? "ok" : "negado");
      })
      .catch(() => vivo && setEstado("negado"));
    return () => {
      vivo = false;
    };
  }, []);

  useEffect(() => {
    if (estado === "negado") {
      router.replace(`/admin/login?next=${encodeURIComponent(router.asPath)}`);
    }
  }, [estado, router]);

  if (estado !== "ok") {
    return (
      <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <CircularProgress size={28} aria-label={estado === "negado" ? "Redirecionando" : "Conferindo acesso"} />
      </Box>
    );
  }

  return <>{children}</>;
}
