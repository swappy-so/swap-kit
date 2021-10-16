import Popover, { positionRight } from "@reach/popover";
import type { FC } from "react";
import { useRef, useState } from "react";

import { SettingsDetails } from "./SettingsDetails";

export const SettingsButton: FC = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleClick = () => {
    setIsOpen((state) => !state);
  };

  return (
    <>
      <button ref={ref} onClick={handleToggleClick}>
        Settings
      </button>
      {isOpen ? (
        <Popover targetRef={ref} position={positionRight}>
          <SettingsDetails />
        </Popover>
      ) : null}
    </>
  );
};
