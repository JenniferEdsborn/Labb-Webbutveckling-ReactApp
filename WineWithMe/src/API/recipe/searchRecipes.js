import NoRecipeMsg from "../../components/NoRecipe/NoRecipeMsg";

//Gör en receptsökning mot databasen med utvalda filterparametrar.
export async function searchRecipes(query, filters, offset = 0) {
  const apiKey = import.meta.env.VITE_API;
  const baseUrl = "https://api.spoonacular.com/recipes/complexSearch";

  const searchParams = new URLSearchParams();

  searchParams.append("apiKey", apiKey);
  searchParams.append("number", 21); //

  if (filters.offset) {
    searchParams.append("offset", filters.offset);
  }

  try {
    if (!query && (!filters || Object.keys(filters).length === 0)) {
      throw new Error("You need to search for something.");
    }
    if (query) {
      searchParams.append("query", query);
    }
    if (filters && Object.keys(filters).length > 0) {
      Object.keys(filters).forEach((key) => {
        searchParams.append(key, filters[key]);
      });
    }

    const response = await fetch(`${baseUrl}?${searchParams}`);
    if (response.ok) {
      const results = await response.json();
      // if (results.totalResults < 1) {
      //   console.log("No results from search");

      //   return NoRecipeMsg;
      // }
      return results;
    } else {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export default searchRecipes;
