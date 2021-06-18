import { AppProps } from "next/app";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "../contexts/AuthContext";

import { theme } from "../styles/theme";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
