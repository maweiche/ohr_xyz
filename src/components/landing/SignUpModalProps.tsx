import { Dispatch, SetStateAction } from "react";

export interface SignUpModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  // useWallet: WalletContextState;
}
