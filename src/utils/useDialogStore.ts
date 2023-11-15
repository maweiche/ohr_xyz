import { create } from "zustand";

interface DialogStore {
  isAboutDialogShown: boolean;
  setIsAboutDialogShown: (isAboutDialogShown: boolean) => void;
  isAboutBtnDisabled: boolean;
  setIsAboutBtnDisabled: (isAboutBtnDisabled: boolean) => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  isAboutDialogShown: false,
  setIsAboutDialogShown: (isAboutDialogShown) =>
    set((state) => ({ ...state, isAboutDialogShown })),
  isAboutBtnDisabled: false,
  setIsAboutBtnDisabled: (isAboutBtnDisabled) =>
    set((state) => ({ ...state, isAboutBtnDisabled })),
}));

export default useDialogStore;
