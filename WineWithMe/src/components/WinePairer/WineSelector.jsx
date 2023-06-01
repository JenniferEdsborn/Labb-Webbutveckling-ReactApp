import getDishPairing from "../../API/wine/getDishPairingForWine";
import "./WinePairer.css";
export function WineSelector({ wine, parentCallback }) {

  //Anropar API för att hitta matchningar för det valda vinet.
  async function clickHandler() {
    const response = await getDishPairing(wine);
    const responseWithWine = {...response, wine};
    parentCallback(responseWithWine);
  }
/*Ett listelement med namn på vinet och en knapp för att välja vinet.*/
  return (
    <>
      <li className="wineListItem">
        {wine.replace(/_/g, " ")}
        <button className="btn_wineSelect" onClick={clickHandler}>
          Select
        </button>
      </li>
    </>
  );
}
export default WineSelector;
