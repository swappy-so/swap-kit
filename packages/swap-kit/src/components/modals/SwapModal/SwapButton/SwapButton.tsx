import type { FC } from "react";
import { useMemo, useState } from "react";

import { useSwap } from "../../../..";
import { useMinOrder } from "../../../../contexts/dex";
import { useCanSwap, useSendSwap } from "../../../../contexts/swap";
import { Button } from "../../../common/Button";

export const SwapButton: FC = () => {
  const [isExecuting, setIsExecuting] = useState(false);

  const { fromMint, toMint } = useSwap();
  const { swap, route } = useSendSwap();
  const { minOrderSize, isMinOrderSize } = useMinOrder();
  const canSwap = useCanSwap();

  const onSwapClick = async () => {
    setIsExecuting(true);

    try {
      await swap();
    } catch (error) {
      console.error("Something wrong with swap:", (error as Error).toString());
    } finally {
      setIsExecuting(false);
    }
  };

  const renderActionText = useMemo(() => {
    if (isExecuting) {
      return "Processing...";
    }

    if (!isMinOrderSize) {
      return `Amount is under min order size ${minOrderSize}`;
    }

    if (route) {
      return "Swap now";
    }

    if (!fromMint || !toMint) {
      return "Choose tokens for swap";
    }

    return "This pair is unavailable";
  }, [fromMint, isExecuting, isMinOrderSize, minOrderSize, route, toMint]);

  const isDisabled = !canSwap || !isMinOrderSize;

  return (
    <Button disabled={isDisabled} onClick={onSwapClick}>
      {renderActionText}
    </Button>
  );
};
