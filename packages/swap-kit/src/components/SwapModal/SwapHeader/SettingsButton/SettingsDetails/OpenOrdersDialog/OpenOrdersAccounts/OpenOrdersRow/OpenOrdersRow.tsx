import type { BN } from "@project-serum/anchor";
import type { OpenOrders } from "@project-serum/serum";
import { Listbox, ListboxOption } from "@reach/listbox";
import type { MintInfo } from "@solana/spl-token";
import type { PublicKey } from "@solana/web3.js";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { DEX_PID } from "../../../../../../../..";
import { useDex, useMarket } from "../../../../../../../../contexts/dex";
import {
  useMint,
  useOwnedTokenAccount,
} from "../../../../../../../../contexts/token";
import { useTokenMap } from "../../../../../../../../contexts/tokenList";
import { Button } from "../../../../../../../Button";
import { Link } from "../../../../../../../Link";

function toDisplay(mintInfo: MintInfo | undefined | null, value: BN): string {
  if (!mintInfo) {
    return value.toNumber().toString();
  }
  return (value.toNumber() / 10 ** mintInfo.decimals).toFixed(
    mintInfo.decimals
  );
}

interface Props {
  market: PublicKey;
  openOrders: OpenOrders[];
}

export const OpenOrdersRow: FC<Props> = ({ market, openOrders }) => {
  const [ooAccount, setOoAccount] = useState(openOrders[0]!);

  const { swapClient, closeOpenOrders } = useDex();
  const marketClient = useMarket(market);
  const tokenMap = useTokenMap();
  const base = useMint(marketClient?.baseMintAddress);
  const quote = useMint(marketClient?.quoteMintAddress);
  const baseWallet = useOwnedTokenAccount(marketClient?.baseMintAddress);
  const quoteWallet = useOwnedTokenAccount(marketClient?.quoteMintAddress);

  const baseTicker = marketClient
    ? tokenMap.get(marketClient?.baseMintAddress.toString())?.symbol
    : "-";
  const quoteTicker = marketClient
    ? tokenMap.get(marketClient?.quoteMintAddress.toString())?.symbol
    : "-";
  const marketName =
    baseTicker && quoteTicker
      ? `${baseTicker} / ${quoteTicker}`
      : market.toString();
  const settleDisabled =
    ooAccount.baseTokenFree.toNumber() + ooAccount.quoteTokenFree.toNumber() ===
    0;
  const closeDisabled =
    ooAccount.baseTokenTotal.toNumber() +
      ooAccount.quoteTokenTotal.toNumber() !==
    0;

  useEffect(() => {
    setOoAccount(openOrders[0]!);
  }, [openOrders]);

  const settleFunds = async () => {
    if (!marketClient) {
      throw new Error("Market client not found");
    }
    if (!baseWallet || !quoteWallet) {
      throw new Error("Base or quote wallet not found");
    }

    const referrerWallet = undefined;
    const { transaction, signers } =
      await marketClient.makeSettleFundsTransaction(
        swapClient.program.provider.connection,
        ooAccount,
        baseWallet.publicKey,
        quoteWallet.publicKey,
        referrerWallet
      );

    await swapClient.program.provider.send(transaction, signers);
  };

  const _closeOpenOrders = async () => {
    if (!marketClient) {
      throw new Error("Market client not found");
    }

    await swapClient.program.rpc.closeAccount!({
      accounts: {
        openOrders: ooAccount.address,
        authority: swapClient.program.provider.wallet.publicKey,
        destination: swapClient.program.provider.wallet.publicKey,
        market: marketClient.address,
        dexProgram: DEX_PID,
      },
    });
    closeOpenOrders(ooAccount);
  };

  return (
    <tr key={market.toString()}>
      <th scope="row">
        <div>
          <Link
            href={`https://dex.projectserum.com/#/market/${market.toString()}`}
            target="_blank"
            rel="noopener"
          >
            {marketName}
          </Link>
        </div>
      </th>
      <td align="center">
        <Listbox
          value={ooAccount.address.toString()}
          onChange={(value) =>
            setOoAccount(
              openOrders.filter((oo) => oo.address.toString() === value)[0]!
            )
          }
        >
          {openOrders.map((oo) => {
            return (
              <ListboxOption
                key={oo.address.toString()}
                value={oo.address.toString()}
              >
                {oo.address.toString()}
              </ListboxOption>
            );
          })}
        </Listbox>
      </td>
      <td align="center">
        {toDisplay(base, ooAccount.baseTokenTotal.sub(ooAccount.baseTokenFree))}
      </td>
      <td align="center">{toDisplay(base, ooAccount.baseTokenFree)}</td>
      <td align="center">
        {toDisplay(
          quote,
          ooAccount.quoteTokenTotal.sub(ooAccount.quoteTokenFree)
        )}
      </td>
      <td align="center">{toDisplay(quote, ooAccount.quoteTokenFree)}</td>
      <td align="center">
        <Button disabled={settleDisabled} onClick={settleFunds}>
          Settle
        </Button>
      </td>
      <td align="center">
        <Button
          disabled={closeDisabled}
          onClick={_closeOpenOrders}
          // className={styles.closeAccount}
        >
          Close
        </Button>
      </td>
    </tr>
  );
};
