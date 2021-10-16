import styled from "@emotion/styled";
import type { FC } from "react";
import { useState } from "react";

import { useDex } from "../../../../..";
import { useSwap, useSwapFair } from "../../../../../contexts/swap";
import { Button } from "../../../../Button";
import { CloseNewAccountsSwitch } from "./CloseNewAccountsSwitch/CloseNewAccountsSwitch";
import { OpenOrdersDialog } from "./OpenOrdersDialog";

const Wrapper = styled.div`
  width: 305px;
  padding: 28px 20px;

  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 40px rgba(180, 180, 180, 0.5);
`;

export const SettingsDetails: FC = () => {
  const { slippage, setSlippage, fairOverride, setFairOverride } = useSwap();
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
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
          // fullWidth
          disabled={swapClient.program.provider.wallet.publicKey === null}
          onClick={() => setShowSettingsDialog(true)}
        >
          Manage Dex Accounts
        </Button>
      </div>
      <OpenOrdersDialog
        open={showSettingsDialog}
        onClose={() => setShowSettingsDialog(false)}
      />
    </Wrapper>
  );
};
