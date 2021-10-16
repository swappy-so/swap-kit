// based on https://github.com/GokiProtocol/walletkit/blob/52be21aa4f2ea8925da77aa6fc0e5d51faedcf17/packages/walletkit/src/components/Modal/index.tsx

import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import darken from "polished/lib/color/darken";
import React from "react";
import { isMobile } from "react-device-detect";
import { animated, useSpring, useTransition } from "react-spring";
import { useGesture } from "react-use-gesture";

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
  flex: 0 0 24px;
  color: #ccd2e3;
  transition: 0.1s ease;

  &:hover {
    color: ${darken(0.1, "#ccd2e3")};
  }
`;

const Content = styled.div`
  padding: 32px 0 0;
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
  box-shadow: 0 4px 40px rgba(180, 180, 180, 0.5);
`;

const StyledDialogOverlay = styled(animated(DialogOverlay), {
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

export interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  darkenOverlay?: boolean;
  hideCloseButton?: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
  darkenOverlay = true,
  hideCloseButton = false,
  children,
}: ModalProps) => {
  const fadeTransition = useTransition(isOpen, {
    config: { duration: 150 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

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
        onDismiss();
      }
    },
  });

  return (
    <>
      {/* @reach/dialog/styles.css */}
      <Global
        styles={css`
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
        `}
      />
      {fadeTransition(
        (props, item) =>
          item && (
            <StyledDialogOverlay
              style={props}
              isOpen={isOpen || props.opacity.get() !== 0}
              onDismiss={onDismiss}
              darkenOverlay={darkenOverlay}
            >
              <ModalWrapper
                aria-label="dialog content"
                {...(isMobile
                  ? {
                      ...bind(),
                      style: {
                        transform: y.to(
                          (n) => `translateY(${n > 0 ? n : 0}px)`
                        ),
                      },
                    }
                  : {})}
              >
                <TopArea>
                  {hideCloseButton ? (
                    <div />
                  ) : (
                    <ButtonIcon
                      href="#"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onDismiss();
                      }}
                    >
                      Close
                      {/*<CloseIcon />*/}
                    </ButtonIcon>
                  )}
                </TopArea>
                <Content>{children}</Content>
              </ModalWrapper>
            </StyledDialogOverlay>
          )
      )}
    </>
  );
};
