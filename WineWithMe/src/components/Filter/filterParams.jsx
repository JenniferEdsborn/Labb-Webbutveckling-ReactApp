
//Tar ut de parametrar användaren har kryssat i
export function extractSelectedParameters(
  selectedTypeFilters,
  selectedCuisineFilters,
  selectedAllergyFilters,
  selectedDietFilters
) {
  const type = createUrlString(getParameterNames(selectedTypeFilters));
  const cuisine = createUrlString(getParameterNames(selectedCuisineFilters));
  const intolerances = createUrlString(
    getParameterNames(selectedAllergyFilters)
  );
  const diet = createUrlString(getParameterNames(selectedDietFilters));
  
  //Returnerar en array med alla valda parametrar.
  return {
    ...(type !== null && type !== undefined && type !== '' && { type }),
    ...(cuisine !== null && cuisine !== undefined && cuisine !== '' && { cuisine }),
    ...(intolerances !== null && intolerances !== undefined && intolerances !== '' && { intolerances }),
    ...(diet !== null && diet !== undefined && diet !== '' && { diet })
  };
}
//Plockar ut namnen på filter valda till "true"
function getParameterNames(params) {
  const names = Object.entries(params)
    .filter(([key, value]) => value === true)
    .map(([key, value]) => key);
  return names;
}
//Gör en sammansatt sträng av namn-arrayen
function createUrlString(params) {
  const urlString = params.join(",").replace(/_/g, " ");
  return urlString;
}

export function getTypeFilters() {
  return typeFilters;
}
const typeFilters = {
  breakfast: false,
  lunch: false,
  main_course: false,
  side_dish: false,
  dessert: false,
  appetizer: false,
  salad: false,
  bread: false,
  soup: false,
  beverage: false,
  sauce: false,
  marinade: false,
  fingerfood: false,
  snack: false,
  drink: false,
};

export function getCuisineFilters() {
  return cuisineFilters;
}
const cuisineFilters = {
  african: false,
  american: false,
  british: false,
  cajun: false,
  caribbean: false,
  chinese: false,
  eastern_european: false,
  european: false,
  french: false,
  german: false,
  greek: false,
  indian: false,
  irish: false,
  italian: false,
  japanese: false,
  jewish: false,
  korean: false,
  latin_american: false,
  mediterranean: false,
  mexican: false,
  middle_eastern: false,
  nordic: false,
  southern: false,
  spanish: false,
  thai: false,
  vietnamese: false,
};

export function getAllergyFilters() {
  return allergyFilters;
}
const allergyFilters = {
  dairy: false,
  egg: false,
  gluten: false,
  grain: false,
  peanut: false,
  seafood: false,
  sesame: false,
  shellfish: false,
  soy: false,
  sulfite: false,
  tree_nut: false,
  wheat: false,
};

export function getDietFilters() {
  return dietFilters;
}
const dietFilters = {
  gluten_free: false,
  ketogenic: false,
  vegetarian: false,
  lacto_vegetarian: false,
  ovo_vegetarian: false,
  vegan: false,
  pescetarian: false,
  paleo: false,
  primal: false,
};
