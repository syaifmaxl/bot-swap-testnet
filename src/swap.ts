import { ethers, Contract, Wallet, JsonRpcProvider, Provider } from "ethers";
import "dotenv/config";
import SWAP_TASKS, { SwapTask } from "./tasks";

const ROUTER_ADDRESS = "0x3f3b6d28e79e13d5069f14e737b819468e0d468b";

const ROUTER_ABI = [
  "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
  "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
];

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function performSwap(
  task: SwapTask,
  wallet: Wallet,
  provider: Provider
): Promise<boolean> {
  console.log(`\n▶️  Memulai tugas: ${task.taskName}`);

  const routerContract: Contract = new ethers.Contract(
    ROUTER_ADDRESS,
    ROUTER_ABI,
    wallet
  );

  const amountIn = ethers.parseUnits(task.amountIn, task.tokenIn.decimals);

  try {
    console.log("[1/2] Mempersiapkan swap (melewatkan pengecekan harga)...");
    const path = [task.tokenIn.address, task.tokenOut.address];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; 

   
    const amountOutMin = 0n; 
    console.log(
      "      Slippage protection dinonaktifkan (amountOutMin = 0)."
    );

    console.log("[2/2] Mengambil gas fee dan mengirim transaksi swap...");
    const feeData = await provider.getFeeData();

    const swapTx = await routerContract.swapExactETHForTokens(
      amountOutMin, 
      path,
      wallet.address,
      deadline,
      {
        value: amountIn,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        gasLimit: 300000,
      }
    );

    await swapTx.wait();
    console.log("      SWAP BERHASIL!");
    console.log(
      `      Lihat transaksi: https://testnet.xoscan.io/tx/${swapTx.hash}`
    );
    return true;
  } catch (error: any) {
    console.error(`     GAGAL menjalankan tugas: ${task.taskName}`);
    console.error(`     Pesan Error: ${error.reason || error.message}`);
    return false;
  }
}


async function main() {
  const rpcUrl = process.env.RPC_URL;
  const privateKey = process.env.PRIVATE_KEY;
  if (!rpcUrl || !privateKey) {
    throw new Error(
      "Pastikan RPC_URL dan PRIVATE_KEY sudah diatur di file .env"
    );
  }

  console.log(" Bot Swap Testnet Ready...");
  const provider: JsonRpcProvider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet: Wallet = new ethers.Wallet(privateKey, provider);

  console.log(`Terhubung dengan dompet: ${wallet.address}`);
  console.log(`Mengimpor ${SWAP_TASKS.length} tugas dari tasks.ts...`);

  for (let i = 0; i < SWAP_TASKS.length; i++) {
    await performSwap(SWAP_TASKS[i], wallet, provider);
    if (i < SWAP_TASKS.length - 1) {
      console.log("\n⏸️  Memberi jeda 2 menit sebelum transaksi berikutnya...");
      await delay(2 * 60 * 1000);
    }
  }

  console.log("\n Semua tugas swap telah selesai dijalankan. Bot berhenti.");
}

main().catch((error) => {
  console.error("Terjadi error fatal:", error);
  process.exit(1);
});
