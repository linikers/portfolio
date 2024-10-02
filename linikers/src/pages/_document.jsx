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
          <title>LinikerS web Developer</title>
          <meta
            name="LinikerS webDeveloper"
            content="LinikerS Dev desenvolvedor Fron-End && Back-End"
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
