import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { NFTattributes } from "../../utils/nftUtils";
import { useCopyToClipboard } from "react-use";
import Image from "next/legacy/image";
import ShareTweetBtn from "./ShareTweetBtn";
import SharePostModal from "@components/feed/SharePostModal";
import TipCreatorModal from "@components/feed/TipCreatorModal";
import { SoundWave } from "@components/feed/SoundWave";

export interface AudioNFT {
  [x: string]: any;
  attributesObj: any;
  owner: string;
  metadata: AudioNFT | undefined;
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
  ownerAddress: string;
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
  const [showTipModal, setShowTipModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  setTimeout(() => setIsCopied(false), 3000);
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-1"
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
                  <p className="text-center secondary-font text-4xl">{`"${audioNFT.attributesObj.Vibe}"`}</p>
                  <p className="mt-1 text-white text-sm">
                    {" "}
                    {audioNFT.attributesObj.Date}
                  </p>
                </Dialog.Title>

                <div className="mt-2 px-6 justify-center flex flex-row gap-5">
                  <button
                    onClick={() => setShowTipModal(true)}
                    className="m-0 p-0 flex justify-center align-center items-center"
                  >
                    <Image src={"/tip.png"} alt="Tip" width={20} height={18} />
                  </button>

                  <button
                    onClick={() => setShowShareModal(true)}
                    className="m-0 p-0 flex justify-center align-center items-center"
                  >
                    {" "}
                    <Image
                      src={"/share.png"}
                      alt="Share"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>

                <div className="pr-10 m-5">
                  <SoundWave audioUrl={audioNFT.animationUrl} />
                </div>

                {showTipModal && (
                  <div className="fixed inset-0 overflow-y-auto z-10 justify-center items-center">
                    <TipCreatorModal
                      showModal={showTipModal}
                      owner={audioNFT.owner}
                      mintAddress={audioNFT.assetId!}
                      setShowModal={setShowTipModal}
                      long={audioNFT.attributesObj.Long}
                      lat={audioNFT.attributesObj.Lat}
                      id={audioNFT.assetId!}
                      vibe={audioNFT.attributesObj.Vibe}
                    />
                  </div>
                )}
                {showShareModal && (
                  <div className="fixed inset-0 overflow-y-auto z-10 justify-center items-center">
                    <SharePostModal
                      showModal={showShareModal}
                      setShowModal={setShowShareModal}
                      longitude={audioNFT.attributesObj.Long}
                      latitude={audioNFT.attributesObj.Lat}
                      id={audioNFT.assetId!}
                    />
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>{" "}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NFTModal;
