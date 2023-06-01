import { create } from "zustand"

export const useRecipeStore = create((set) => ({
    recipes: null,
    setRecipes: (r) => set({ recipes: r }),

    query: "",
    setQuery: (query) => set({ query }),
  }));
