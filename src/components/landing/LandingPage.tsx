import { ActiveAppDescription } from "./ActiveAppDescription";
import { PassiveAppDescription } from "./PassiveAppDescription";
import { useState } from "react";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import SignUpModal from "./SignUpModal";
import { Keypair } from "@solana/web3.js";
interface LandingPageProps {
  isAppActive: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ isAppActive }) => {
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);

  const wallet = useWallet();

  return (
    <div className="h-full">
      <SignUpModal
        showModal={showSignUpModal}
        setShowModal={setShowSignUpModal}
      />
      <div className="z-10 text-center flex flex-col h-full">
        <h1 className="text-5xl">
          {isAppActive ? "CATCH YOUR MOMENT" : "WE'RE GRINDING"}
        </h1>
        <div className="mt-2">
          {isAppActive ? (
            <ActiveAppDescription
              setShowSignUpModal={setShowSignUpModal}
              wallet={wallet}
            />
          ) : (
            <PassiveAppDescription />
          )}
        </div>
      </div>
    </div>
  );
};
