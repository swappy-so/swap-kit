import { useWalletKit } from "@gokiprotocol/walletkit";
import { useWallet } from "@saberhq/use-solana";
import type { FC } from "react";
import React from "react";

export const ButtonConnect: FC = () => {
  const { connected } = useWallet();
  const { connect } = useWalletKit();

  if (connected) {
    return null;
  }

  return <button onClick={connect}>Connect</button>;
};
