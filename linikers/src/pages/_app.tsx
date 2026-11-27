import type { AppProps } from "next/app";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/router";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminGuard from "@/components/admin/AdminGuard";
import Head from "next/head";
import "@/styles/globals.scss";
import { instalarConversaoWhatsApp } from "@/lib/conversaoWhatsapp";
import { instalarCliqueWhatsAppBside } from "@/lib/analytics";
import {
  assinarModo,
  obterModo,
  obterModoServidor,
  sincronizarAtributo,
  type Modo,
} from "@/lib/tema";

/**
 * Paleta única do portfólio.
 * Papel (claro) é o padrão; Grafite é a variante escura da MESMA pele.
 * Os mesmos valores estão em `styles/globals.scss` como CSS vars (--bg, --text…),
 * usadas pelas páginas que estilizam com estilo inline.
 */
const paletas: Record<Modo, {
  bg: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accent2: string;
  contrast: string;
  radius: number;
}> = {
  light: {
    bg: "#f6f5f1",
    surface: "#ffffff",
    border: "#e1ded6",
    text: "#14181f",
    muted: "#666c75",
    accent: "#16406b",
    accent2: "#2f6b4f",
    contrast: "#ffffff",
    radius: 6,
  },
  dark: {
    bg: "#0a0d12",
    surface: "#0f141b",
    border: "#1e2836",
    text: "#e8edf5",
    muted: "#93a1b5",
    accent: "#4f8cff",
    accent2: "#7fb3a2",
    contrast: "#08101f",
    radius: 10,
  },
};

const FONT_SANS = 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const FONT_SERIF = 'Newsreader, Georgia, "Times New Roman", serif';

function buildTheme(modo: Modo) {
  const p = paletas[modo];
  const titulo = modo === "light" ? FONT_SERIF : FONT_SANS;
  return createTheme({
    palette: {
      mode: modo,
      primary: { main: p.accent, contrastText: p.contrast },
      secondary: { main: p.accent2 },
      background: { default: p.bg, paper: p.surface },
      text: { primary: p.text, secondary: p.muted },
      divider: p.border,
    },
    typography: {
      fontFamily: FONT_SANS,
      h1: { fontFamily: titulo, fontWeight: modo === "light" ? 500 : 600, letterSpacing: "-0.02em" },
      h2: { fontFamily: titulo, fontWeight: modo === "light" ? 500 : 600, letterSpacing: "-0.02em" },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: { borderRadius: p.radius },
    components: {
      MuiCard: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: p.radius,
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          },
        },
      },
      MuiChip: { styleOverrides: { root: { borderRadius: 4 } } },
    },
  });
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const modo = useSyncExternalStore(assinarModo, obterModo, obterModoServidor);

  // A família de rotas /bside (Bside Digital Studio) tem identidade própria:
  // nada de Navbar, Footer, tema nem meta/favicon do portfólio vazando.
  const ehBside = router.pathname.startsWith("/bside");

  // Toda rota /admin (menos o login) só renderiza depois que o servidor confirma
  // a sessão de admin. O middleware já barra sem cookie; o guard cobre cookie
  // inválido/expirado e evita piscar conteúdo antes da checagem.
  const ehAdminProtegido =
    router.pathname === "/admin" ||
    (router.pathname.startsWith("/admin/") && router.pathname !== "/admin/login");

  useEffect(() => {
    if (ehBside) {
      document.documentElement.dataset.theme = "dark";
      return;
    }
    sincronizarAtributo(modo);
  }, [modo, ehBside]);

  // Mede o clique no WhatsApp em todo o site: botões, ícones do rodapé e as landing
  // pages das sitelinks. Um listener global cobre também pontos criados depois.
  useEffect(() => instalarConversaoWhatsApp(), []);

  // A família /bside fica fora do listener acima (número e marca próprios). Aqui o
  // clique é só MEDIDO no GA4, sem alterar para onde o navegador vai.
  useEffect(() => instalarCliqueWhatsAppBside(), []);

  const theme = buildTheme(ehBside ? "dark" : modo);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Na rota /bside o tema e o favicon são os da Bside (ver Seo.tsx) */}
        {!ehBside && <meta name="theme-color" content={modo === "dark" ? "#0a0d12" : "#f6f5f1"} />}
        {!ehBside && <link rel="icon" href="/favicon.png" />}
        <meta name="google-site-verification" content="f3b6fe1ad59f5971" />
        <meta name="facebook-domain-verification" content="7ka2lllvr6hc9j4lmmajjhyj10ogmu" />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            ...(ehBside ? { bgcolor: "#0A1628" } : {}),
          }}
        >
          {!ehBside && <Navbar modo={ehBside ? "dark" : modo} />}
          <Box component="main" sx={{ flex: 1 }}>
            {ehAdminProtegido ? (
              <AdminGuard>
                <Component {...pageProps} />
              </AdminGuard>
            ) : (
              <Component {...pageProps} />
            )}
          </Box>
          {!ehBside && <Footer />}
        </Box>
      </MuiThemeProvider>
    </>
  );
}
