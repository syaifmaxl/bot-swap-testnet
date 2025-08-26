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
    amountIn: "0.007",
  },
  {
    taskName: "Tukar XOS ke PENGU (via swapExactETHForTokens)",
    tokenIn: {
      address: "0x291d66453dbab30a74422e142823a49a14d320d9",
      symbol: "WXOS",
      decimals: 18,
    },
    tokenOut: {
      address: "0x9573577927d3AbECDa9C69F5E8C50bc88b1e26EE",
      symbol: "PENGU",
      decimals: 18,
    },
    amountIn: "0.006",
  },
  {
    taskName: "Tukar XOS ke TST (via swapExactETHForTokens)",
    tokenIn: {
      address: "0x291d66453dbab30a74422e142823a49a14d320d9",
      symbol: "WXOS",
      decimals: 18,
    },
    tokenOut: {
      address: "0xD1194D2D06EDFBD815574383aeD6A9D76Cd568dA",
      symbol: "TST",
      decimals: 18,
    },
    amountIn: "0.009",
  },
  {
    taskName: "Tukar XOS ke USDC (via swapExactETHForTokens)",
    tokenIn: {
      address: "0x291d66453dbab30a74422e142823a49a14d320d9",
      symbol: "WXOS",
      decimals: 18,
    },
    tokenOut: {
      address: "0xb2C1C007421f0Eb5f4B3b3F38723C309Bb208d7d",
      symbol: "USDC",
      decimals: 18,
    },
    amountIn: "0.002",
  },
  {
    taskName: "Tukar XOS ke USDT (via swapExactETHForTokens)",
    tokenIn: {
      address: "0x291d66453dbab30a74422e142823a49a14d320d9",
      symbol: "WXOS",
      decimals: 18,
    },
    tokenOut: {
      address: "0x2CCDB83a043A32898496c1030880Eb2cB977CAbc",
      symbol: "USDT",
      decimals: 18,
    },
    amountIn: "0.006",
  },
  {
    taskName: "Tukar XOS ke RAY (via swapExactETHForTokens)",
    tokenIn: {
      address: "0x291d66453dbab30a74422e142823a49a14d320d9",
      symbol: "WXOS",
      decimals: 18,
    },
    tokenOut: {
      address: "0x4A79C7Fdb6d448b3f8F643010F4CdE8b2363EFD6",
      symbol: "RAY",
      decimals: 18,
    },
    amountIn: "0.008",
  },
  {
    taskName: "Tukar XOS ke WIF (via swapExactETHForTokens)",
    tokenIn: {
      address: "0x291d66453dbab30a74422e142823a49a14d320d9",
      symbol: "WXOS",
      decimals: 18,
    },
    tokenOut: {
      address: "0x9c6eEc453821d12B8dfea20b6FbdDB47f7bc500d",
      symbol: "WIF",
      decimals: 18,
    },
    amountIn: "0.004",
  },
  {
    taskName: "Tukar XOS ke JUP (via swapExactETHForTokens)",
    tokenIn: {
      address: "0x291d66453dbab30a74422e142823a49a14d320d9",
      symbol: "WXOS",
      decimals: 18,
    },
    tokenOut: {
      address: "0x26b597804318824a2E88Cd717376f025E6bb2219",
      symbol: "JUP",
      decimals: 18,
    },
    amountIn: "0.002",
  },
  {
    taskName: "Tukar XOS ke TRUMP (via swapExactETHForTokens)",
    tokenIn: {
      address: "0x291d66453dbab30a74422e142823a49a14d320d9",
      symbol: "WXOS",
      decimals: 18,
    },
    tokenOut: {
      address: "0xC09a5026d9244d482Fb913609Aeb7347B7F12800",
      symbol: "TRUMP",
      decimals: 18,
    },
    amountIn: "0.009",
  },
  {
    taskName: "Tukar XOS ke SOL (via swapExactETHForTokens)",
    tokenIn: {
      address: "0x291d66453dbab30a74422e142823a49a14d320d9",
      symbol: "WXOS",
      decimals: 18,
    },
    tokenOut: {
      address: "0x0c8a3D1fE7E40a39D3331D5Fa4B9fee1EcA1926A",
      symbol: "SOL",
      decimals: 18,
    },
    amountIn: "0.003",
  },
  {
    taskName: "Tukar XOS ke BNB (via swapExactETHForTokens)",
    tokenIn: {
      address: "0x291d66453dbab30a74422e142823a49a14d320d9",
      symbol: "WXOS",
      decimals: 18,
    },
    tokenOut: {
      address: "0x83DFbE02dc1B1Db11bc13a8Fc7fd011E2dBbd7c0",
      symbol: "BNB",
      decimals: 18,
    },
    amountIn: "0.001",
  },
];

export default SWAP_TASKS;
