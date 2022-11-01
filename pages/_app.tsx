import "../styles/globals.css";
import type { AppProps } from "next/app";
import { getLayout } from "../components/Layout";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({
  key: "css",
  prepend: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      {getLayout(<Component {...pageProps} />)}
    </CacheProvider>
  );
}
