import type { OpenOrders } from "@project-serum/serum";

import { useDex } from "../../dex";

export function useOpenOrders(): Map<string, Array<OpenOrders>> {
  const ctx = useDex();
  return ctx.openOrders;
}
