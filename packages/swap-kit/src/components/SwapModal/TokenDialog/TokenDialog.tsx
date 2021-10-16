import styled from "@emotion/styled";
import { useMediaQuery } from "@react-hook/media-query";
import type { TokenInfo } from "@solana/spl-token-registry";
import type { PublicKey } from "@solana/web3.js";
import type { FC } from "react";
import { useMemo, useState } from "react";

import { useSwappableTokens } from "../../../contexts/tokenList";
import { Modal } from "../..";
import { TokenRow } from "./TokenRow";

const Header = styled.div`
  padding: 0 28px 28px;

  font-weight: bold;

  backdrop-filter: blur(15px);
`;

const Content = styled.div`
  max-height: 300px;
  padding: 0 28px 28px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    position: absolute;
    width: 6px;
    height: 6px;

    right: 0;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`;

function matchesFilter(str: string, filter: string) {
  return str.toLowerCase().indexOf(filter.toLowerCase().trim()) >= 0;
}

interface Props {
  open: boolean;
  onClose: () => void;
  setMint: (mint: PublicKey) => void;
}

export const TokenDialog: FC<Props> = ({ open, onClose, setMint }) => {
  const [tabSelection, setTabSelection] = useState(0);
  const [tokenFilter, setTokenFilter] = useState("");
  const { swappableTokens, swappableTokensSollet, swappableTokensWormhole } =
    useSwappableTokens();
  const displayTabs = !useMediaQuery("(max-width:450px)");

  const selectedTokens =
    tabSelection === 0
      ? swappableTokens
      : tabSelection === 1
      ? swappableTokensWormhole
      : swappableTokensSollet;

  const tokens = useMemo(() => {
    if (tokenFilter === "") {
      return selectedTokens;
    }

    return selectedTokens
      .filter(
        (token) =>
          matchesFilter(token.symbol, tokenFilter) ||
          matchesFilter(token.name, tokenFilter) ||
          matchesFilter(token.address, tokenFilter)
      )
      .sort((a, b) => a.symbol.localeCompare(b.symbol));
  }, [selectedTokens, tokenFilter]);

  return (
    <Modal isOpen={open} onDismiss={onClose} darkenOverlay={false}>
      <Header>
        <h1 style={{ paddingBottom: "16px" }}>Select a token</h1>
        <input
          placeholder={"Search name"}
          value={tokenFilter}
          onChange={(e) => setTokenFilter(e.target.value)}
        />
      </Header>
      <Content>
        {tokens.map((tokenInfo: TokenInfo) => (
          <TokenRow
            key={tokenInfo.address}
            tokenInfo={tokenInfo}
            onClick={(mint) => {
              setMint(mint);
              onClose();
            }}
          />
        ))}
      </Content>
      {/*{displayTabs && (*/}
      {/*  <DialogActions>*/}
      {/*    <Tabs*/}
      {/*      value={tabSelection}*/}
      {/*      onChange={(e, v) => setTabSelection(v)}*/}
      {/*      classes={{*/}
      {/*        indicator: styles.tabIndicator,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <Tab*/}
      {/*        value={0}*/}
      {/*        className={styles.tab}*/}
      {/*        classes={{ selected: styles.tabSelected }}*/}
      {/*        label="Main"*/}
      {/*      />*/}
      {/*      <Tab*/}
      {/*        value={1}*/}
      {/*        className={styles.tab}*/}
      {/*        classes={{ selected: styles.tabSelected }}*/}
      {/*        label="Wormhole"*/}
      {/*      />*/}
      {/*      <Tab*/}
      {/*        value={2}*/}
      {/*        className={styles.tab}*/}
      {/*        classes={{ selected: styles.tabSelected }}*/}
      {/*        label="Sollet"*/}
      {/*      />*/}
      {/*    </Tabs>*/}
      {/*  </DialogActions>*/}
      {/*)}*/}
    </Modal>
  );
};
