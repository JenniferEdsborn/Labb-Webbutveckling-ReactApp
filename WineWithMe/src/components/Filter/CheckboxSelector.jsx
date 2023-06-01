import { useState } from "react";
import "./CheckboxSelector.css";

export function CheckboxSelector({ paramList, parentCallback }) {
  function handleCheckboxChange(key, value) {
    const updatedParamList = {
      ...paramList,
      [key]: !value,
    };
    parentCallback(updatedParamList);
  }
//Tar in en lista med booleans och skapar en checkbox-input för varje index i arrayen.
  return (
    <div className="typeFilters">
      {Object.entries(paramList).map(([key, value]) => (
        <div className="checkboxItem" key={key}>
          <input
            className="typeCheckbox"
            type="checkbox"
            id={key}
            checked={value}
            onChange={() => handleCheckboxChange(key, value)}
          />
          <label className="checkboxLabel" htmlFor={key}>
            {key.replace(/_/g, " ")}
          </label>
        </div>
      ))}
    </div>
  );
}
