import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "@vercel/examples-ui/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
