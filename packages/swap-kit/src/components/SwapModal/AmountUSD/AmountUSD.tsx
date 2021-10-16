import type { PublicKey } from "@solana/web3.js";
import type { FC } from "react";

import { USDC_MINT } from "../../../constants";
import { usePrice } from "../../../contexts/price";

interface Props {
  mint: PublicKey;
  amount: number;
}

function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export const AmountUSD: FC<Props> = ({ mint, amount }) => {
  const price = usePrice(mint);

  if (mint.equals(USDC_MINT)) {
    return <>{formatUSD(amount)}</>;
  }

  if (!price.result) {
    return null;
  }

  return <>{formatUSD(amount * price.result)}</>;
};
