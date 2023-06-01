import React, { useRef, useEffect } from "react";
import "./CurrentRecipe.css";
import getRecipe from "../../API/recipe/getRecipe";
import winebtn from "../../images/winebtn.png";
import backbtn from "../../images/backbtn.png";
import Wine from "../Wine/Wine";
import logga from "../../assets/Bilder/WW_logo.png";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { recipeSpecifics } from "../RecipeSpecifics/RecipeSpecifics";
import Loading from "../LoadingIcon/Loading";
import { useNavbarOpen } from "../../store/useNavbarOpen";
import defaultimg from "../../images/defaultimg.png"

export async function recipeLoader({ params }) {
  const recipe = await getRecipe(params.recipeId);
  return recipe;
}

export function CurrentRecipe() {
  const isNavbarOpen = useNavbarOpen((state) => state.open);
  const keepNavbarOpen = useNavbarOpen((state) => state.setOpen);
  const recipe = useLoaderData();
  const location = useLocation();
  const wineRecsRef = useRef(null);

  // Kollar om Navbar är öppen, stänger den isådanafall
  useEffect(() => {
    if (isNavbarOpen) {
      keepNavbarOpen(false);
    }
  });

  //Laddningsikon medan recept-objektet är tomt
  if (!recipe) {
    return <Loading />;
  }

  // Ser till att man alltid hamnar överst på sidan
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // De props som ska med till receptet
  const {
    image,
    title,
    servings,
    readyInMinutes,
    extendedIngredients,
    instructions,
  } = recipe;

  return (
    <>
      <Link to="/">
        <img className="currentRecipeLogga" src={logga} />
      </Link>
      <div className="currentRecipe">
        <Link to="/">
          <img className="backButton" src={backbtn} />
        </Link>
        <div className="currentRecipeImgContainer">
          <img className="currentRecipeImg" src={image ? image : defaultimg} />
          <h1 className="currentRecipeTitle">{title}</h1>
        </div>
        <div className="currentRecipeInfo">
          <div className="infoTextContainer">
            <div className="infoText">
              <p>{servings} servings</p>
              <p>{readyInMinutes} minutes</p>
            </div>
          </div>
          <div className="recipeSpecifics">{recipeSpecifics(recipe)}</div>
          <button
            className="scroll-down"
            onClick={() =>
              wineRecsRef.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            <img
              title="Wine Pairings"
              src={winebtn}
              alt="Small Image"
              className="smallImage"
            />
          </button>
        </div>
          <h2 className="headers">Ingredients</h2>
        <div className="currentRecipeSection">
          <ul className="Ingredients-list">
            {extendedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.original}</li>
            ))}
          </ul>
        </div>
        <div className="recipe-instructions">
          <h2 className="headers">Instructions</h2>
          <ol dangerouslySetInnerHTML={{ __html: instructions }}></ol>
        </div>
        <div className="" id="bottom" ref={wineRecsRef}>
          <h2 className="wineRecsTitle">Wine Recommendations</h2>
          <div className="wineList">
            <Wine recipe={recipe} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentRecipe;
