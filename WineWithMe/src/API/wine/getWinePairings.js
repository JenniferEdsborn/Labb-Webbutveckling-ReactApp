import LRU from "lru-cache";

const cache = new LRU(50); // limit cache to 50 items


// Cachar wine-resultaten
async function getCached(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const response = await fetch(url);
  const data = await response.json();

  cache.set(url, data);
  return data;
}

// Hämtar winePairings om receptet har pairings redan
async function getWinePairings(wineName, count = 50) {
  const apiKey = import.meta.env.VITE_API;
  const baseUrl = "https://api.spoonacular.com/food/wine/recommendation";

  const searchParams = new URLSearchParams();
  searchParams.append("apiKey", apiKey);
  searchParams.append("wine", wineName);
  searchParams.append("number", count);

  const url = `${baseUrl}?${searchParams.toString()}`;
  return getCached(url);
}

// Hämtar winePairings kopplade till keywords i receptets titel och cuisine-parameter
async function getWinePairingForFood(food) {
  const apiKey = import.meta.env.VITE_API;
  const url = `https://api.spoonacular.com/food/wine/pairing?food=${food}&number=3&apiKey=${apiKey}`;
  return getCached(url);
}

  export { getWinePairings, getWinePairingForFood };