import type { AppProps } from "next/app";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: side-effect import of CSS without type declarations
import "../app/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
