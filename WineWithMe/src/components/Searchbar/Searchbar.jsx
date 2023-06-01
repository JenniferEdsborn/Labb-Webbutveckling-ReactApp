import "./Searchbar.css";
import clear from "../../images/clear.png";
import search from "../../images/searchbtn.png";
import { useState } from "react";

export function Searchbar(props) {
  const [placeholder, setPlaceholder] = useState('Search for a recipe');
  const [value, setValue] = useState('');

  function handleFocus(){
    setPlaceholder('');
  }

  function handleBlur(){
    if (value === ''){
      setPlaceholder('Search for a recipe');
    }
  }

  const handleChange = (e) => {
    props.setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchRecipes();
    props.clearActiveFilterButton();
    if (props.setIsOpen){
      props.setIsOpen(false)
    };
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSubmit} className="search-container">
        <input
          onChange={handleChange}
          className="inputbar"
          type="text"
          name="inputSearchBar"
          placeholder={placeholder}
          value={props.query}
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button className="searchbutton" type="submit">
          <img src={search} alt="search-icon" width={25} height={25}></img>
        </button>
      </form>
      <button className="clearbutton" onClick={props.clearFilters}>
        <img src={clear} alt="Clear Button" width={30} height={30} />
      </button>
    </div>
  );
}

export default Searchbar;