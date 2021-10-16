import type { PublicKey } from "@solana/web3.js";
import type { FC } from "react";

import { useSwap } from "../../../../..";
import { useRoute } from "../../../../../contexts/dex";
import { useTokenMap } from "../../../../../contexts/tokenList";
import { Link } from "../../../../Link";
import { MarketRoute } from "./MarketRoute";

export const InfoDetails: FC = () => {
  const { fromMint, toMint } = useSwap();
  const route = useRoute(fromMint, toMint);
  const tokenMap = useTokenMap();
  const fromMintTicker = tokenMap.get(fromMint.toString())?.symbol;
  const toMintTicker = tokenMap.get(toMint.toString())?.symbol;
  const addresses = [
    { ticker: fromMintTicker, mint: fromMint },
    { ticker: toMintTicker, mint: toMint },
  ];

  return (
    <div style={{ padding: "15px", width: "250px" }}>
      <div>
        <div
          // color="textSecondary"
          style={{ fontWeight: "bold", marginBottom: "5px" }}
        >
          Trade Route
        </div>
        {route ? (
          route.map((market: PublicKey) => {
            return <MarketRoute key={market.toString()} market={market} />;
          })
        ) : (
          <div /*color="textSecondary"*/>Route not found</div>
        )}
      </div>
      <div style={{ marginTop: "15px" }}>
        <div
          // color="textSecondary"
          style={{ fontWeight: "bold", marginBottom: "5px" }}
        >
          Tokens
        </div>
        {addresses.map((address) => {
          return (
            <div
              key={address.mint.toString()}
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link
                href={`https://explorer.solana.com/address/${address.mint.toString()}`}
                target="_blank"
                rel="noopener"
              >
                {address.ticker}
              </Link>
              <code style={{ width: "128px", overflow: "hidden" }}>
                {address.mint.toString()}
              </code>
            </div>
          );
        })}
      </div>
    </div>
  );
};
