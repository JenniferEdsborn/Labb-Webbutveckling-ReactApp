import React, { useState, useEffect } from "react";
import {getWinePairings, getWinePairingForFood} from "../../API/wine/getWinePairings";
import "./Wine.css";
import star from "../../images/star.png"
import WinePopup from "./WinePopup"
import Loading from "../LoadingIcon/Loading"

function Wine({ recipe }) {
  const { winePairing = {}, productMatches, title, cuisines } = recipe;
  const [wineRecommendations, setWineRecommendations] = useState([]);
  const [wineText, setWineText ] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedWine, setSelectedWine] = useState(null);

  // Trigga popup
  function handleCardClick(wine) {
    setSelectedWine(wine);
    setShowPopup(true);
  }

  // När popup stängs
  function closePopup() {
    setShowPopup(false);
    setSelectedWine(null);
  }

  // Hämtar vinrekommendationer
  useEffect(() => {
    async function fetchWineRecommendations() {
      try {
        let winePairingData = winePairing.pairedWines || [];
        setWineText(winePairing.pairingText);
  
        if (!winePairingData.length) {
          const keyword = extractKeywords(title, cuisines);
          const pairedWines = [];
          
          if (keyword.includes("pasta")){
            console.log("The keyword contains pasta")
            console.log(keyword)
            let index = keyword.indexOf("pasta");
            keyword.splice(index)
            console.log("Deleted pasta?")
            console.log(keyword)
          }

          if (keyword.length === 0){ // worst case scenario, hårdkoda keywords
            keyword.push("cake", "salad");
            setWineText("");
          }

          for (const food of keyword) {
            const winePairingData = await getWinePairingForFood(food);
            console.log(`Wine pairing data for ${food}:`, winePairingData);
            pairedWines.push(...winePairingData.pairedWines);
            setWineText(winePairingData.pairingText)
          }

          winePairingData = pairedWines.filter((wineType, index) => {
            return pairedWines.indexOf(wineType) === index;
          });
        }
  
        const promises = winePairingData.map((wine) =>
          getWinePairings(wine.toLowerCase(), 50)
        );
        
        const wineRecommendationsArray = await Promise.all(promises);
        const mergedArray = wineRecommendationsArray.flatMap(
          (wineObj) => wineObj.recommendedWines
        );
        
        // randomiserar vilka viner som ska visas
        const getRandomWines = (wines, count) => {
          const result = [];
          for (let i = 0; i < count; i++) {
            if (wines.length === 0) break;
            const randomIndex = Math.floor(Math.random() * wines.length);
            result.push(wines[randomIndex]);
            wines.splice(randomIndex, 1);
          }
          return result;
        };

        const newRecommendations =
          productMatches && productMatches.length > 0
            ? [...productMatches, ...getRandomWines(mergedArray, 3)]
            : getRandomWines(mergedArray, 3);

        setWineRecommendations(newRecommendations.filter((wine) => wine.title));
      } catch (error) {
        console.error(error);
      }
    }
    fetchWineRecommendations();
  }, [recipe]);

  // Matchar vinrekommendationer utifrån keywords i receptets titel och cuisine
  function extractKeywords(title, cuisines) {
    const foodKeywords = [
      "beef",
      "chicken",
      "pork",
      "lamb",
      "fish",
      "salmon",
      "tuna",
      "cod",
      "halibut",
      "shrimp",
      "lobster",
      "crab",
      "scallops",
      "mussels",
      "clams",
      "oysters",
      "vegetarian",
      "vegan",
      "pasta",
      "pizza",
      "spicy",
      "curry",
      "thai",
      "indian",
      "mexican",
      "chinese",
      "japanese",
      "korean",
      "sushi",
      "steak",
      "grilled",
      "barbecue",
      "smoked",
      "braised",
      "fried",
      "american",
      "italian",
      "mexican",
      "chinese",
      "japanese",
      "korean",
      "thai",
      "indian",
      "greek",
      "mediterranean",
      "french",
      "spanish",
      "middle eastern",
      "cake",
      "crab",
      "salad"
    ];
  
    const titleLowerCase = title.toLowerCase();
    const relevantKeywords = foodKeywords.filter((keyword) =>
      titleLowerCase.includes(keyword)
    );

    cuisines.forEach((cuisine) => {
      const cuisineKeywords = cuisine.toLowerCase().split(" ");
      cuisineKeywords.forEach((keyword) => {
        if (!relevantKeywords.includes(keyword)) {
          relevantKeywords.push(keyword);
        }
      });
    });

    return relevantKeywords;
  }

  return (
    <div className="wineList">
      {wineRecommendations.length === 0 ? (
        <Loading />
      ) : (
        wineRecommendations.map((wine) => {
          const title =
            wine.title.length > 16 ? wine.title.slice(0, 14) + "..." : wine.title;
          return (
            <div key={wine.id} className="card" onClick={(e) => handleCardClick(wine)}>
              <div className="main-content">
                <div className="text">
                  <h2 className="title">{title}</h2>
                </div>
                <img src={wine.imageUrl} alt={wine.title} />
              </div>
              <div className="stats">
                <span className="rating">
                  {Math.floor(wine.averageRating * 10 / 2) * 2} / 10
                  <img src={star} alt="star" />
                </span>
                <span className="price">${parseFloat(wine.price.replace('$', '')).toFixed(2)}</span>
              </div>
            </div>
          );
        })
      )}
      {showPopup && <WinePopup wine={selectedWine} onClose={closePopup} />}
    </div>
  );
}

export default Wine;