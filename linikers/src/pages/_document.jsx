import Document, { Html, Head, Main, NextScript } from "next/document";


export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta name="facebook-domain-verification" content="7ka2lllvr6hc9j4lmmajjhyj10ogmu" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          />
          <meta
            name="LinikerS webDeveloper"
            content="LinikerS Dev desenvolvedor Fron-End && Back-End"
          />
          <script async src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
          {/* Google tag (gtag.js) — Google Ads AW-18460150717.
              Fica no _document para sair no HTML de TODAS as páginas, uma vez só.
              Não duplicar em _app nem em páginas individuais. */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-18460150717"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18460150717');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
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
        </body>
      </Html>
    );
  }
}
