import styled from "@emotion/styled";
import type { FC } from "react";

import { useModals } from "../../../../../../contexts/modals";
import { useSwap, useSwapFair } from "../../../../../../contexts/swap";
import { useDex } from "../../../../../../index";
import { Button } from "../../../../../common/Button";
import { CloseNewAccountsSwitch } from "./CloseNewAccountsSwitch/CloseNewAccountsSwitch";

const Wrapper = styled.div`
  width: 305px;
  padding: 28px 20px;

  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 40px rgba(180, 180, 180, 0.5);
`;

export const SettingsPopover: FC = () => {
  const { openModal } = useModals();
  const { slippage, setSlippage, fairOverride, setFairOverride } = useSwap();
  const fair = useSwapFair();
  const { swapClient } = useDex();

  const setSlippageHandler = (value?: number) => {
    setSlippage(!value || value < 0 ? 0 : value);
  };

  return (
    <Wrapper>
      <div style={{ fontWeight: "bold" }}>Settings</div>
      <div>
        <div style={{ marginTop: "10px" }}>
          <div color="textSecondary" style={{ fontSize: "12px" }}>
            Slippage tolerance
          </div>
          <input
            type="number"
            placeholder="Error tolerance percentage"
            value={slippage}
            onChange={(e) => setSlippageHandler(parseFloat(e.target.value))}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
            // InputProps={{
            //   endAdornment: <InputAdornment position="end">%</InputAdornment>,
            // }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <div color="textSecondary" style={{ fontSize: "12px" }}>
            Fair price
          </div>
          <div style={{ display: "flex" }}>
            <input
              type="number"
              placeholder="Fair price override"
              value={fair}
              onChange={(e) => setFairOverride(parseFloat(e.target.value))}
              style={{
                marginRight: "10px",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
              disabled={fairOverride === null}
            />
            <button
              onClick={() => {
                if (fair === undefined) {
                  console.error("Fair is undefined");
                  return;
                }
                if (fairOverride === null) {
                  setFairOverride(fair);
                } else {
                  setFairOverride(null);
                }
              }}
              // className={
              //   fairOverride === null
              //     ? styles.fairAutoSelected
              //     : styles.fairAuto
              // }
            >
              Auto
            </button>
          </div>
        </div>
        <div style={{ margin: "10px 0px" }}>
          <CloseNewAccountsSwitch />
        </div>
        <Button
          disabled={swapClient.program.provider.wallet.publicKey === null}
          onClick={() => openModal("openOrders")}
        >
          Manage Dex Accounts
        </Button>
      </div>
    </Wrapper>
  );
};
