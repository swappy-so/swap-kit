import styled from "@emotion/styled";
import type { PublicKey } from "@solana/web3.js";
import type { FC } from "react";

import { CaretDownIcon } from "../../../../icons/caret-down-icon";
import { TokenAvatar } from "../../../TokenAvatar";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  mint: PublicKey;
  onClick: () => void;
}

export const TokenButton: FC<Props> = ({ mint, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <TokenAvatar mint={mint} />
      <CaretDownIcon />
    </Wrapper>
  );
};
