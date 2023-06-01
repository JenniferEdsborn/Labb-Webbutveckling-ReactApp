import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CheckboxSelector } from "../Filter/CheckboxSelector.jsx";
import {
  getTypeFilters,
  getCuisineFilters,
  getAllergyFilters,
  getDietFilters,
  extractSelectedParameters,
} from "../Filter/filterParams.jsx";
import "./MainPage.css";
import { Searchbar } from "../Searchbar/Searchbar.jsx";
import { Card } from "../Card/Card.jsx";
import { searchRecipes } from "../../API/recipe/searchRecipes.js";
import getRandomRecipes from "../../API/recipe/getRandomRecipes.js";
import { useRecipeStore } from "../../store/store.js";
import {
  useTypeStore,
  useCuisineStore,
  useAllergyStore,
  useDietStore,
} from "../../store/filterStores.js";
import { useNavbarOpen } from "../../store/useNavbarOpen.js";
import WinePairer from "../WinePairer/WinePairer.jsx";
import defaultimg from "../../images/defaultimg.png";
import backbutton from "../../assets/Bilder/backbtn3.png";
import { nullSearchStore } from "../../store/nullSearchStore.js";

export default function MainPage() {
  const [activeButton, setActiveButton] = useState("");
  // other state variables...

  const location = useLocation();

  // Clear activeButton state when resizing from laptop to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setActiveButton("");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const [offset, setOffset] = useState(21);

  const isNavbarOpen = useNavbarOpen((state) => state.open);
  const keepNavbarOpen = useNavbarOpen((state) => state.setOpen);

  const query = useRecipeStore((state) => state.query);
  const setQuery = useRecipeStore((state) => state.setQuery);
  const recipes = useRecipeStore((state) => state.recipes);
  const setRecipes = useRecipeStore((state) => state.setRecipes);

  const selectedTypeFilters = useTypeStore((state) => state.types);
  const setSelectedTypeFilters = useTypeStore((state) => state.setTypes);
  const selectedCuisineFilters = useCuisineStore((state) => state.cuisines);
  const setSelectedCuisineFilters = useCuisineStore((state) => state.setCuisines);
  const selectedAllergyFilters = useAllergyStore((state) => state.allergies);
  const setSelectedAllergyFilters = useAllergyStore((state) => state.setAllergies);
  const selectedDietFilters = useDietStore((state) => state.diets);
  const setSelectedDietFilters = useDietStore((state) => state.setDiets);

  //En funktion för att tömma filter och recept
  function clearFilters() {
    setSelectedTypeFilters(getTypeFilters());
    setSelectedCuisineFilters(getCuisineFilters());
    setSelectedAllergyFilters(getAllergyFilters());
    setSelectedDietFilters(getDietFilters());
    setQuery("");
    setRecipes(null);
    nullSearchStore.setState({noMatchingRecipes: false});
    }

  function clearActiveFilterButton() {
    setActiveButton("");
  }

  // Ser till att man alltid hamnar överst på sidan
  useEffect(() => {
    if (location && location.pathname !== "/") {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Kallar random-recept
  const initialRandomRecipes = async () => {
    try {
      const data = await getRandomRecipes();
      nullSearchStore.setState({noMatchingRecipes: false});
      setRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Kallar på 21 random-recept om recipes är null
  useEffect(() => {
    if (recipes == null) {
      initialRandomRecipes();
    }
  }, []);

  // Hämtar recept från searchRecipes.js med de parametrar som user har gett
  const fetchRecipes = async (offset) => {
    try {
      const allSelectedFilters = extractSelectedParameters(
        selectedTypeFilters,
        selectedCuisineFilters,
        selectedAllergyFilters,
        selectedDietFilters
      );
      const data = await searchRecipes(query, {
        ...allSelectedFilters,
        offset,
      });
      data.recipes = data.results;
      delete data.results;
      if (offset === 0) {
        // Om vi gör en ny sökning, ersätt recept med de nya recepten
        window.scrollTo(0, 0);
        if (data.recipes.length === 0) {
          // Kollar om det finns matchande recept i query
          setRecipes(null);
          nullSearchStore.setState({noMatchingRecipes: true});
        } else {
          setRecipes(data);
          nullSearchStore.setState({noMatchingRecipes: false});
        }
      } else {
        // Om vi inte gör en ny sökning, lägg in the nya recepten under de existerande recepten
        const currentRecipes = recipes;
        setRecipes({
          ...data,
          recipes: [...currentRecipes.recipes, ...data.recipes],
        });
        setOffset((prevOffset) => prevOffset + data.recipes.length);
      }
      clearActiveFilterButton();

      if (isNavbarOpen) {
        keepNavbarOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //En funktion som renderar en checkbox-komponent beroende på vilken knapp du väljer.
  function showFilters() {
    if (activeButton === "type")
      return (
        <CheckboxSelector
          key={"type"}
          parentCallback={setSelectedTypeFilters}
          paramList={selectedTypeFilters}
        />
      );
    if (activeButton === "cuisine")
      return (
        <CheckboxSelector
          className="cuisineBox"
          key={"cuisine"}
          parentCallback={setSelectedCuisineFilters}
          paramList={selectedCuisineFilters}
        />
      );
    if (activeButton === "allergies")
      return (
        <CheckboxSelector
          key={"allergies"}
          parentCallback={setSelectedAllergyFilters}
          paramList={selectedAllergyFilters}
        />
      );
    if (activeButton === "diet")
      return (
        <CheckboxSelector
          key={"diet"}
          parentCallback={setSelectedDietFilters}
          paramList={selectedDietFilters}
        />
      );
    if (activeButton === "wine")
      return (
        <WinePairer
          key={"wine"}
          clearFilters={clearFilters}
          fetchRecipes={fetchRecipes}
        />
      );
  }

  // Skapar "Load More"-knappen
  function renderLoadMoreButton() {
    let isLoadMoreButtonDisabled = false;

    if (
      recipes &&
      recipes.recipes &&
      recipes.recipes.length >= recipes.totalResults
    ) {
      isLoadMoreButtonDisabled = true;
    }

    if (recipes === null) {
      isLoadMoreButtonDisabled = true;
    }

    const handleLoadMoreClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      fetchRecipes(offset);
    };

    return (
      <>
        <button
          onClick={handleLoadMoreClick}
          className={`loadMoreButton ${
            isLoadMoreButtonDisabled ? "disabled" : ""
          }`}
          disabled={isLoadMoreButtonDisabled}
        >
          <p>Load More</p>
        </button>
      </>
    );
  }

  //Kollar i recepies-arrayen och skapar ett receptkort för varje recept
  function renderRecipeCards() {
    if (recipes && recipes.recipes) {
      return (
        <>
          <section className="container-recipe">
            {recipes.recipes.map((recipe) => (
              <Card
                key={recipe.id}
                id={recipe.id}
                image={recipe.image ? recipe.image : defaultimg}
                text={recipe.title}
              />
            ))}
          </section>
        </>
      );
    }
  }

  //Startsida med logga, sökfält och knappar med olika funktionaliteter
  return (
    <>
      <div className="searchWrapper">
        <img className="mainLogo" />
        <div className="searchbarDesktop">
          <Searchbar
            query={query}
            setQuery={setQuery}
            clearFilters={clearFilters}
            clearActiveFilterButton={clearActiveFilterButton}
            fetchRecipes={() => fetchRecipes(0, {})}
          />
        </div>
        <nav className="filterButtons">
          <button
            className="btn_filter"
            onClick={() =>
              activeButton === "type"
                ? setActiveButton("")
                : setActiveButton("type")
            }
          >
            TYPE
            <img
              className={
                activeButton == "type" ? "filterArrow_Active" : "filterArrow"
              }
              src={backbutton}
            ></img>
          </button>
          <button
            className="btn_filter"
            onClick={() =>
              activeButton === "cuisine"
                ? setActiveButton("")
                : setActiveButton("cuisine")
            }
          >
            CUISINE
            <img
              className={
                activeButton === "cuisine"
                  ? "filterArrow_Active"
                  : "filterArrow"
              }
              src={backbutton}
            ></img>
          </button>
          <button
            className="btn_filter"
            onClick={() =>
              activeButton === "allergies"
                ? setActiveButton("")
                : setActiveButton("allergies")
            }
          >
            ALLERGIES
            <img
              className={
                activeButton === "allergies"
                  ? "filterArrow_Active"
                  : "filterArrow"
              }
              src={backbutton}
            ></img>
          </button>
          <button
            className="btn_filter"
            onClick={() =>
              activeButton === "diet"
                ? setActiveButton("")
                : setActiveButton("diet")
            }
          >
            DIET
            <img
              className={
                activeButton === "diet" ? "filterArrow_Active" : "filterArrow"
              }
              src={backbutton}
            ></img>
          </button>{" "}
          <button
            className="btn_filter"
            onClick={() =>
              activeButton === "wine"
                ? setActiveButton("")
                : setActiveButton("wine")
            }
          >
            WINE PAIRING
            <img
              className={
                activeButton === "wine" ? "filterArrow_Active" : "filterArrow"
              }
              src={backbutton}
            ></img>
          </button>
        </nav>
        {showFilters()}
      </div>
      {nullSearchStore((state) => state.noMatchingRecipes) && (
      <h2 className="noRecipesText">No recipes matched the search criteria</h2>
    )}
      {renderRecipeCards()}
      {renderLoadMoreButton()}
    </>
  );
}
