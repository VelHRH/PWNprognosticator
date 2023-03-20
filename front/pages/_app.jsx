import { useRef } from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
 const queryClient = useRef(new QueryClient());
 return (
  <QueryClientProvider client={queryClient.current}>
   <Hydrate state={pageProps.dehydratedState}>
    <Component {...pageProps} />
   </Hydrate>
   <ReactQueryDevtools />
  </QueryClientProvider>
 );
}
