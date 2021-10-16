import type { PublicKey } from "@solana/web3.js";
import type { FC } from "react";

import { useBbo, useMarketName } from "../../../../../../contexts/dex";
import { Link } from "../../../../../Link";

interface Props {
  market: PublicKey;
}

export const MarketRoute: FC<Props> = ({ market }) => {
  const marketName = useMarketName(market);
  const bbo = useBbo(market);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "5px",
      }}
    >
      <Link
        href={`https://dex.projectserum.com/#/market/${market.toString()}`}
        target="_blank"
        rel="noopener"
      >
        {marketName}
      </Link>
      <code style={{ marginLeft: "10px" }}>
        {bbo && bbo.mid ? bbo.mid.toFixed(6) : "-"}
      </code>
    </div>
  );
};
