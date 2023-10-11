import { Dispatch, SetStateAction } from "react";
import { WalletContextState } from "@solana/wallet-adapter-react";

interface ActiveAppDescriptionProps {
  setShowSignUpModal: Dispatch<SetStateAction<boolean>>;
  wallet: WalletContextState;
}

export const ActiveAppDescription: React.FC<ActiveAppDescriptionProps> = ({
  setShowSignUpModal,
  wallet,
}) => {
  return (
    <div className={"z-10 m-8 mt-15"}>
      <p className="text-md secondary-font mt-3">
        Join us on a social sound exploration.
      </p>
      <div className="m-6">
        <button
          className="btn-primary p-3 m-2"
          onClick={() => setShowSignUpModal(true)}
        >
          Create account
        </button>
        <button className="btn-primary p-4 m-2">Login</button>
      </div>
    </div>
  );
};
