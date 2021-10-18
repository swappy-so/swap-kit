import type { FC } from "react";

import { useSwap } from "../../../..";
import { SwapTokenForm } from "../SwapTokenForm";

export const SwapToForm: FC = () => {
  const { toMint, setToMint, toAmount, setToAmount } = useSwap();
  return (
    <SwapTokenForm
      from={false}
      mint={toMint}
      setMint={setToMint}
      amount={toAmount}
      setAmount={setToAmount}
    />
  );
};
