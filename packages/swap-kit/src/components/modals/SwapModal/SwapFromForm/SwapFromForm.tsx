import type { FC } from "react";

import { useSwap } from "../../../..";
import { useMinOrder } from "../../../../contexts/dex";
import { SwapTokenForm } from "../SwapTokenForm";

export const SwapFromForm: FC = () => {
  const { fromMint, setFromMint, fromAmount, setFromAmount } = useSwap();
  const { minOrderSize } = useMinOrder();

  return (
    <SwapTokenForm
      from
      mint={fromMint}
      setMint={setFromMint}
      amount={fromAmount}
      setAmount={setFromAmount}
      minOrderSize={minOrderSize}
    />
  );
};
