'use client'
import React from "react";
import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { baseSepolia, type AppKitNetwork } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { Toaster } from "@/components/ui/sonner";
import { ConstantsUtil } from "@/utils/ConstantsUtil";
import { ApplicationContextProvider } from "@/context/ApplicationContext";

const queryClient = new QueryClient();

const networks = [baseSepolia] as [AppKitNetwork, ...AppKitNetwork[]];

const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks,
  projectId: ConstantsUtil.ProjectId,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  defaultNetwork: baseSepolia,
  projectId: ConstantsUtil.ProjectId,
  features: {
    analytics: true,
  },
  themeMode: "light",
  termsConditionsUrl: "https://reown.com/terms-of-service",
  privacyPolicyUrl: "https://reown.com/privacy-policy",
});

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ApplicationContextProvider>
          {children}
          <Toaster expand={true} />
        </ApplicationContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
