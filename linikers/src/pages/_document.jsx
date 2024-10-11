import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="Pt-Br">
        <Head>
          <link rel="icon" href="../../public/favicon.png" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          />
          <meta
            name="LinikerS webDeveloper"
            content="LinikerS Dev desenvolvedor Fron-End && Back-End"
          />
          <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
        </Head>
        <title>LinikerS web Developer</title>
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
                        zIndex: 1 
                    }}
                ></div>
        </body>
      </Html>
    );
  }
}
