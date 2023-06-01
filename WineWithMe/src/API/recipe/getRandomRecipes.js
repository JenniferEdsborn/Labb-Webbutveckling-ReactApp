export async function getRandomRecipes() {
    const apiKey = import.meta.env.VITE_API;
    const baseUrl = "https://api.spoonacular.com/recipes/random";
  
    const searchParams = new URLSearchParams();
  
    searchParams.append("apiKey", apiKey);
    searchParams.append("number", 21); 
  
    
      const response = await fetch(`${baseUrl}?${searchParams}`);
      if (response.ok) {
        const results = await response.json();
        console.log(results)
        return results;
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

  }
  export default getRandomRecipes;
  