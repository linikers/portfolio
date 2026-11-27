"use client";

// src/pages/admin/login.tsx
// Entrada do painel: Firebase Auth → POST /api/admin/session (ID token → cookie).
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/firebaseClient";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [entrando, setEntrando] = useState(false);

  const destino = typeof router.query.next === "string" ? router.query.next : "/admin";

  // Já logado e com sessão no servidor? Vai direto para o painel.
  useEffect(() => {
    if (!auth) return;
    const cancelar = onAuthStateChanged(auth, async (usuario) => {
      if (!usuario) return;
      const resposta = await fetch("/api/admin/session", {
        credentials: "same-origin",
        cache: "no-store",
      }).catch(() => null);
      if (resposta?.ok) router.replace(destino);
    });
    return () => cancelar();
  }, [destino, router]);

  async function trocarPorSessao(usuario: any) {
    const idToken = await usuario.getIdToken(true);
    const resposta = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ idToken }),
    });
    const corpo = await resposta.json().catch(() => ({}));
    if (!resposta.ok) {
      await signOut(auth).catch(() => undefined);
      throw new Error(
        resposta.status === 403
          ? corpo?.error || "Este e-mail não tem acesso ao painel."
          : corpo?.error || "Não foi possível abrir a sessão.",
      );
    }
    router.replace(destino);
  }

  async function entrarComSenha(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setEntrando(true);
    try {
      const credencial = await signInWithEmailAndPassword(auth, email.trim(), senha);
      await trocarPorSessao(credencial.user);
    } catch (erro: any) {
      const codigo = String(erro?.code || "");
      if (codigo.includes("invalid-credential") || codigo.includes("wrong-password") || codigo.includes("user-not-found")) {
        setErro("E-mail ou senha incorretos.");
      } else {
        setErro(erro?.message || "Falha no login.");
      }
    } finally {
      setEntrando(false);
    }
  }

  async function entrarComGoogle() {
    setErro("");
    setEntrando(true);
    try {
      const credencial = await signInWithPopup(auth, new GoogleAuthProvider());
      await trocarPorSessao(credencial.user);
    } catch (erro: any) {
      setErro(erro?.message || "Falha no login com Google.");
    } finally {
      setEntrando(false);
    }
  }

  return (
    <>
      <Head>
        <title>Entrar no painel | Linikers</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center", py: 6 }}>
        <Container maxWidth="xs">
          <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, border: 1, borderColor: "divider" }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
              Painel
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 3, fontSize: 14 }}>
              Entre com a conta de administrador para gerenciar o site.
            </Typography>

            <Box component="form" onSubmit={entrarComSenha} noValidate>
              <Stack spacing={2}>
                <TextField
                  label="E-mail"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Senha"
                  type="password"
                  autoComplete="current-password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  fullWidth
                />
                {erro ? <Alert severity="error">{erro}</Alert> : null}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={entrando}
                  startIcon={<LoginIcon />}
                >
                  {entrando ? "Entrando..." : "Entrar"}
                </Button>
              </Stack>
            </Box>

            <Button
              onClick={entrarComGoogle}
              disabled={entrando}
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ mt: 2 }}
            >
              Entrar com Google
            </Button>

            <Typography sx={{ mt: 3, fontSize: 12, color: "text.secondary" }}>
              Acesso restrito. Contas fora da lista de administradores são recusadas pelo servidor.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
