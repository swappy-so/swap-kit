import styled from "@emotion/styled";
import type { PublicKey } from "@solana/web3.js";
import type { FC } from "react";

import { useSwap } from "../../../../../..";
import { useRoute } from "../../../../../../contexts/dex";
import { useTokenMap } from "../../../../../../contexts/tokenList";
import { Link } from "../../../../../common/Link";
import { MarketRoute } from "./MarketRoute";

const Wrapper = styled.div`
  padding: 15px;
  width: 250px;

  font-size: 14px;

  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 3%), 0 1px 4px rgb(0 0 0 / 4%),
    0 20px 40px rgb(0 0 0 / 14%);
`;

export const InfoPopover: FC = () => {
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
    <Wrapper>
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
    </Wrapper>
  );
};
