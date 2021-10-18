import styled from "@emotion/styled";
import type { FC } from "react";

import type { ModalPropsType } from "../../../contexts/modals/types";
import { Modal } from "../../common/Modal";
import { OpenOrdersAccounts } from "./OpenOrdersAccounts";

const Wrapper = styled.div`
  overflow-x: scroll;

  &::-webkit-scrollbar {
    position: absolute;
    width: 6px;
    height: 6px;

    bottom: 0;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`;

export const OpenOrdersModal: FC<ModalPropsType> = ({ close, styleSpring }) => {
  return (
    <Modal close={close} styleSpring={styleSpring}>
      <Wrapper style={{ paddingTop: 0 }}>
        <OpenOrdersAccounts />
      </Wrapper>
    </Modal>
  );
};
