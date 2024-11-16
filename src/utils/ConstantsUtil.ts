const projectId = process.env["NEXT_PUBLIC_PROJECT_ID"];
if (!projectId) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not set");
}

export const ConstantsUtil = {
  SigningSucceededToastTitle: "Signing Succeeded",
  SigningFailedToastTitle: "Signing Failed",
  TestIdSiweAuthenticationStatus: "w3m-authentication-status",
  Metadata: {
    name: "ConnectFour",
    description: "Connect Four",
    url: "http://localhost:3000",
    icons: ["http://localhost:3000/metadata-icon.svg"],
    verifyUrl: "",
  },
  CustomWallets: [  ],
  ProjectId: projectId,
};

