import { create } from "zustand"

export const useNavbarOpen = create((set) => ({
    open: false,
    setOpen: (isOpen) => set({ open: isOpen }),
  }));