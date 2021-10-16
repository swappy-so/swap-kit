import styled from "@emotion/styled";
import type { FC } from "react";

import { useSwap } from "../../..";
import { useSwapFair } from "../../../contexts/swap";
import { useMint } from "../../../contexts/token";
import { useTokenMap } from "../../../contexts/tokenList";
import { InfoButton } from "./InfoButton";

const Wrapper = styled.div`
  display: flex;
`;

export const InfoLabel: FC = () => {
  const { fromMint, toMint } = useSwap();
  const fromMintInfo = useMint(fromMint);
  const fair = useSwapFair();

  const tokenMap = useTokenMap();
  const fromTokenInfo = tokenMap.get(fromMint.toString());
  const toTokenInfo = tokenMap.get(toMint.toString());

  return (
    <Wrapper>
      <div /*color="textSecondary"*/ style={{ fontSize: "14px" }}>
        {fair !== undefined && toTokenInfo && fromTokenInfo
          ? `1 ${toTokenInfo.symbol} = ${fair.toFixed(
              fromMintInfo?.decimals
            )} ${fromTokenInfo.symbol}`
          : `-`}
      </div>
      <InfoButton />
    </Wrapper>
  );
};
