import styled from "@emotion/styled";
import Popover, { positionRight } from "@reach/popover";
import { darken } from "polished";
import type { FC } from "react";
import React, { useRef, useState } from "react";
import { MdSettings } from "react-icons/md";

import { useClickOutsideHook } from "../../../../../hooks/useClickOutsideHook";
import { SettingsPopover } from "./SettingsPopover";

const ButtonIcon = styled.a`
  font-size: 24px;
  color: #ccd2e3;
  transition: 0.1s ease;

  &:hover {
    color: ${darken(0.1, "#ccd2e3")};
  }
`;

export const SettingsButton: FC = () => {
  const ref = useRef(null);
  const popoverRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutsideHook(popoverRef, () => {
    setIsOpen(false);
  });

  const handleToggleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((state) => !state);
  };

  return (
    <>
      <ButtonIcon href="#" ref={ref} onClick={handleToggleClick}>
        <MdSettings />
      </ButtonIcon>
      {isOpen ? (
        <Popover ref={popoverRef} targetRef={ref} position={positionRight}>
          <SettingsPopover />
        </Popover>
      ) : null}
    </>
  );
};
