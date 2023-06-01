/*Tar in en parameter på ett vin, gör en sökning på API och
 får tillbaka förslag på maträtter som passar.*/

export async function getDishPairing(wine) {
    const apiKey = import.meta.env.VITE_API;
    const baseUrl = "https://api.spoonacular.com/food/wine/dishes";
  
    const searchParams = new URLSearchParams();
  
    searchParams.append("apiKey", apiKey);
  
    try {
      if (wine === null || wine === undefined) {
        throw new Error("No wine provided.");
      }
      searchParams.append("wine", wine);
  
      const response = await fetch(`${baseUrl}?${searchParams}`);
  
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
  
  export default getDishPairing