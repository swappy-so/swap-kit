import type { UseSolanaArgs } from "@saberhq/use-solana";
import { Swap as SwapClient } from "@swappy-so/swap";
import React, { useContext, useMemo, useState } from "react";

import {
  DexProvider,
  SwapModal,
  SwapProvider,
  TokenListProvider,
  TokenProvider,
} from "../..";
import type { UseSwapArgs } from "../swap";
import type { UseTokenArgs } from "../token";
import type { UseTokenListArgs } from "../tokenList";

export interface UseSwapKit {
  openSwapModal: () => void;
}

const SwapKitContext = React.createContext<UseSwapKit | null>(null);

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
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const context = useMemo(() => {
    return { openSwapModal: () => setIsOpen(true) };
  }, []);

  const swapClient = new SwapClient(provider, tokenList);

  return (
    <SwapKitContext.Provider value={context}>
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
              <SwapModal isOpen={isOpen} onDismiss={() => setIsOpen(false)} />
              {children}
            </SwapProvider>
          </DexProvider>
        </TokenProvider>
      </TokenListProvider>
    </SwapKitContext.Provider>
  );
};

/**
 * Returns a function which shows the swap modal.
 */
export const useSwapKit = (): UseSwapKit => {
  const context = useContext(SwapKitContext);
  if (!context) {
    throw new Error("Not in WalletConnector context");
  }
  return context;
};
