import type { AccountInfo as TokenAccount, MintInfo } from "@solana/spl-token";
import type { PublicKey } from "@solana/web3.js";

import { SOL_MINT } from "../../../constants";

// Cache storing all token accounts for the connected wallet provider.
export const _OWNED_TOKEN_ACCOUNTS_CACHE: Array<{
  publicKey: PublicKey;
  account: TokenAccount;
}> = [];

// Cache storing all previously fetched mint infos.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const _MINT_CACHE = new Map<string, Promise<MintInfo>>([
  [SOL_MINT.toString(), Promise.resolve({ decimals: 9 })],
]);
