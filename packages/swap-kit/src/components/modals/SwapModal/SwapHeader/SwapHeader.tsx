import styled from "@emotion/styled";
import type { FC } from "react";

import { SettingsButton } from "./SettingsButton";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 28px;
  margin-bottom: 20px;
`;

export const SwapHeader: FC = () => {
  return (
    <Wrapper>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        SWAP
      </div>
      <SettingsButton />
    </Wrapper>
  );
};
