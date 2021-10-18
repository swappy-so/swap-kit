import type { OpenOrders } from "@project-serum/serum";
import { PublicKey } from "@solana/web3.js";
import type { FC } from "react";
import { useMemo } from "react";

import { useOpenOrders } from "../../../../contexts/dex";
import { OpenOrdersRow } from "./OpenOrdersRow";

export const OpenOrdersAccounts: FC = () => {
  const openOrders = useOpenOrders();

  const openOrdersEntries: Array<[PublicKey, OpenOrders[]]> = useMemo(() => {
    return Array.from(openOrders.entries()).map(([market, oo]) => [
      new PublicKey(market),
      oo,
    ]);
  }, [openOrders]);

  return (
    <table aria-label="simple table">
      <thead>
        <tr>
          <td>Market</td>
          <td align="center">Open Orders Account</td>
          <td align="center">Base Used</td>
          <td align="center">Base Free</td>
          <td align="center">Quote Used</td>
          <td align="center">Quote Free</td>
          <td align="center">Settle</td>
          <td align="center">Close</td>
        </tr>
      </thead>
      <tbody>
        {openOrdersEntries.map(([market, oos]) => {
          return (
            <OpenOrdersRow
              key={market.toString()}
              market={market}
              openOrders={oos}
            />
          );
        })}
      </tbody>
    </table>
  );
};
