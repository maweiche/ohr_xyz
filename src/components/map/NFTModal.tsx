import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { NFTattributes } from "utils/nftUtils";
import { useCopyToClipboard } from "react-use";
import Image from "next/image";

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
  setSharedNFTisShown: Dispatch<SetStateAction<boolean>>;
}

const NFTModal: React.FC<NFTModalProps> = ({
  showModal,
  setShowModal,
  audioNFT,
  setSharedNFTisShown,
}) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  setTimeout(() => setIsCopied(false), 3000);

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          setShowModal(false);
          setSharedNFTisShown(true);
        }}
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
              <Dialog.Panel className="w-full max-w-xl bg-[#5a1a52] border-2 border-[#9D58B2] transform overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="py-2 px-6 font-black flex flex-col justify-center align-center items-center text-[#64ed14]"
                >
                  <p className="text-center secondary-font text-4xl">{`"${audioNFT.attributes.Vibe}"`}</p>
                  <p className="mt-1 text-white text-sm">
                    {" "}
                    {audioNFT.attributes.Date} - {audioNFT.symbol}
                  </p>
                </Dialog.Title>

                <div className="mt-2 px-6">
                  <p className="text-center text-md "></p>
                </div>

                <div className="flex justify-center self-center mt-3">
                  <audio controls>
                    <source src={audioNFT.animationUrl} type="audio/mp4" />
                    Your browser does not support the audio element.
                  </audio>
                </div>

                <div className="mt-2 w-full flex justify-center align-center items-center">
                  <Image
                    src={audioNFT.image}
                    alt="AudioNFT image"
                    width={250}
                    height={250}
                    blurDataURL={"../../assets/ohr-general.png"}
                    className="rounded-xl"
                  />
                </div>

                <div className="flex justify-center w-full px-2">
                  <button
                    className="gap-2 border-2 m-3 p-2 px-4 flex justify-center rounded-xl"
                    onClick={() => {
                      copyToClipboard(
                        `https://ohr-xyz-git-development-noamru22.vercel.app/map?id=${audioNFT.id}`
                      );
                      setIsCopied(true);
                    }}
                  >
                    <p className="text-md text-white ">
                      {isCopied ? "Copied" : "Share this øhr"}
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
