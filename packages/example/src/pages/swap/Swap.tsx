import type { Provider } from "@project-serum/anchor";
import { useSolana } from "@saberhq/use-solana";
import type { TokenListContainer } from "@solana/spl-token-registry";
import { TokenListProvider } from "@solana/spl-token-registry";
import { SwapKitProvider } from "@swappy-so/swap-kit";
import type { FC } from "react";
import React, { useEffect, useState } from "react";

import { ButtonSwap } from "../../components/pages/swap/ButtonSwap";

export const Swap: FC = () => {
  const { providerMut } = useSolana();
  const [tokenList, setTokenList] = useState<TokenListContainer | null>(null);

  useEffect(() => {
    void new TokenListProvider().resolve().then(setTokenList);
  }, [setTokenList]);

  if (!providerMut || !tokenList) {
    return null;
  }

  return (
    <SwapKitProvider
      provider={providerMut as unknown as Provider}
      tokenList={tokenList}
    >
      <ButtonSwap />
    </SwapKitProvider>
  );
};
