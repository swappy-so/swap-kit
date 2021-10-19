import { useSwapKit } from "@swappy-so/swap-kit";
import type { FC } from "react";
import React from "react";

export const ButtonSwap: FC = () => {
  const { openSwapModal } = useSwapKit();

  return <button onClick={openSwapModal}>Open</button>;
};
