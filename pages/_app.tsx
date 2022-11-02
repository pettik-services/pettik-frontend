import "../styles/globals.css";
import type { AppProps } from "next/app";
import { getLayout } from "../components/Layout";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cache = createCache({
  key: "css",
  prepend: true,
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error: any | AxiosError) =>
            toast.error(error?.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }),
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cache}>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer />
      </CacheProvider>
    </QueryClientProvider>
  );
}
