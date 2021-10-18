import styled from "@emotion/styled";
import type { FC } from "react";
import React from "react";

import type { ModalPropsType } from "../../../contexts/modals/types";
import { Modal } from "../../common/Modal";
import { InfoLabel } from "./InfoLabel";
import { Reverse } from "./Reverse";
import { SwapButton } from "./SwapButton";
import { SwapFromForm } from "./SwapFromForm";
import { SwapHeader } from "./SwapHeader";
import { SwapToForm } from "./SwapToForm";

const Content = styled.div`
  padding: 0 28px 28px;
`;

export const SwapModal: FC<ModalPropsType> = ({ close, styleSpring }) => {
  return (
    <Modal close={close} styleSpring={styleSpring}>
      <SwapHeader />
      <Content>
        <SwapFromForm />
        <Reverse />
        <SwapToForm />
        <InfoLabel />
        <SwapButton />
      </Content>
    </Modal>
  );
};
