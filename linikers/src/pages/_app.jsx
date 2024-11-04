import { SessionProvider } from "next-auth/react";
import "@/styles/globals.scss";
import "./types/global.d.ts";

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
      )
}
