import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction } from "react";

interface SuccessMessageProps {
  showSuccessModal: boolean;
  setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  showSuccessModal,
  setShowSuccessModal,
  onClick,
}) => {
  console.log("should show");
  return (
    <Transition appear show={showSuccessModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setShowSuccessModal(false)}
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
                  <p>Success message</p>
                </Dialog.Title>
                <div className="flex justify-center self-center mt-5">
                  <p>Successfull added location</p>
                </div>
                <button className="border-2 rounded-md p-2" onClick={onClick}>
                  NEXT
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SuccessMessage;
