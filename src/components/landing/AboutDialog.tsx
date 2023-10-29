import { OhrLogo } from "@components/layout/footer/components/ohr-logo";
import { Twitter } from "@components/layout/footer/components/twitter";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

interface PopupMessageProps {
  showModal?: boolean;
  handleContinue?: () => void;
  handleClose?: () => void;
  setShowAboutDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showAboutDialog: boolean;
}

const AboutDialog: React.FC<PopupMessageProps> = ({
  setShowAboutDialog,
  showAboutDialog,
}) => {
  return (
    <Transition
      show={showAboutDialog}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/30"
        aria-hidden="true"
      >
        <Dialog
          open={showAboutDialog}
          onClose={() => {
            // setIsOpen(false);
            setShowAboutDialog(false);
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
            <div className="fixed inset-0 z-100 flex text-center w-screen items-center justify-center p-4">
              <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-[#5a1a52] text-[#FFD1EA] border-2 border-[#9D58B2] p-5 shadow-lg">
                <Dialog.Title className="text-lg font-bold">GM 👂</Dialog.Title>
                <Dialog.Description className="mt-1">
                  <p>We believe in the power of sound!</p>

                  <p className="my-2">
                    It grabs our attention instantly, triggers memories, makes
                    us feel deeply and activates our imagination.
                  </p>
                  <p className="my-2">
                    Join us on a sound journey to discover its untapped
                    potential:
                  </p>
                  <p className="font-bold">
                    {" "}
                    Mint your own audio memory and share it on the map 🗺️
                  </p>
                  <p className="my-2">lov3</p>
                  <div className="flex  justify-between">
                    <OhrLogo />
                    <Twitter />
                  </div>
                </Dialog.Description>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </div>
    </Transition>
  );
};
export default AboutDialog;
