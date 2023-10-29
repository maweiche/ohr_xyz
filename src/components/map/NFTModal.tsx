import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { NFTattributes } from "utils/nftUtils";
import { useCopyToClipboard } from "react-use";

export interface AudioNFT {
  animationUrl: string;
  attributes: NFTattributes;
  description: string;
  externalUrl: string;
  id: number;
  image: string;
  mintAddress: string;
  name: string;
  projectId: number;
  status: string;
  symbol: string;
}

interface NFTModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  audioNFT: AudioNFT;
}

const getFormattedMintAddress = (mintAddress: string) => {
  const mintAddressLength = mintAddress.length;
  const startMintAddress = mintAddress.substring(0, 4);
  const endMintAddress = mintAddress.substring(
    mintAddressLength - 4,
    mintAddressLength
  );
  return startMintAddress + "..." + endMintAddress;
};

const NFTModal: React.FC<NFTModalProps> = ({
  showModal,
  setShowModal,
  audioNFT,
}) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  setTimeout(() => setIsCopied(false), 3000);
  return (
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
                  className="text-lg py-2 px-6 font-semibold leading-6 border-b text-center flex justify-between text-[#64ed14]"
                >
                  <p className="txt-secondary ">{audioNFT.name}</p>
                  <p>{`"${audioNFT.attributes.Vibe}"`}</p>
                  <p>{audioNFT.symbol}</p>
                </Dialog.Title>

                <div className="mt-2 px-6">
                  <p className="text-center text-xs">
                    {audioNFT.attributes.Date}
                  </p>
                </div>

                <div className="flex justify-center self-center mt-3">
                  <audio controls>
                    <source src={audioNFT.animationUrl} type="audio/mp4" />
                    Your browser does not support the audio element.
                  </audio>
                </div>

                <div className="mt-2 w-full flex justify-center align-center items-center">
                  <img
                    src={audioNFT.image}
                    alt="AudioNFT image"
                    width={250}
                    className="rounded-xl"
                  />
                </div>

                <div className="flex justify-center w-full px-2">
                  <button
                    className="gap-2 border-2 m-3 p-2 px-4 flex justify-center rounded-xl"
                    onClick={() => {
                      copyToClipboard(audioNFT.mintAddress);
                      setIsCopied(true);
                    }}
                  >
                    <p className="text-sm ">
                      {isCopied ? "Copied" : "Copy"} mint address:
                    </p>
                    <p className="text-sm ">
                      {getFormattedMintAddress(audioNFT.mintAddress)}
                    </p>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>{" "}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NFTModal;
