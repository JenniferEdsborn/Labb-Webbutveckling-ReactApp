import "./FilterMenuMobile.css";
import { useState } from "react";
import { CheckboxSelector } from "../Filter/CheckboxSelector";
import backbtn from "../../assets/Bilder/backbtn2.png";
import {
  useTypeStore,
  useCuisineStore,
  useAllergyStore,
  useDietStore,
} from "../../store/filterStores.js";
import { WinePairer } from "../WinePairer/WinePairer.jsx";
import { useNavbarOpen } from "../../store/useNavbarOpen";
import clear from "../../images/clear.png";
import closebtn from "../../images/closebtn.png";
import { useEffect } from "react";

function FilterMenuMobile({ clearFilters, fetchRecipes }) {
  const isOpen = useNavbarOpen((state) => state.open);
  const setIsOpen = useNavbarOpen((state) => state.setOpen);

  const [openType, setOpenType] = useState(false);
  const [openCuisine, setOpenCuisine] = useState(false);
  const [openAllergy, setOpenAllergy] = useState(false);
  const [openDiet, setOpenDiet] = useState(false);
  const [openWine, setOpenWine] = useState(false);

  //Menyn stängs när man går från mobil till desktop
  useEffect(() => {
    setOpenWine(false);
    setArrowRotationWine(false);
  }, [isOpen]);
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 480;
      if (!isMobile) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //knappar som öppnar menyerna samt roterar pilarna
  const toggleOpenType = () => {
    setOpenType(!openType);
    setArrowRotationType(!arrowRotationType);
  };
  const toggleOpenCuisine = () => {
    setOpenCuisine(!openCuisine);
    setArrowRotationCuisine(!arrowRotationCuisine);
  };
  const toggleOpenAllergy = () => {
    setOpenAllergy(!openAllergy);
    setArrowRotationAllergies(!arrowRotationAllergies);
  };
  const toggleOpenDiet = () => {
    setOpenDiet(!openDiet);
    setArrowRotationDiet(!arrowRotationDiet);
  };
  const toggleOpenWine = () => {
    setOpenWine(!openWine);
    setArrowRotationWine(!arrowRotationWine);
  };

  //Stores för att hantera menyerna
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

  const [arrowRotationType, setArrowRotationType] = useState(false);
  const [arrowRotationCuisine, setArrowRotationCuisine] = useState(false);
  const [arrowRotationAllergies, setArrowRotationAllergies] = useState(false);
  const [arrowRotationDiet, setArrowRotationDiet] = useState(false);
  const [arrowRotationWine, setArrowRotationWine] = useState(false);

  //Visar filtreringen som är selecterad
  return (
    <div className="container-filter">
      <div className="filter-group">
        {/* Filter-knappen */}
        <div className="type-filter">
          <button className="type-btn-filter" onClick={toggleOpenType}>
            <h3 className="Filter-titles">Type</h3>
            <img
              src={backbtn}
              className={`arrow-btn ${arrowRotationType ? "rotate-180" : ""}`}
              alt="Arrow button"
            />
          </button>
          {/* Öppnas efter att OpenType-knappen trycks på */}
          {openType && (
            <CheckboxSelector
              className="checkbox-content"
              key={"type"}
              parentCallback={setSelectedTypeFilters}
              paramList={selectedTypeFilters}
            />
          )}
        </div>
        {/* Cuiseine-knappen */}
        <div className="cuisine-filter">
          <button className="type-btn-filter" onClick={toggleOpenCuisine}>
            <h3 className="Filter-titles">Cuisine</h3>
            <img
              src={backbtn}
              className={`arrow-btn ${
                arrowRotationCuisine ? "rotate-180" : ""
              }`}
            />
          </button>
          {/* Öppnas efter att OpenCuisine-knappen trycks på */}
          {openCuisine && (
            <CheckboxSelector
              key={"cuisine"}
              parentCallback={setSelectedCuisineFilters}
              paramList={selectedCuisineFilters}
            />
          )}
        </div>
        {/* Allergy-knappen */}
        <div className="allergy-filter">
          <button className="type-btn-filter" onClick={toggleOpenAllergy}>
            <h3 className="Filter-titles">Allergy</h3>
            <img
              src={backbtn}
              className={`arrow-btn ${
                arrowRotationAllergies ? "rotate-180" : ""
              }`}
            />
          </button>
          {/* Öppnas efter att Openallergy-knappen selecteras */}
          {openAllergy && (
            <CheckboxSelector
              key={"allergies"}
              parentCallback={setSelectedAllergyFilters}
              paramList={selectedAllergyFilters}
            />
          )}
        </div>
        {/* Diet-knappen */}
        <div className="diet-filter">
          <button className="type-btn-filter" onClick={toggleOpenDiet}>
            <h3 className="Filter-titles">Diet</h3>
            <img
              src={backbtn}
              className={`arrow-btn ${arrowRotationDiet ? "rotate-180" : ""}`}
            />
          </button>
          {/* Öppnas efter att Diet-knappen selecteras */}
          {openDiet && (
            <CheckboxSelector
              key={"diet"}
              parentCallback={setSelectedDietFilters}
              paramList={selectedDietFilters}
            />
          )}
        </div>
        <div className="wine-filter">
          <button className="type-btn-filter" onClick={toggleOpenWine}>
            <h3 className="Filter-titles">Wine Pairing</h3>
            <img
              src={backbtn}
              className={`arrow-btn ${arrowRotationWine ? "rotate-180" : ""}`}
            />
          </button>
          {/* Öppnas efter att OpenWine-knappen selecteras */}
          {openWine && (
            <WinePairer
              key={"wine"}
              clearFilters={clearFilters}
              fetchRecipes={fetchRecipes}
            />
          )}
        </div>
      </div>

      {/* Knappar för clear och exit */}
      <div className="filter-group right-group">
        <div className="additional-filter">
          <button className="clearButton" onClick={clearFilters}>
            <img src={clear} />
          </button>
        </div>
        <div className="additional-filter exit">
          <button className="exitButton" onClick={() => setIsOpen(false)}>
            <img src={closebtn} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default FilterMenuMobile;
