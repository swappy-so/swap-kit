import type { FC } from "react";
import React, { useMemo } from "react";

import { useModals } from "../modals";
import { SwapKitContext } from ".";

interface Props {
  children: React.ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  const { openModal } = useModals();

  const context = useMemo(() => {
    return { openSwapModal: () => openModal("swap") };
  }, []);

  return (
    <SwapKitContext.Provider value={context}>
      {children}
    </SwapKitContext.Provider>
  );
};
