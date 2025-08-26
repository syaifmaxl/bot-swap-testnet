# StealthSwap Bot: An Advanced Testnet Swap Automator

*An intelligent, TypeScript-based bot for automating token swaps on EVM testnets, designed to mimic human behavior for airdrop farming simulations and protocol stress-testing.*

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-v18%2B-green?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Ethers.js-6.x-purple?logo=ethereum&logoColor=white" alt="Ethers.js">
  <img src="https://img.shields.io/badge/status-active-brightgreen" alt="Status">
</p>

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

- ♾️ **Continuous & Randomized Execution**: Runs in an infinite loop, randomly selecting a task from your configuration file in each cycle to better simulate human activity.
- 🕵️‍♂️ **Mimics dApp Behavior**: Uses the DEX’s `multicall` function so transactions look like they came from the official UI, crucial for airdrop eligibility.
- ⛽ **Automated Gas Fees**: Fetches current network gas prices (`EIP-1559`) dynamically for optimal transaction costs.
- ⏱️ **Randomized Delays**: Automatically waits for a random duration between swaps within a configurable range (e.g., 2 to 5 minutes) to avoid predictable, bot-like patterns.
- 📋 **Dynamic Task Queue**: Easily define a list of different token swaps for the bot to choose from.
- 🔒 **Secure Key Management**: Store private keys safely in `.env` files, keeping them separate from the source code.
- 💪 **Type-Safe**: Written 100% in TypeScript for maximum safety and developer experience.

---

## 🛠 Tech Stack

- **TypeScript**: For robust, scalable, and type-safe code.
- **Node.js**: As the JavaScript runtime environment.
- **Ethers.js (v6)**: A complete and modern library for interacting with EVM-compatible blockchains.
- **ts-node**: To execute TypeScript files directly.
- **dotenv**: For managing environment variables.

---

## 🏁 Getting Started

### Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18 or later) 
- npm or yarn 
- [VS Code](https://code.visualstudio.com/) or any code editor 

You’ll also need:
- An **EVM-compatible burner wallet** (⚠️ never use your main wallet).
- Some **testnet tokens** (e.g., Sepolia ETH, XOS) to pay gas fees.

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

---

## ⚙️ Configuration

The bot's behavior is primarily controlled by two files: `swap.ts` (for delay settings) and `tasks.ts` (for swap targets).

### 1. Randomized Delay (`src/swap.ts`)

Open `src/swap.ts` and adjust the `minDelayMinutes` and `maxDelayMinutes` variables inside the `main()` function to control the random wait time between transactions.

```typescript
// src/swap.ts -> inside main()

const minDelayMinutes = 2; // Minimal delay 2 minutes
const maxDelayMinutes = 5; // Maximum delay 5 minutes
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