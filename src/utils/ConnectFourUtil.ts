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

const connectFourAddress = "0x";

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