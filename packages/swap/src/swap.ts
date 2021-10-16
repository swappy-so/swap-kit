// inspired https://github.com/project-serum/serum-ts/blob/armani/swap2/packages/swap/src/index.ts

import type { Provider } from "@project-serum/anchor";
import { parseIdlErrors, Program, ProgramError } from "@project-serum/anchor";
import type { SendTxRequest } from "@project-serum/anchor/dist/cjs/provider";
import type { TokenListContainer } from "@solana/spl-token-registry";
import type { PublicKey, TransactionSignature } from "@solana/web3.js";

import { SWAP_PID } from "./constants";
import type { CreateSwapParams } from "./factory/createSwap";
import { createSwap } from "./factory/createSwap";
import type { SwapDirect } from "./factory/direct";
import type { SwapTransitive } from "./factory/transitive";
import { IDL } from "./idl";
import { SwapMarkets } from "./swap-markets";

export class Swap {
  private readonly _program: Program;
  private readonly _swapMarkets: SwapMarkets;
  private readonly _idlErrors: Map<number, string>;

  private _swap: SwapDirect | SwapTransitive | null = null;

  /**
   * @param provider  The wallet and network context to use for the client.
   * @param tokenList The token list providing market addresses for each mint.
   */
  constructor(provider: Provider, tokenList: TokenListContainer) {
    this._program = new Program(IDL, SWAP_PID, provider);
    this._swapMarkets = new SwapMarkets(provider, tokenList);
    this._idlErrors = parseIdlErrors(IDL);
  }

  /**
   * Anchor generated client for the swap program.
   */
  public get program(): Program {
    return this._program;
  }

  /**
   * Token list registry for fetching USD(x) markets for each mint.
   */
  private get swapMarkets(): SwapMarkets {
    return this._swapMarkets;
  }

  /**
   * Returns a list of markets to trade across to swap `fromMint` to `toMint`.
   */
  public route(fromMint: PublicKey, toMint: PublicKey): PublicKey[] | null {
    return this.swapMarkets.route(fromMint, toMint);
  }

  public prepare(directParams: CreateSwapParams): Swap {
    this._swap = createSwap(this._program, directParams);

    return this;
  }

  estimate() {
    if (!this._swap) {
      throw new Error("Make prepare before estimate");
    }

    const estimatedFee = this._swap.estimate();

    return estimatedFee;
  }

  async swap(): Promise<Array<TransactionSignature>> {
    if (!this._swap) {
      throw new Error("Make prepare before swap");
    }

    const txs: SendTxRequest[] = [];

    const swapTxs = await this._swap.swapTxs();

    txs.push(...swapTxs);

    try {
      // await to get instance error and handle it
      return await this._program.provider.sendAll(txs);
    } catch (error) {
      const programError = ProgramError.parse(error, this._idlErrors);
      if (programError) {
        throw programError;
      } else {
        throw error;
      }
    }
  }
}
