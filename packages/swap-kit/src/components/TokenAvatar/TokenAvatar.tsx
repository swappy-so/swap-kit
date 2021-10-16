import styled from "@emotion/styled";
import type { PublicKey } from "@solana/web3.js";
import classNames from "classnames";
import type { FC, HTMLAttributes } from "react";

import { useTokenMap } from "../../contexts/tokenList";

const Wrapper = styled.div`
  position: relative;

  border-radius: 12px;
`;

const Avatar = styled.img<{ size?: string | number }>`
  width: ${({ size }) => (size ? `${size}px` : "auto")};
  height: ${({ size }) => (size ? `${size}px` : "auto")};

  border-radius: 12px;
`;

interface Props {
  mint: PublicKey;
  size?: string | number;
}

export const TokenAvatar: FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  mint,
  size = 44,
  className,
}) => {
  const tokenMap = useTokenMap();
  const tokenInfo = tokenMap.get(mint.toString());

  return (
    <Wrapper className={classNames(className)}>
      {tokenInfo?.logoURI ? (
        <Avatar src={tokenInfo?.logoURI} size={size} />
      ) : (
        <div style={{ width: `${size}px`, height: `${size}px` }} />
      )}
    </Wrapper>
  );
};
