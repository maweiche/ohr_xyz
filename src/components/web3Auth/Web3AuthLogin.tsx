import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS, IAdapter, IProvider} from "@web3auth/base";
import { CgGoogle, CgArrowRight } from "react-icons/cg";
import { useEffect, useState } from "react";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import RPC from "./solanaRPC";

// type chainConfig = {
//   blockExplorer: string;
//   blockExplorerUrl: string;
//   chainId: string;
//   chainNamespace: string;
//   decimals: number;
//   displayName: string;
//   logo: string;
//   rpcTarget: string;
//   ticker: string;
//   tickerName: string;
// };

// type CommonJRPCProvider = {
//   chainConfig: chainConfig;
//   defaultConfig: {
//     chainConfig: chainConfig;
//     networks: {
//       0x3: chainConfig;
//     }
//   }
//   defaultState: {
//     chainId: string;
//   }
//   disabled: boolean;
//   initialConfig: {
//     chainConfig: chainConfig;
//   }
//   initalState?: {}
//   internalConfig: {
//     chainConfig: chainConfig;
//     networks: {
//       0x3: chainConfig;
//     }
//   }
//   internalState: {
//     chainId: string;
//   }
//   name: string;
//   networks: {
//     0x3: chainConfig;
//   }
//   events?: {}
//   _eventsCount: number;
//   _maxListeners?: number;
//   _providerEngineProxy?: {}
// };

// interface Web3AuthLoginProps {
//   cachedAdapter?: string;
//   commonJRPCProvider: string;
//   coreOptions: {
//     chainConfig: chainConfig;
//     clientId: string;
//     web3AuthNetwork: string;
//   }
//   plugins?: {};
//   status: string;
//   walletAdapter?: {
//     openlogin: OpenloginAdapter;
//   }
//   _events: {};
//   _eventsCount: number;
//   _maxListeners?: number;
//   connected: boolean;
//   provider: CommonJRPCProvider;
// }

function Web3AuthLogin() {
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal>();
  const [provider, setProvider] = useState<IProvider>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID!;

  function uiConsole(...args: string[] | object[]) {
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
    const web3authProvider: IProvider | null = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    if(!web3authProvider) {
      uiConsole("web3authProvider not initialized yet");
      return;
    }
    setProvider(web3authProvider);
  };

  const loginWithEmail = async (email: string) => {
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
    if(!web3authProvider) {
      uiConsole("web3authProvider not initialized yet");
      return;
    }
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

        console.log("web3auth", web3auth)

        setWeb3auth(web3auth);

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
        if(!web3auth.provider) {
          uiConsole("web3authProvider not initialized yet");
          return;
        }
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
              loginWithEmail(
                e.currentTarget.querySelector("input")?.value || ""
              );
            }}
          >
            <input type="email" placeholder="Login with Email"  />
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
