import styled from "@emotion/styled";
import type { FC } from "react";
import React from "react";

import type { UseSwapKitArgs } from "../../contexts/swapKit";
import type { ModalProps } from "../Modal";
import { Modal } from "../Modal";
import { InfoLabel } from "./InfoLabel";
import { Reverse } from "./Reverse";
import { SwapButton } from "./SwapButton";
import { SwapFromForm } from "./SwapFromForm";
import { SwapHeader } from "./SwapHeader";
import { SwapToForm } from "./SwapToForm";

const Content = styled.div`
  padding: 0 28px 28px;
`;

type Props = Omit<ModalProps, "children"> & UseSwapKitArgs;

export const SwapModal: FC<Props> = ({ ...modalProps }) => {
  const onDismiss = () => {
    modalProps.onDismiss();
  };

  return (
    <Modal {...modalProps} onDismiss={onDismiss}>
      <SwapHeader />
      <Content>
        <SwapFromForm />
        <Reverse />
        <SwapToForm />
        <div style={{ height: "40px" }} />
        <InfoLabel />
        <div style={{ height: "40px" }} />
        <SwapButton />
      </Content>
    </Modal>
  );
};
