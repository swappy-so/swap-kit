import { css, Global } from "@emotion/react";
import type { ElementType, FC } from "react";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { useTransition } from "react-spring";

import { OpenOrdersModal } from "../../components/modals/OpenOrdersModal";
import { SwapModal } from "../../components/modals/SwapModal";
import { TokensModal } from "../../components/modals/TokensModal";
import type { ModalPropsType, ModalType } from "./types";

type ModalState = { modalName: ModalType; modalId: number; props: any };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const modalsMap = new Map<ModalType, ElementType<ModalPropsType>>([
  ["swap", SwapModal],
  ["tokens", TokensModal],
  ["openOrders", OpenOrdersModal],
]);

let modalId = 0;

interface ModalsContextState {
  openModal: (modalName: ModalType, props?: any) => void;
  closeModal: (modalId: number) => void;
  closeTopModal: () => void;
}

const ModalsContext = React.createContext<ModalsContextState>({
  openModal: () => {},
  closeModal: () => {},
  closeTopModal: () => {},
});

/* @reach/dialog/styles.css */
const GlobalCss = css`
  :root {
    --reach-dialog: 1;
  }
  [data-reach-dialog-overlay] {
    background: hsla(0, 0%, 0%, 0.33);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
  }
  [data-reach-dialog-content] {
    width: 50vw;
    margin: 10vh auto;
    background: white;
    padding: 2rem;
    outline: none;
  }
`;

type Props = {
  children: React.ReactNode;
};

export const ModalsProvider: FC<Props> = ({ children }) => {
  const [modals, setModals] = useState<ModalState[]>([]);

  const openModal = useCallback((modalName: ModalType, props?: any) => {
    setModals((state) => [
      ...state,
      {
        modalName,
        modalId: ++modalId,
        props,
      },
    ]);
  }, []);

  const closeModal = useCallback((modalId: number, result?: any): any => {
    setModals((state) => state.filter((modal) => modal.modalId !== modalId));
    return result;
  }, []);

  const closeTopModal = useCallback(() => {
    setModals((state) => state.slice(0, state.length - 1));
  }, []);

  const fadeTransitions = useTransition(modals, {
    key: (item: { css: string; height: number }) => item.css,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 150 },
  });

  const preparedModals = useMemo(() => {
    return fadeTransitions((style, modal) => {
      const ModalComponent = modalsMap.get(modal.modalName);

      if (!ModalComponent) {
        return null;
      }

      return (
        <ModalComponent
          key={modal.modalId}
          styleSpring={style}
          close={(result?: any) => closeModal(modal.modalId, result)}
          {...modal.props}
        />
      );
    });
  }, [fadeTransitions, closeModal]);

  return (
    <>
      <Global styles={GlobalCss} />
      <ModalsContext.Provider
        value={{
          openModal,
          closeModal,
          closeTopModal,
        }}
      >
        {children}
        {preparedModals}
      </ModalsContext.Provider>
    </>
  );
};

export function useModals(): ModalsContextState {
  const context = useContext(ModalsContext);
  return context;
}
