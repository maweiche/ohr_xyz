import "./web3.module.css";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { CgGoogle, CgArrowRight } from "react-icons/cg";
import { useEffect, useState } from "react";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import RPC from "./solanaRPC";
import { useRouter, useSearchParams } from "next/navigation";

function Web3AuthLogout() {
  const { publicKey } = useWallet();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  // console.log('ENV VALUE: ' + process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
  const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;

  function uiConsole(...args) {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  // const getUserInfo = async () => {
  //   if (!web3auth) {
  //     uiConsole("web3auth not initialized yet");
  //     return;
  //   }
  //   const user = await web3auth.getUserInfo();
  //   uiConsole(user);
  // };

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    setProvider(web3authProvider);
  };

  const loginWithEmail = async (email) => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "email_passwordless",
        extraLoginOptions: {
          login_hint: email, // email to send the OTP to
        },
      }
    );
    setProvider(web3authProvider);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    // clear the "web3pubkey" from localStorage
    localStorage.removeItem("web3pubkey");
    setLoggedIn(false);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const rpc = new RPC(provider);
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

        setWeb3auth(web3auth);

        const privateKeyProvider = new SolanaPrivateKeyProvider({
          config: { chainConfig },
        });

        const openloginAdapter = new OpenloginAdapter({
          privateKeyProvider,
          adapterSettings: {
            uxMode: "popup",
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        await web3auth.init();
        setProvider(web3auth.provider);
        if (web3auth.connected) {
          setLoggedIn(true);
          const account = await rpc.getAccounts();
          localStorage.setItem("web3pubkey", account[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  return (
    <div className="login-container">
      <div className="flex flex-row items-center justify-center">
        {loggedIn && (
          <button
            onClick={logout}
            className="flex flex-row items-center justify-center"
          >
            <CgGoogle onClick={login} className="google-icon" />
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}

export default Web3AuthLogout;
