import styled from "@emotion/styled";
import type { PublicKey } from "@solana/web3.js";
import classNames from "classnames";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { useMint, useOwnedTokenAccount } from "../../../contexts/token";
import { CaretDownIcon } from "../../../icons/caret-down-icon";
import { TokenAvatar } from "../../TokenAvatar";
import { AmountUSD } from "../AmountUSD/AmountUSD";
import { TokenDialog } from "../TokenDialog";
import { TokenName } from "./TokenName";

const Wrapper = styled.div``;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FromTitle = styled.div`
  color: #000;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const MainWrapper = styled.div`
  display: flex;

  margin-top: 8px;
`;

const TokenAvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;

  background: #f6f6f8;
  border-radius: 12px;

  &.isOpen {
    background: #5887ff;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;

  margin-left: 15px;
`;

const SpecifyTokenWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
`;

const ChevronWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-left: 10px;
`;

const TokenWrapper = styled.div`
  display: flex;
  min-width: 0;

  cursor: pointer;
`;

const AmountInput = styled.input`
  max-width: 170px;

  color: #000;
  font-weight: 600;
  font-size: 28px;
  line-height: 120%;
  text-align: right;

  background: transparent;
  border: 0;

  outline: none;

  appearance: none;

  &::placeholder {
    color: #a3a5ba;
  }

  &.error {
    color: #f43d3d;
  }
`;

const BalanceWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  color: #a3a5ba;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`;

const BalanceText = styled.div`
  display: flex;
  white-space: nowrap;
`;

const AllBalance = styled.div`
  color: #5887ff;

  cursor: pointer;

  &.disabled {
    cursor: auto;

    pointer-events: none;
  }

  &.error {
    color: #f43d3d;
  }
`;

interface Props {
  from: boolean;
  mint: PublicKey;
  setMint: (mint: PublicKey) => void;
  amount: number;
  setAmount: (amount: number) => void;
  minOrderSize?: number;
  disabled?: boolean;
}

export const SwapTokenForm: FC<Props> = ({
  from,
  mint,
  setMint,
  amount,
  setAmount,
  minOrderSize,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localAmount, setLocalAmount] = useState(String(amount));
  const tokenAccount = useOwnedTokenAccount(mint);
  const mintAccount = useMint(mint);

  const balance =
    tokenAccount &&
    mintAccount &&
    tokenAccount.account.amount.toNumber() / 10 ** mintAccount.decimals;

  const hasBalance = (balance || 0) >= Number(amount);

  useEffect(() => {
    // amount not null and not undefined
    if (amount != null && amount !== Number(localAmount)) {
      setLocalAmount(amount.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const handleAmountFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    let nextAmount = e.target.value;

    if (Number(nextAmount) === 0) {
      nextAmount = "";
      setLocalAmount(nextAmount);
      setAmount(0);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let nextAmount = e.target.value
      .replace(",", ".")
      .replace(/[^\d.,]/g, "")
      .replace(/^0(\d+)/g, "$1")
      .replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2");

    if (nextAmount === ".") {
      nextAmount = "0.";
    }

    setLocalAmount(nextAmount);

    // amount not null and not undefined
    if (Number(nextAmount) != null) {
      setAmount(Number(nextAmount));
    }
  };

  // const formattedAmount =
  //   mintAccount && amount
  //     ? amount.toLocaleString("fullwide", {
  //         maximumFractionDigits: mintAccount.decimals,
  //         useGrouping: false,
  //       })
  //     : amount;

  return (
    <Wrapper>
      <TopWrapper>
        <FromTitle>{from ? "From" : "To"}</FromTitle>
      </TopWrapper>
      <MainWrapper>
        <TokenAvatarWrapper className={classNames({ isOpen: isOpen && !mint })}>
          {mint ? <TokenAvatar mint={mint} /> : undefined}
        </TokenAvatarWrapper>
        <InfoWrapper>
          <SpecifyTokenWrapper>
            <TokenWrapper onClick={() => setIsOpen(true)}>
              <TokenName mint={mint} />
              <ChevronWrapper>
                <CaretDownIcon />
              </ChevronWrapper>
            </TokenWrapper>
            <AmountInput
              placeholder={Number(0).toFixed(mintAccount?.decimals || 0)}
              value={localAmount}
              onFocus={handleAmountFocus}
              onChange={handleAmountChange}
              disabled={disabled}
              className={classNames({
                error:
                  Number(localAmount) && minOrderSize
                    ? Number(localAmount) < minOrderSize
                    : false,
              })}
            />
          </SpecifyTokenWrapper>
          <BalanceWrapper>
            <BalanceText>
              {tokenAccount && mintAccount ? (
                from && !disabled ? (
                  <AllBalance
                    onClick={() => setAmount(balance || 0)}
                    className={classNames({ disabled, error: !hasBalance })}
                  >
                    Available: {balance?.toFixed(mintAccount.decimals)}
                  </AllBalance>
                ) : (
                  <>Balance: {balance?.toFixed(mintAccount.decimals)}</>
                )
              ) : undefined}
              {!mint ? "Select currency" : undefined}
            </BalanceText>
            {mint ? (
              <BalanceText>
                ≈ <AmountUSD mint={mint} amount={amount} />
              </BalanceText>
            ) : undefined}
          </BalanceWrapper>
        </InfoWrapper>
      </MainWrapper>

      <TokenDialog
        setMint={setMint}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </Wrapper>
  );
};
