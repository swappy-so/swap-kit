import type { SpringValue } from "react-spring";

export type ModalType = "swap" | "tokens" | "openOrders" | null;
export type ModalPropsType = {
  close: () => void;
  styleSpring: { opacity: SpringValue<number> };
};
