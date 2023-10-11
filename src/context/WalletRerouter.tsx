import { useRouter } from "next/router";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const WalletRerouter = () => {
  const router = useRouter();
  const wallet = useWallet();

  useEffect(() => {
    // wallet.connected ? router.push("/record") : router.push("/home");
  }, [wallet.connected]);

  return <></>;
};

export default WalletRerouter;
