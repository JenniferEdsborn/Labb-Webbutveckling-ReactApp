export async function getRecipe(recipeId) {
  const apiKey = import.meta.env.VITE_API;
  const baseUrl = "https://api.spoonacular.com/recipes/";
  let id;

  const searchParams = new URLSearchParams();

  searchParams.append("apiKey", apiKey);
  searchParams.append("stepsBreakdown", "true")

//hämtar ETT recept baserat på ID-parameter
  try {
    if (recipeId == null || recipeId == undefined) {
      throw new Error("No ID provided.");
    } else {
      id = `${recipeId}/information`;
    }

    const response = await fetch(`${baseUrl}${id}?${searchParams}`);

    if (response.ok) {
      const results = await response.json();
      return results;
    } else {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getRecipe