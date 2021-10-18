import styled from "@emotion/styled";
import { lighten } from "polished";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;

  color: #fff;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;

  background: #000000;
  border: none;
  border-radius: 16px;
  outline: none;
  cursor: pointer;

  &:hover {
    background: ${lighten(0.1, "#000")};
  }

  &:active {
    background: ${lighten(0.2, "#000")};
  }

  &:disabled {
    background: ${lighten(0.5, "#000")};
    cursor: not-allowed;
  }
`;
