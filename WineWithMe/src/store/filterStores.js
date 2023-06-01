import { create } from "zustand";
import { getAllergyFilters, getCuisineFilters, getDietFilters, getTypeFilters } from "../components/Filter/filterParams";

export const useTypeStore = create((set) => ({
  types: getTypeFilters(),
  setTypes: (type) => set({ types: type }),
}));
export const useCuisineStore = create((set) => ({
  cuisines: getCuisineFilters(),
  setCuisines: (cuisine) => set({ cuisines: cuisine }),
}));
export const useAllergyStore = create((set) => ({
  allergies: getAllergyFilters(),
  setAllergies: (allergy) => set({ allergies: allergy }),
}));
export const useDietStore = create((set) => ({
  diets: getDietFilters(),
  setDiets: (diet) => set({ diets: diet }),
}));
