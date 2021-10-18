// based on https://github.com/GokiProtocol/walletkit/blob/52be21aa4f2ea8925da77aa6fc0e5d51faedcf17/packages/walletkit/src/components/Modal/index.tsx

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import darken from "polished/lib/color/darken";
import React from "react";
import { isMobile } from "react-device-detect";
import { MdClose } from "react-icons/md";
import { animated, useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";

import type { ModalPropsType } from "../../../contexts/modals/types";

const TopArea = styled.div`
  position: absolute;
  top: 12px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonIcon = styled.a`
  font-size: 24px;
  color: #ccd2e3;
  transition: 0.1s ease;

  &:hover {
    color: ${darken(0.1, "#ccd2e3")};
  }
`;

const Content = styled.div`
  padding: 50px 0 0;
`;

const ModalWrapper = styled(animated(DialogContent))`
  * {
    box-sizing: border-box;
  }

  position: relative;
  width: 100%;
  max-width: 360px;

  color: #2a2a2a;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.02em;

  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 3%), 0 1px 4px rgb(0 0 0 / 4%),
    0 20px 40px rgb(0 0 0 / 4%);
  overflow: hidden;
`;

const DialogOverlayStyled = styled(animated(DialogOverlay), {
  shouldForwardProp(prop) {
    return prop !== "darkenOverlay";
  },
})<{
  darkenOverlay: boolean;
}>`
  [data-reach-dialog-content] {
    padding: 0;
  }
  ${({ darkenOverlay }) =>
    darkenOverlay
      ? css`
          background: rgba(0, 0, 0, 0.55);
        `
      : css`
          background: none;
        `}
`;

export interface ModalProps extends ModalPropsType {
  darkenOverlay?: boolean;
  hideCloseButton?: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  styleSpring,
  close,
  darkenOverlay = true,
  hideCloseButton = false,
  children,
}: ModalProps) => {
  const [{ y }, set] = useSpring(() => ({
    y: 0,
    config: { mass: 1, tension: 210, friction: 20 },
  }));

  const bind = useGesture({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      });
      if (
        state.movement[1] > 300 ||
        (state.velocity > 3 && state.direction[1] > 0)
      ) {
        close();
      }
    },
  });

  return (
    <>
      <DialogOverlayStyled
        style={styleSpring}
        isOpen
        onDismiss={close}
        darkenOverlay={darkenOverlay}
      >
        <ModalWrapper
          aria-label="dialog content"
          {...(isMobile
            ? {
                ...bind(),
                style: {
                  transform: y.to((n) => `translateY(${n > 0 ? n : 0}px)`),
                },
              }
            : {})}
        >
          <TopArea>
            <div />
            {hideCloseButton ? (
              <div />
            ) : (
              <ButtonIcon
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  close();
                }}
              >
                <MdClose />
              </ButtonIcon>
            )}
          </TopArea>
          <Content>{children}</Content>
        </ModalWrapper>
      </DialogOverlayStyled>
    </>
  );
};
