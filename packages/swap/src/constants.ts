import { PublicKey } from "@solana/web3.js";

// Serum DEX program id on mainnet-beta.
export const DEX_PID = new PublicKey(
  "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"
);

// Swap program id on mainnet-beta.
export const SWAP_PID = new PublicKey(
  "22Y43yTVxuUkoRKdm9thyRhQ3SdgQS7c7kB6UNCiaczD"
);

// USDC mint on mainnet-beta.
export const USDC_PUBKEY = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

// USDT mint on mainnet-beta.
export const USDT_PUBKEY = new PublicKey(
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
);

// Arbitrary mint to represent SOL (not wrapped SOL).
export const SOL_MINT = new PublicKey(
  "Ejmc1UB4EsES5oAaRN63SpoxMJidt3ZGBrqrZk49vjTZ"
);

export const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);
