import styled from "@emotion/styled";
import type { FC } from "react";

import { useSwap } from "../../../..";
import { useSwapFair } from "../../../../contexts/swap";
import { useMint } from "../../../../contexts/token";
import { useTokenMap } from "../../../../contexts/tokenList";
import { InfoButton } from "./InfoButton";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 40px 0;
`;

const Text = styled.span`
  margin-right: 5px;

  font-size: 14px;
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
      <Text>
        {fair !== undefined && toTokenInfo && fromTokenInfo
          ? `1 ${toTokenInfo.symbol} = ${fair.toFixed(
              fromMintInfo?.decimals
            )} ${fromTokenInfo.symbol}`
          : `-`}
      </Text>
      <InfoButton />
    </Wrapper>
  );
};
