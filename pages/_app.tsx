import "../styles/globals.css";
import type { AppProps } from "next/app";
import { getLayout } from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return <>{getLayout(<Component {...pageProps} />)}</>;
}
