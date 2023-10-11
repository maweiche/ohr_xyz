import { ActiveAppDescription } from "./ActiveAppDescription";
import { PassiveAppDescription } from "./PassiveAppDescription";
import { useContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import SignUpModal from "./SignUpModal";
import { ProtocolOptions, SocialProtocol } from "@spling/social-protocol";
import { Keypair } from "@solana/web3.js";
import SplingContext from "context/SplingContext";
import { options } from "utils/constants";
interface LandingPageProps {
  isAppActive: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ isAppActive }) => {
  const SplingContextValue = useContext(SplingContext);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [socialProtocolValue, setSocialProtocolValue] =
    useState<SocialProtocol | null>(null);
  const wallet = useWallet();

  useEffect(() => {
    // init socialProtocol
    const initSocialProtocolWithUserWallet = async () => {
      const socialProtocol: SocialProtocol = await new SocialProtocol(
        Keypair.generate(),
        null,
        options
      ).init();

      console.log(socialProtocol);

      if (socialProtocol !== null) {
        SplingContextValue.updateSocialProtocol(socialProtocol);
      }
      setSocialProtocolValue(socialProtocol);
    };

    initSocialProtocolWithUserWallet();
  }, []);

  // useEffect(() => {
  //   // init socialProtocl
  //   const initSocialProtocolWithUserWallet = async () => {
  //     const socialProtocol: SocialProtocol = await new SocialProtocol(
  //       wallet,
  //       null,
  //       options
  //     ).init();

  //     console.log(socialProtocol);

  //     if (socialProtocol !== null) {
  //       SplingContextValue.updateSocialProtocol(socialProtocol);
  //     }
  //     setSocialProtocolValue(socialProtocol);
  //   };

  //   initSocialProtocolWithUserWallet();
  // }, [wallet]);

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
