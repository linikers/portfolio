import Document, { Html, Head, Main, NextScript } from "next/document";

/**
 * Medição GA4 do site (propriedade "linikers.cloud", criada em 27/10/2026).
 *
 * O ID de métricas é público por natureza (vai no HTML de qualquer site que use GA).
 * Ele fica como padrão aqui — e não só em variável de ambiente — porque a Vercel não
 * tem `NEXT_PUBLIC_GA_ID` configurada, e sem um valor no código a tag simplesmente não
 * sai no build. A variável continua valendo como override para trocar de propriedade
 * sem mexer no código.
 */
const GA4_ID = process.env.NEXT_PUBLIC_GA_ID || "G-DGMR5208SP";

/**
 * Aplica o tema antes da primeira pintura para não piscar claro→escuro.
 * Papel (claro) é o padrão; Grafite é a variante escura.
 */
const SCRIPT_TEMA = `(function(){try{var m=localStorage.getItem('portfolio-tema');if(m!=='light'&&m!=='dark'){m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=m;document.documentElement.style.colorScheme=m;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default class MyDocument extends Document {
  render() {
    // A família /bside tem head próprio (favicon, fontes e marca da Bside);
    // aqui fica só o que é global de verdade (gtag do Google Ads).
    const pagina = this.props?.__NEXT_DATA__?.page || "";
    const ehBside = pagina.startsWith("/bside");

    return (
      <Html lang="pt-BR" data-theme={ehBside ? "dark" : undefined}>
        <Head>
          {!ehBside && <link rel="icon" href="/favicon.png" />}
          <meta name="facebook-domain-verification" content="7ka2lllvr6hc9j4lmmajjhyj10ogmu" />
          {!ehBside && (
            <>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap"
              />
              <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA }} />
            </>
          )}
          {!ehBside && (
            <meta
              name="LinikerS webDeveloper"
              content="LinikerS Dev desenvolvedor Fron-End && Back-End"
            />
          )}
          {/* Google tag (gtag.js) — Google Ads AW-18460150717 + GA4 (opcional).
              Fica no _document para sair no HTML de TODAS as páginas, uma vez só.
              Não duplicar em _app nem em páginas individuais.
              O GA4 só entra quando NEXT_PUBLIC_GA_ID está definido no build: é ele que
              mede visita por origem e clique no WhatsApp por página (antes só existia a
              conversão do Ads, que não responde de onde veio a visita). */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-18460150717"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18460150717');${
                GA4_ID ? `\ngtag('config', '${GA4_ID}');` : ""
              }`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
