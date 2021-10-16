import { WalletKitProvider } from "@gokiprotocol/walletkit";
import type {
  UseSolanaError,
  WalletAdapter,
  WalletProviderInfo,
} from "@saberhq/use-solana";
import { ErrorLevel } from "@saberhq/use-solana";
import type { FC } from "react";
import React from "react";

import { Swap } from "./pages/swap";

// For example
const defaultOnConnect = (
  wallet: WalletAdapter<true>,
  provider: WalletProviderInfo
) => {
  console.debug(
    `Connected to ${provider.name} wallet: ${wallet.publicKey.toString()}`
  );
};

// For example
const defaultOnDisconnect = (
  _wallet: WalletAdapter<false>,
  provider: WalletProviderInfo
) => {
  console.debug(`Disconnected from ${provider.name} wallet`);
};

// For example
const defaultOnError = (err: UseSolanaError) => {
  if (err.level === ErrorLevel.WARN) {
    console.warn(err);
  } else {
    console.error(err);
  }
};

const App: FC = () => {
  return (
    <WalletKitProvider
      defaultNetwork="mainnet-beta"
      app={{
        name: "Swap Kit",
      }}
      onConnect={defaultOnConnect}
      onDisconnect={defaultOnDisconnect}
      onError={defaultOnError}
    >
      <Swap />
    </WalletKitProvider>
  );
};

export default App;
