import { create } from "zustand"

export const nullSearchStore = create((set) => ({
    noMatchingRecipes: false,
    setNoMatchingRecipes: (value) => set({ noMatchingRecipes: value }),
  }));
