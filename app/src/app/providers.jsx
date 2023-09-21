"use client";

import { Layout } from "@/layout";
import { theme } from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import wagmi_config from "../../config/wagmi_config";

import "@fontsource/rajdhani/500.css";
import "@fontsource/rajdhani/600.css";
import "@fontsource/rajdhani/700.css";

export function Providers({ children }) {
  return (
    <WagmiConfig config={wagmi_config}>
      <ConnectKitProvider>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <Layout children={children} />
          </ChakraProvider>
        </CacheProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
