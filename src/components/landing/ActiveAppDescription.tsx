import { Dispatch, SetStateAction, useEffect } from "react";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
interface ActiveAppDescriptionProps {
  setShowSignUpModal: Dispatch<SetStateAction<boolean>>;
  wallet: WalletContextState;
}

export const ActiveAppDescription: React.FC<ActiveAppDescriptionProps> = ({
  setShowSignUpModal,
  wallet,
}) => {
  const router = useRouter();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      router.push("/");
    }
  }, [publicKey, router]);

  return (
    <div className={"z-10 m-8 mt-15"}>
      <p className="text-md secondary-font mt-3">
        Join us on a social sound exploration.
      </p>
      <div className="m-6">
        <WalletMultiButton />
      </div>
    </div>
  );
};
