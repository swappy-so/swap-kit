import styled from "@emotion/styled";
import type { TokenInfo } from "@solana/spl-token-registry";
import { PublicKey } from "@solana/web3.js";
import type { FC } from "react";
import React, { useMemo } from "react";

import { useOwnedTokenAccount } from "../../../../contexts/token";
import { TokenAvatar } from "../../../TokenAvatar";
import { AmountUSD } from "../../AmountUSD/AmountUSD";

const Wrapper = styled.div`
  padding: 10px 0;

  cursor: pointer;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 44px;
`;

const Info = styled.div`
  flex: 1;
  margin-left: 15px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  color: #000;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
`;

const TokenSymbol = styled.div`
  max-width: 300px;

  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2px;

  color: #a3a5ba;
  font-weight: 600;
  font-size: 12px;
  line-height: 140%;
`;

type Props = {
  tokenInfo: TokenInfo;
  onClick: (token: PublicKey) => void;
};

export const TokenRow: FC<Props> = ({ tokenInfo, onClick }) => {
  const mint = useMemo(
    () => new PublicKey(tokenInfo.address),
    [tokenInfo.address]
  );
  const tokenAccount = useOwnedTokenAccount(mint);

  const balance =
    tokenAccount &&
    tokenInfo &&
    tokenAccount.account.amount.toNumber() / 10 ** tokenInfo.decimals;

  const handleClick = () => {
    onClick(mint);
  };

  return (
    <Wrapper onClick={handleClick}>
      <ItemWrapper>
        <TokenAvatar mint={mint} size={44} />
        <Info>
          <Top>
            <TokenSymbol title={tokenInfo?.address}>
              {tokenInfo?.symbol}
            </TokenSymbol>
            {tokenAccount && balance ? (
              <AmountUSD mint={mint} amount={balance} />
            ) : undefined}
          </Top>
          <Bottom>
            <div>{tokenInfo?.name}</div>
            {tokenAccount ? (
              <div>
                {balance} {tokenInfo?.symbol}
              </div>
            ) : undefined}
          </Bottom>
        </Info>
      </ItemWrapper>
    </Wrapper>
  );
};
