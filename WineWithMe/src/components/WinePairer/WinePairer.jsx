import { useEffect, useState } from "react";
import "./WinePairer.css";
import getWineList from "./wineList";
import WineSelector from "./WineSelector";
import { useRecipeStore } from "../../store/store.js";

//Söka och välja vin i listan
export function WinePairer({ clearFilters, fetchRecipes }) {
  const [wineInput, setWineInput] = useState("");
  const [selectedWine, setSelectedWine] = useState(null);
  const query = useRecipeStore((state) => state.query);
  const setQuery = useRecipeStore((state) => state.setQuery);
  const wineList = getWineList();

  //Söker  recept med 'query' så fort den uppdateras, OM vi har valt ett vin.
  useEffect(() => {
    if (selectedWine) {
      fetchRecipes(0);      
    }
  }, [query]);

  //Ändrar wineinput-state till det som skrivs i sökrutan.
  function handleChange(event) {
    setWineInput(event.target.value.toLowerCase());
  }

/*En komponent som matchar sökning från wine-input, 
och skapar en knapp för varje vin som matchar*/
  function renderWineList() {
    return (
      <>
        <h2>Enter the type of your wine.</h2>
        <p>Some examples are Riesling, Chardonnay or Merlot</p>
        <form className="winePairingForm">
          <input
            onChange={handleChange}
            className="winePairingInput"
            type="text"
            placeholder="Enter the type of your wine."
          ></input>
        </form>
        <ul className="winePairerList">
          {wineList
            .filter(
              (wine) =>
                wine.toLowerCase().includes(wineInput) && wineInput.length > 1
            )
            .map((wine) => (
              <WineSelector
                key={wine}
                wine={wine}
                parentCallback={setSelectedWine}
              />
            ))}
        </ul>
      </>
    );
  }
  /*OM vinet man har inte matchar med ett recept så får man ett felmeddelande.*/
  function renderSelectedWine() {
    if (selectedWine.status === "failure") {
      return (
        <>
          <h2>Sorry!</h2>
          <p>{selectedWine.message.replace(/_/g, " ")}.</p>
        </>
      );
    }
/*Tömmer alla filter och sätter sökord till matchningen för vinet.*/
    const wineClickHandler = (winePairing) => {
      clearFilters();
      setQuery(winePairing);
    };

    /*Går igenom API-svaret och gör en knapp för varje matchning med tillhörande info. */
    return (
      <>
        <h1 className="wineHeader">{selectedWine.wine.replace(/_/g, " ")}</h1>  
        <p>{selectedWine.text}</p>
        <div>
          {selectedWine.pairings.map((winePairing) => (
            <button
              className="btn_wineSelect"
              key={winePairing}
              onClick={() => wineClickHandler(winePairing)}
            >
              {winePairing}
            </button>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="winePairer">
        {selectedWine ? renderSelectedWine() : renderWineList()}
      </div>
    </>
  );
}
export default WinePairer;
