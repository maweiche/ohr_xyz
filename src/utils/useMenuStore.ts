import { create } from "zustand";

interface MenuStore {
  isMenuShown: boolean;
  setIsMenuShown: (isMenuShown: boolean) => void;
  isMenuDisabled: boolean;
  setIsMenuDisabled: (isMenuDisabled: boolean) => void;
}

const useMenuStore = create<MenuStore>((set) => ({
  isMenuShown: false,
  setIsMenuShown: (isMenuShown) => set((state) => ({ ...state, isMenuShown })),
  isMenuDisabled: false,
  setIsMenuDisabled: (isMenuDisabled) =>
    set((state) => ({ ...state, isMenuDisabled })),
}));

export default useMenuStore;
