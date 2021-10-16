import styled from "@emotion/styled";
import type { PublicKey } from "@solana/web3.js";
import type { FC, HTMLAttributes } from "react";

import { useTokenMap } from "../../../../contexts/tokenList";

const Wrapper = styled.span`
  max-width: 200px;
  overflow: hidden;

  color: #000;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface Props {
  mint: PublicKey;
}

export const TokenName: FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  mint,
  className,
}) => {
  const tokenMap = useTokenMap();
  const tokenInfo = tokenMap.get(mint.toString());

  return <Wrapper className={className}>{tokenInfo?.symbol}</Wrapper>;
};
