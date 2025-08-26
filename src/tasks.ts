interface Token {
  address: string;
  symbol: string;
  decimals: number;
}

export interface SwapTask {
  taskName: string;
  tokenIn: Token;
  tokenOut: Token;
  amountIn: string;
}

const SWAP_TASKS: SwapTask[] = [
  {
    taskName: "Tukar XOS ke BONK (via swapExactETHForTokens)",
    tokenIn: {
      address: "0x291d66453dbab30a74422e142823a49a14d320d9",
      symbol: "WXOS",
      decimals: 18,
    },
    tokenOut: {
      address: "0x00309602f7977d45322279c4dd5cf61d16fd061b",
      symbol: "BONK",
      decimals: 18,
    },
    amountIn: "0.01",
  },
];

export default SWAP_TASKS;
