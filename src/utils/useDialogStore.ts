import { create } from "zustand";

interface DialogStore {
  isAboutDialogShown: boolean;
  setIsAboutDialogShown: (isAboutDialogShown: boolean) => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  isAboutDialogShown: false,
  setIsAboutDialogShown: (isAboutDialogShown) =>
    set((state) => ({ ...state, isAboutDialogShown })),
}));

export default useDialogStore;
