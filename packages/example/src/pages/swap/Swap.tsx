import styled from "@emotion/styled";
import type { FC } from "react";
import React from "react";

import { ButtonConnect } from "../../components/pages/swap/ButtonConnect";
import { SwapKit } from "../../components/pages/swap/SwapKit";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100vw;
  height: 100vh;
`;

export const Swap: FC = () => {
  return (
    <Wrapper>
      <ButtonConnect />
      <SwapKit />
    </Wrapper>
  );
};
