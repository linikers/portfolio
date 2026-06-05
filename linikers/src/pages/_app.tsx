import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import { ThemeProvider } from "@/config/ThemeContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
