import Popover, { positionDefault } from "@reach/popover";
import type { FC } from "react";
import { useRef, useState } from "react";

import { InfoDetails } from "./InfoDetails";

export const InfoButton: FC = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleClick = () => {
    setIsOpen((state) => !state);
  };

  return (
    <>
      <button ref={ref} onClick={handleToggleClick}>
        x
      </button>
      {isOpen ? (
        <Popover targetRef={ref} position={positionDefault}>
          <InfoDetails />
        </Popover>
      ) : null}
    </>
  );
};
