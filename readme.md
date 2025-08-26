# 🚀 Automated DEX Swap Bot for EVM Testnets

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?logo=node.js)](https://nodejs.org) 
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/) 
[![Ethers.js](https://img.shields.io/badge/Ethers.js-6.x-purple?logo=ethereum)](https://docs.ethers.org/) 
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📖 Overview

This repository contains a sophisticated, **TypeScript-based bot** designed to automate token swaps on **EVM-compatible testnet environments**.  
It mimics the behavior of a manual user by leveraging the DEX's **multicall** function — making it a powerful tool for:

- 🧪 Protocol testing  
- 🛠 Development workflows  
- 🎯 Advanced airdrop farming simulations  

The bot is **configurable**, **type-safe**, and handles on-chain interactions securely and efficiently using **Ethers.js**.

---

## ✨ Features

- 🤖 **Dynamic Task Queue** – Configure multiple token swaps to run sequentially.  
- 🕵️‍♂️ **Mimics dApp Behavior** – Uses the DEX’s multicall so transactions look like they came from the official UI.  
- ⛽ **Automated Gas Fees** – Fetches current network gas prices (`EIP-1559`) dynamically.  
- ⏱️ **Configurable Delays** – Add delays between swaps to simulate real user actions.  
- 🔒 **Secure Key Management** – Store private keys safely in `.env` files.  
- 💪 **Type-Safe** – Written 100% in TypeScript for maximum safety.  

---

## 🛠 Tech Stack

- **TypeScript** – Robust, scalable, type-safe  
- **Node.js** – JavaScript runtime  
- **Ethers.js** – Ethereum blockchain interactions  
- **ts-node** – Run TypeScript directly  

---

## 📦 Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (v18 or later)  
- npm or yarn  
- [VS Code](https://code.visualstudio.com/) or any code editor  

You’ll also need:

- An **EVM-compatible burner wallet** (⚠️ never use your main wallet)  
- Some **testnet tokens** (e.g., Sepolia ETH, XOS) to pay gas fees  

---

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/syaifmaxl/bot-swap-testnet.git](https://github.com/syaifmaxl/bot-swap-testnet.git)
    cd bot-swap-testnet
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create and configure the environment file:**
    Copy the example file to create your own configuration file.
    ```bash
    cp .env.example .env
    ```
    Now, open the `.env` file and add your RPC URL and private key.
    ```env
    # Your Testnet RPC URL from a provider like Alchemy or Infura
    RPC_URL="[https://testnet-rpc.xoscan.io](https://testnet-rpc.xoscan.io)"

    # The private key from your DEDICATED BURNER WALLET
    PRIVATE_KEY="0x..."
    ```

## ⚙️ Configuration

The bot's entire behavior is controlled by the `src/tasks.ts` file. This is where you define which tokens to swap and in what amounts.

The `SWAP_TASKS` array holds a list of swap operations. Each task object must conform to the `SwapTask` interface.

```typescript
export interface SwapTask {
  taskName: string;
  tokenIn: Token;
  tokenOut: Token;
  amountIn: string;
}
```
**Example tasks.ts Configuration**

This example configures the bot to swap 0.01 of the native token (XOS) for the BONK token.

```typescript
// src/tasks.ts
const SWAP_TASKS: SwapTask[] = [
  {
    taskName: "Swap XOS for BONK (via Multicall)",
    
    // IMPORTANT: For native token swaps (XOS, ETH), `tokenIn` must be the
    // address of the WRAPPED native token (WXOS, WETH). The bot sends the
    // native token as `value`, but the router's path requires the wrapped address.
    tokenIn: { 
      address: "0x291d66453dbab30a74422e142823a49a14d320d9", // WXOS Address
      symbol: "WXOS", 
      decimals: 18 
    },
    
    tokenOut: { 
      address: "0x00309602f7977d45322279c4dd5cf61d16fd061b", // BONK Address
      symbol: "BONK", 
      decimals: 18 
    },

    // This is the amount of the NATIVE token (XOS) to be sent with the transaction.
    amountIn: "0.01", 
  },
  // You can add more swap tasks here. They will run sequentially.
];

export default SWAP_TASKS;
```
Note: Remember to use all-lowercase addresses for both the router and tokens to avoid potential checksum errors.

## ▶️ Running the Bot

Once your .env and tasks.ts files are configured, start the bot with:

```bash
npm start
```
The bot will initialize, connect to your wallet, and begin executing the defined tasks, with detailed logs printed to your console.

**🤔 Troubleshooting**

- `bad address checksum` Error: This error occurs if an address has mixed-case capitalization that doesn't conform to the EIP-55 standard. Solution: Ensure all addresses in `swap.ts` and `tasks.ts` are in lowercase.

- `could not decode result data (getAmountsOut)` Error: This means the DEX router's price-check function is failing or doesn't support the token pair. Solution: The bot is already configured to bypass this check by setting `amountOutMin` to `0`. This is safe for testnets but should never be done on mainnet.

- Transaction Fails / Reverts: The most common cause is a lack of liquidity for the token pair on the testnet DEX. Solution: Before adding a task, go to the DEX's web interface and manually verify that you can perform the swap. Only configure the bot with pairs that are confirmed to have liquidity.

**🤝 Contributing**

Contributions are welcome! If you have ideas for new features, improvements, or have found a bug, please feel free to:

1. Open an issue to discuss the change.
2. Fork the repository and create a new branch.
3. Submit a pull request with a clear description of your changes.

**📄 License**

This project is licensed under the MIT License. See the LICENSE file for details.

**⚠️ Security & Disclaimer**

- This software is provided for educational and testing purposes ONLY.
- The use of this bot is at your own risk. The author is not responsible for any financial loss or other damages.
- NEVER use a private key from a wallet that holds real assets. Always create a separate, dedicated burner wallet for development.
- There is no guarantee that using this bot will result in eligibility for any airdrop.