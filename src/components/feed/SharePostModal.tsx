/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ShareTweetBtn from "@components/map/ShareTweetBtn";
import { useCopyToClipboard } from "react-use";
import Image from "next/legacy/image";

interface SharePostModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  latitude?: string;
  longitude?: string;
  id: string;
}

const SharePostModal: React.FC<SharePostModalProps> = ({
  showModal,
  setShowModal,
  id,
  latitude,
  longitude,
}) => {
  console.log("mintAddress", id);
  console.log("latitude", latitude);
  console.log("longitude", longitude);
  const [isOpen, setIsOpen] = useState(showModal);
  const [state, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  setTimeout(() => setIsCopied(false), 3000);

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setShowModal(false);
        }}
        className="relative z-50"
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
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-[#5a1a52] text-[#FFD1EA] border-2 border-[#9D58B2] p-5 shadow-lg">
              <Dialog.Title className="text-lg font-bold text-center mb-3">
                Share øhr
              </Dialog.Title>
              <div className="flex gap-3">
                <div>
                  <button
                    className="gap-2 border border-gray-300 p-5 flex justify-center rounded-full flex-col"
                    onClick={() => {
                      copyToClipboard(
                        `https://ohr-app.xyz/map?id=${id}&latitude=${latitude}&longitude=${longitude}`
                      );
                      setIsCopied(true);
                    }}
                  >
                    <Image
                      src={"/link.png"}
                      alt="Link"
                      width={22}
                      height={22}
                    />
                  </button>
                  <p className="text-xs text-center  text-white mt-2">
                    {isCopied ? "Copied" : "Copy link"}
                  </p>
                </div>
                <ShareTweetBtn
                  link={`https://ohr-app.xyz/map?id=${id}&latitude=${latitude}&longitude=${longitude}`}
                />
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default SharePostModal;
