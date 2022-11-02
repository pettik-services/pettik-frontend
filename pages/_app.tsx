import "../styles/globals.css";
import type { AppProps } from "next/app";
import { getLayout } from "../components/Layout";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  Hydrate,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { showErrorToast } from "../utils/toaster";

const cache = createCache({
  key: "css",
  prepend: true,
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
          },
        },
        queryCache: new QueryCache({
          onError: (error: any | AxiosError) =>
            showErrorToast(error?.message),
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={cache}>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer />
        </CacheProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
