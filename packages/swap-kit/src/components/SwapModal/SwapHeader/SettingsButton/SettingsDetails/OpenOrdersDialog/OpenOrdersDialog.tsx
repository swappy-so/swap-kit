import styled from "@emotion/styled";
import type { FC } from "react";

import { Modal } from "../../../../..";
import { OpenOrdersAccounts } from "./OpenOrdersAccounts";

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface Props {
  open: boolean;
  onClose: () => void;
}

export const OpenOrdersDialog: FC<Props> = ({ open, onClose }) => {
  return (
    <Modal isOpen={open} onDismiss={onClose}>
      <Header>
        <button
          onClick={onClose}
          style={{
            padding: 10,
          }}
        >
          Close
        </button>
      </Header>
      <div style={{ paddingTop: 0 }}>
        <OpenOrdersAccounts />
      </div>
    </Modal>
  );
};
