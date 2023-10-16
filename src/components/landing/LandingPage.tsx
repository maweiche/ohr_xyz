import { ActiveAppDescription } from "./ActiveAppDescription";
import { PassiveAppDescription } from "./PassiveAppDescription";
import { useState } from "react";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
// import { Visualisation } from "@components/create/minting/visualisation/Visualisation";
import { Visualisation } from "../../components/create/minting/visualisation/Visualisation";
interface LandingPageProps {
  isAppActive: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ isAppActive }) => {
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);

  const wallet = useWallet();

  return (
    <div className="h-full">
      <div className="z-10 text-center flex flex-col justify-center h-full">
        <div className="flex">
          <h1 className="text-5xl mt-5">
            {isAppActive ? "CATCH YOUR MOMENT" : "WE'RE GRINDING"}
          </h1>
        </div>

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
        <Visualisation />
      </div>
    </div>
  );
};
