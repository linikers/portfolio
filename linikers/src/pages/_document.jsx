import Document, { Html, Head, Main, NextScript } from "next/document";

/**
 * ID de métricas da propriedade GA4 conferida em 10/11/2026: conta 114673171,
 * propriedade 319496506, categoria "Animais de estimação".
 *
 * A propriedade estava **sem nenhum dado** porque o build mandava os eventos para
 * outro ID (G-DGMR5208SP). Aqui o ID é fixo de propósito: enquanto ele depender de
 * variável de ambiente, um valor errado no painel da Vercel esvazia a medição e
 * ninguém percebe — foi exatamente o que aconteceu.
 */
const GA4_ID = "G-7Z0959XFV3";

export default class MyDocument extends Document {
  render() {
    // A família /bside tem head próprio (favicon, fontes e marca da Bside);
    // aqui fica só o que é global de verdade (gtag do Google Ads).
    const pagina = this.props?.__NEXT_DATA__?.page || "";
    const ehBside = pagina.startsWith("/bside");

    return (
      <Html lang="pt-BR">
        <Head>
          {!ehBside && <link rel="icon" href="/favicon.png" />}
          <meta name="facebook-domain-verification" content="7ka2lllvr6hc9j4lmmajjhyj10ogmu" />
          {!ehBside && (
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            />
          )}
          {!ehBside && (
            <meta
              name="LinikerS webDeveloper"
              content="LinikerS Dev desenvolvedor Fron-End && Back-End"
            />
          )}
          {!ehBside && (
            <script async src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
          )}
          {/* Google tag (gtag.js) — Google Ads AW-18460150717 + GA4.
              Fica no _document para sair no HTML de TODAS as páginas, uma vez só.
              Não duplicar em _app nem em páginas individuais.
              O ID do GA4 é fixo em GA4_ID (acima): mede visita por origem e clique no
              WhatsApp por página. Antes vinha de NEXT_PUBLIC_GA_ID e o build estava
              configurado com outra propriedade, que nunca recebeu dado nenhum. */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-18460150717"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18460150717');
gtag('config', '${GA4_ID}');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {!ehBside && (
            <div id="particles-js" 
                    style={{ 
                        position: "absolute", 
                        width: "100%", 
                        height: "100%", 
                        top: 0, 
                        left: 0, 
                        background: 'https://images.unsplash.com/photo-1518818419601-72c8673f5852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
                        backgroundSize: 'cover',
                        zIndex: 1,
                        pointerEvents: "none" 
                    }}
                ></div>
          )}
        </body>
      </Html>
    );
  }
}
