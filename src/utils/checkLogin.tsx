import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import RPC from "../components/web3Auth/solanaRPC";

export async function checkLogin(){
  const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID || "";

  try {
    const chainConfig = {
      chainNamespace: CHAIN_NAMESPACES.SOLANA,
      chainId: "0x3", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
      rpcTarget: "https://api.devnet.solana.com",
      displayName: "Solana Devnet",
      blockExplorer: "https://explorer.solana.com",
      ticker: "SOL",
      tickerName: "Solana Token",
    };
    const web3auth = new Web3AuthNoModal({
      clientId,
      chainConfig,
      // web3AuthNetwork: "sapphire_mainnet",
      web3AuthNetwork: "sapphire_devnet",
    });


    const privateKeyProvider = new SolanaPrivateKeyProvider({
      config: { chainConfig },
    });

    const openloginAdapter = new OpenloginAdapter({
      privateKeyProvider,
      adapterSettings: {
        uxMode: "redirect",
        redirectUrl: window.location.href,
      },
    });
    web3auth.configureAdapter(openloginAdapter);

    await web3auth.init();
    const rpc = new RPC(web3auth.provider!);
    if (web3auth.connected) {
      if (!rpc || !web3auth.provider) {
        console.log("rpc is null");
      }
      const account = await rpc.getAccounts();
      localStorage.setItem("web3pubkey", account[0]);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
