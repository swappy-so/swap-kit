import type { UseSolanaArgs } from "@saberhq/use-solana";
import { Swap as SwapClient } from "@swappy-so/swap";
import React, { useContext } from "react";

import { DexProvider } from "..";
import { ModalsProvider } from "../modals";
import type { UseSwapArgs } from "../swap";
import { SwapProvider } from "../swap";
import type { UseTokenArgs } from "../token";
import { TokenProvider } from "../token";
import type { UseTokenListArgs } from "../tokenList";
import { TokenListProvider } from "../tokenList";
import { Providers } from "./providers";

export const SwapKitContext = React.createContext<UseSwapKit | null>(null);

export interface UseSwapKit {
  openSwapModal: () => void;
}

export interface UseSwapKitArgs {}

interface Props
  extends UseSwapKitArgs,
    UseTokenListArgs,
    UseTokenArgs,
    UseSwapArgs,
    UseSolanaArgs {
  children: React.ReactNode;
}

export const SwapKitProvider: React.FC<Props> = ({
  provider,
  tokenList,
  fromMint,
  toMint,
  fromAmount,
  toAmount,
  referral,
  children,
}: Props) => {
  const swapClient = new SwapClient(provider, tokenList);

  return (
    <TokenListProvider initialState={{ tokenList }}>
      <TokenProvider initialState={{ provider }}>
        <DexProvider initialState={{ swapClient }}>
          <SwapProvider
            initialState={{
              fromMint,
              toMint,
              fromAmount,
              toAmount,
              referral,
            }}
          >
            <ModalsProvider>
              <Providers>{children}</Providers>
            </ModalsProvider>
          </SwapProvider>
        </DexProvider>
      </TokenProvider>
    </TokenListProvider>
  );
};

/**
 * Returns a function which shows the swap modal.
 */
export const useSwapKit = (): UseSwapKit => {
  const context = useContext(SwapKitContext);
  if (!context) {
    throw new Error("Not in SwapKitProvider context");
  }
  return context;
};
