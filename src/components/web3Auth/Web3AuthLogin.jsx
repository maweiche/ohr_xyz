import "./web3.module.css";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { CgGoogle, CgArrowRight } from "react-icons/cg";
import { useEffect, useState } from "react";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import RPC from "./solanaRPC";

function Web3AuthLogin() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;

  function uiConsole(...args) {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

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
            uxMode: "redirect",
            // redircectUrl should be the same as the current page
            redirectUrl: window.location.href,
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        await web3auth.init();
        setProvider(web3auth.provider);
        const rpc = new RPC(web3auth.provider);
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
    <div className="flex flex-col gap-6 py-12">
      <div className="modal-header">
        <div className="header-text-container">
          <form
            className="email-form"
            onSubmit={(e) => {
              e.preventDefault();
              loginWithEmail(e.target[0].value);
            }}
          >
            <input type="email" placeholder="Login with Email" />
            <button type="submit" className="email-btn">
              <CgArrowRight className="email-icon" />
            </button>
          </form>
        </div>
      </div>
      <div className="login-container">
        <div className="social-login-option">
          <p className="social-login-text">Login with Social Accounts</p>
          <div className="web3auth-container">
            {!loggedIn && (
              <button
                onClick={login}
                className="w-full flex flex-row items-center justify-center"
              >
                <CgGoogle onClick={login} className="google-icon" />
                <p className="google-login-text">Sign in with Google</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Web3AuthLogin;
