import { MARKETS } from "@project-serum/serum";
import { useSolana } from "@saberhq/use-solana";
import type { PublicKey } from "@solana/web3.js";
import { useAsync } from "react-async-hook";

import { useTokenMap } from "../../tokenList";

interface Markets {
  [coin: string]: {
    publicKey: PublicKey;
    name: string;
    deprecated?: boolean;
  };
}

const serumMarkets = (() => {
  const m: Markets = {};
  MARKETS.forEach((market) => {
    const coin = market.name.split("/")[0]!;
    if (m[coin]) {
      // Only override a market if it's not deprecated	.
      if (!m.deprecated) {
        m[coin] = {
          publicKey: market.address,
          name: market.name.split("/").join(""),
        };
      }
    } else {
      m[coin] = {
        publicKey: market.address,
        name: market.name.split("/").join(""),
      };
    }
  });

  return m;
})();

const cache: {
  [marketName: string]: number;
} = {};

interface BonfidaResponse {
  data: {
    market: string;
    bids: {
      price: number;
      size: number;
    }[];
    asks: {
      price: number;
      size: number;
    }[];
  };
}

export const usePrice = (mint: PublicKey) => {
  const { network } = useSolana();
  const tokenMap = useTokenMap();

  return useAsync<number | undefined>(() => {
    return new Promise((resolve) => {
      if (network !== "mainnet-beta") {
        resolve(undefined);
        return;
      }

      const tokenInfo = tokenMap.get(mint.toString());
      const tokenSymbol = tokenInfo?.symbol;
      if (!tokenSymbol) {
        resolve(undefined);
        return;
      }

      const market = serumMarkets[tokenSymbol];
      if (!market) {
        resolve(undefined);
        return;
      }

      if (cache[market.name] === undefined) {
        void fetch(
          `https://serum-api.bonfida.com/orderbooks/${market.name}`
        ).then((resp) => {
          void resp.json().then((resp: BonfidaResponse) => {
            if (resp.data.asks === null || resp.data.bids === null) {
              resolve(undefined);
            } else if (
              resp.data.asks.length === 0 &&
              resp.data.bids.length === 0
            ) {
              resolve(undefined);
            } else if (resp.data.asks.length === 0) {
              resolve(resp.data.bids[0]?.price);
            } else if (resp.data.bids.length === 0) {
              resolve(resp.data.asks[0]?.price);
            } else {
              const mid =
                (resp.data.asks[0]!.price + resp.data.bids[0]!.price) / 2.0;
              cache[market.name] = mid;
              resolve(cache[market.name]);
            }
          });
        });
      } else {
        return resolve(cache[market.name]);
      }
    });
  }, []);
};
