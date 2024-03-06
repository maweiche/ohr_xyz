import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { useEffect, useState } from "react";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";

function Web3AuthLogout() {
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID!;

  function uiConsole(...args: string[] | object[]) {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    // clear the "web3pubkey" from localStorage
    localStorage.removeItem("web3pubkey");
    setLoggedIn(false);
    // refresh the page
    window.location.reload();
  };

  useEffect(() => {
    const init = async () => {
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
        if (web3auth.connected) {
          setLoggedIn(true);
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
            className="flex flex-row items-center justify-center google-login-btn"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}

export default Web3AuthLogout;
