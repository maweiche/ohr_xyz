import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

interface PopupMessageProps {
  showModal: boolean;
  handleContinue: () => void;
  secondaryHandleClick?: () => void;
  buttonText: string;
  secondaryButtonText?: string;
  description: string;
  title: string;
  handleClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({
  handleContinue,
  showModal,
  buttonText,
  title,
  description,
  secondaryButtonText,
  secondaryHandleClick,
  handleClose,
}) => {
  let [isOpen, setIsOpen] = useState(showModal);

  function handleClick() {
    setIsOpen(false);
    handleContinue();
  }

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
          handleClose();
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
              <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
              <Dialog.Description className="mt-1">
                {description}
              </Dialog.Description>

              <div className="flex justify-end gap-2 mt-4">
                {secondaryButtonText && secondaryHandleClick && (
                  <button
                    onClick={() => {
                      secondaryHandleClick();
                      setIsOpen(false);
                    }}
                    className="border-1 rounded-md p-3 bg-[#774087] shadow-lg"
                  >
                    {secondaryButtonText}
                  </button>
                )}
                <button
                  onClick={handleClick}
                  className="rounded-md p-3 bg-[#61356e] shadow-lg"
                >
                  {buttonText}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
export default PopupMessage;
