import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";

interface SignUpModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const { publicKey } = useWallet();
  console.log("publicKey: ", publicKey);

  const router = useRouter();

  useEffect(() => {
    if (publicKey) {
      setShowModal(false);
      router.push("/signup");
    }
  }, [publicKey, router, setShowModal]);

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setShowModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl border text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg py-4 px-6 font-semibold leading-6 border-b primaryBorder text-white"
                  >
                    Login with Solana Wallet
                  </Dialog.Title>
                  <div className="mt-4 px-6">
                    <p className="primaryTextColor">
                      You need a Solana wallet to use{" "}
                      <span className="txt-secondary text-[#64ed14]">øhr</span>.
                      Connect your wallet to continue.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center py-3 px-6 secondaryBg">
                    <WalletMultiButton />
                  </div>

                  <div className="mt-6 flex justify-end space-x-4 py-3 px-6 bg-gray-100">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full  border px-4 py-2 text-sm font-medium  focus:outline-none bg-red-500 text-white hover:bg-red-600"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignUpModal;
