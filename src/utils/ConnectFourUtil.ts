import { encodeFunctionData, parseEther } from "viem";
import { ConnectFourAbi } from "./ConnectFourAbi";
import {
  createPublicClient,
  createWalletClient,
  decodeEventLog,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import {
  SmartSessionGrantPermissionsRequest,
  SmartSessionGrantPermissionsResponse,
} from "@reown/appkit-experimental/smart-session";

const connectFourAddress = "0xbdBd16D07Fe58458A99CB1C3183e65Ad30026A91";

export function getConnectFourMakeMovePermissions(): Omit<
  SmartSessionGrantPermissionsRequest,
  "signer" | "chainId" | "address" | "expiry"
> {
  return {
    permissions: [
      {
        type: "contract-call",
        data: {
          address: connectFourAddress,
          abi: ConnectFourAbi as unknown as Record<string, unknown>[],
          functions: [
            {
              functionName: "makeMove",
            },
          ],
        },
      },
    ],
    policies: [],
  };
}

export async function createGame(
  applicationPrivateKey: string,
  playerOAddress: `0x${string}`,
) {
  const account = privateKeyToAccount(applicationPrivateKey as `0x${string}`);
  const walletClient = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(),
  });
  const txHash = await walletClient.writeContract({
    address: connectFourAddress,
    abi: ConnectFourAbi,
    functionName: "createGame",
    args: [playerOAddress],
  });

  return txHash;
}