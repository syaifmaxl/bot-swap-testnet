import { ethers, Contract, Wallet, JsonRpcProvider, Provider } from "ethers";
import "dotenv/config";
import SWAP_TASKS, { SwapTask } from "./tasks";

const ROUTER_ADDRESS = "0x3f3b6d28e79e13d5069f14e737b819468e0d468b";

const ROUTER_ABI = [
  "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
  "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
  "function multicall(bytes[] calldata data) external payable returns (bytes[] memory results)",
];

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function performSwap(
  task: SwapTask,
  wallet: Wallet,
  provider: Provider,
  minAmount: number,
  maxAmount: number
): Promise<boolean> {
  console.log(`\n▶️  Memulai tugas: ${task.taskName}`);

  const routerContract: Contract = new ethers.Contract(
    ROUTER_ADDRESS,
    ROUTER_ABI,
    wallet
  );

  const randomAmount = Math.random() * (maxAmount - minAmount) + minAmount;
  const amountInString = randomAmount.toFixed(
    Math.floor(Math.random() * 3) + 4
  );
  const amountIn = ethers.parseUnits(amountInString, task.tokenIn.decimals);

  console.log(
    `      💸 Jumlah swap acak ditentukan: ${amountInString} ${task.tokenIn.symbol.replace(
      "W",
      ""
    )}`
  );

  try {
    console.log("[1/3] Mempersiapkan data perintah untuk multicall...");
    const path = [task.tokenIn.address, task.tokenOut.address];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    const amountOutMin = 0n;
    const routerInterface = new ethers.Interface(ROUTER_ABI);
    const encodedSwapData = routerInterface.encodeFunctionData(
      "swapExactETHForTokens",
      [amountOutMin, path, wallet.address, deadline]
    );
    console.log("      ✅ Data perintah swap berhasil di-encode.");
    console.log("[2/3] Mengambil data gas fee terkini...");
    const feeData = await provider.getFeeData();
    console.log("[3/3] Mengirim transaksi via multicall...");
    const multicallTx = await routerContract.multicall([encodedSwapData], {
      value: amountIn, 
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      gasLimit: 300000,
    });
    await multicallTx.wait();
    console.log("      🎉 SWAP BERHASIL (via Multicall)!");
    console.log(
      `      🔗 Lihat transaksi: https://testnet.xoscan.io/tx/${multicallTx.hash}`
    );
    return true;
  } catch (error: any) {
    console.error(`      ❌ GAGAL menjalankan tugas: ${task.taskName}`);
    console.error(`      Pesan Error: ${error.reason || error.message}`);
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

  const minAmount = 0.001;
  const maxAmount = 0.009;

  const minDelayMinutes = 1;
  const maxDelayMinutes = 3;

  console.log("🚀 Bot Swap Testnet Dimulai (Mode Acak & Berulang)...");
  console.log(`Tekan CTRL + C untuk menghentikan bot.`);

  const provider: JsonRpcProvider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet: Wallet = new ethers.Wallet(privateKey, provider);

  console.log(`Terhubung dengan dompet: ${wallet.address}`);
  console.log(`Mengimpor ${SWAP_TASKS.length} jenis tugas dari tasks.ts...`);
  console.log(
    `Jumlah swap akan diacak antara ${minAmount} dan ${maxAmount} XOS.`
  );

  let taskCount = 0;
  while (true) {
    taskCount++;
    console.log(`\n--- Memulai Putaran #${taskCount} ---`);

    const randomIndex = Math.floor(Math.random() * SWAP_TASKS.length);
    const randomTask = SWAP_TASKS[randomIndex];

    await performSwap(randomTask, wallet, provider, minAmount, maxAmount);

    const randomDelayMs =
      (Math.random() * (maxDelayMinutes - minDelayMinutes) + minDelayMinutes) *
      60 *
      1000;

    const delayMinutes = (randomDelayMs / 60000).toFixed(1);

    console.log(
      `\n⏸️  Tugas selesai. Memberi jeda acak selama ${delayMinutes} menit sebelum putaran berikutnya...`
    );
    await delay(randomDelayMs);
  }
}

main().catch((error) => {
  console.error("Terjadi error fatal:", error);
  process.exit(1);
});
