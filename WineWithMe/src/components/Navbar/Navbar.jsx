import React, { useState } from "react";
import "./Navbar.css";
import Popup from "../Popup/Popup";
import FilterMenuMobile from "../FilterMenuMobile/FilterMenuMobile";
import backbtn from "../../images/backbtn.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useNavbarOpen } from "../../store/useNavbarOpen";
import Searchbar from "../Searchbar/Searchbar";
import { useRecipeStore } from "../../store/store.js";
import {
  useTypeStore,
  useCuisineStore,
  useAllergyStore,
  useDietStore,
} from "../../store/filterStores.js";
import {
  getTypeFilters,
  getCuisineFilters,
  getAllergyFilters,
  getDietFilters,
  extractSelectedParameters,
} from "../Filter/filterParams.jsx";
import { searchRecipes } from "../../API/recipe/searchRecipes.js";
import { nullSearchStore } from "../../store/nullSearchStore";

export default function Navbar() {
  const [activeButton, setActiveButton] = useState("");
  const isOpen = useNavbarOpen((state) => state.open);
  const setIsOpen = useNavbarOpen((state) => state.setOpen);
  const location = useLocation();
  const query = useRecipeStore((state) => state.query);
  const setQuery = useRecipeStore((state) => state.setQuery);

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
    } catch (error) {
      console.error(error);
    }
  };

  const setRecipes = useRecipeStore((state) => state.setRecipes);
  const selectedTypeFilters = useTypeStore((state) => state.types);
  const setSelectedTypeFilters = useTypeStore((state) => state.setTypes);
  const selectedCuisineFilters = useCuisineStore((state) => state.cuisines);
  const setSelectedCuisineFilters = useCuisineStore(
    (state) => state.setCuisines
  );
  const selectedAllergyFilters = useAllergyStore((state) => state.allergies);
  const setSelectedAllergyFilters = useAllergyStore(
    (state) => state.setAllergies
  );
  const selectedDietFilters = useDietStore((state) => state.diets);
  const setSelectedDietFilters = useDietStore((state) => state.setDiets);

  const handleClick = () => {
    if (!isOpen) setIsOpen(true);
  };

  const navigate = useNavigate();
  const routeIndex = () => navigate("/");

  return (
    <header className="header">
      <div className="container">
        <ul className="popupsNav">
          <li>
            <Popup type="inspiration"></Popup>
          </li>
          <li>
            <Popup type="about"></Popup>
          </li>
          <li>
            <Popup type="contact"></Popup>
          </li>
        </ul>
        <nav
          className={`navbar ${isOpen ? "open-hamburger" : "closed-hamburger"}`}
        >
          <FilterMenuMobile
            className="filter-menu-mobile"
            clearFilters={clearFilters}
            fetchRecipes={fetchRecipes}
          />
        </nav>
      </div>

      {location.pathname === "/" ? (
        <div className="mobileSearchbar" onClick={handleClick}>
          <Searchbar
            query={query}
            setQuery={setQuery}
            clearFilters={clearFilters}
            clearActiveFilterButton={clearActiveFilterButton}
            fetchRecipes={() => fetchRecipes(0, true)}
            setIsOpen={setIsOpen}
          />
        </div>
      ) : (
        <button
          aria-label="BackButton"
          onClick={routeIndex}
          className="back-button"
        >
          <img src={backbtn} alt="Back Button" />
        </button>
      )}
    </header>
  );
}
