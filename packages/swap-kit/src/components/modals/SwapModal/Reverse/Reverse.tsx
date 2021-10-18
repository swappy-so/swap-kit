import styled from "@emotion/styled";
import type { FC } from "react";
import React from "react";

import { useSwap } from "../../../..";
import { ReverseIcon } from "../../../../icons/reverse-icon";

const ReverseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px;

  &::before {
    width: 100%;
    height: 1px;

    background: #efefef;

    content: "";
  }
`;

const ReverseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 50px;
  height: 50px;

  color: #282828;

  background: #fff;
  border: 1px solid #efefef;
  border-radius: 50%;
  cursor: pointer;
`;

export const Reverse: FC = () => {
  const { swapToFromMints } = useSwap();

  const handleReverseClick = () => {
    swapToFromMints();
  };

  return (
    <ReverseWrapper>
      <ReverseButton onClick={handleReverseClick}>
        <ReverseIcon />
      </ReverseButton>
    </ReverseWrapper>
  );
};
