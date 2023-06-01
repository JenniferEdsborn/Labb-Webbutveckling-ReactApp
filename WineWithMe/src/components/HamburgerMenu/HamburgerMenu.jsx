import React, { useState } from "react";
import "./HamburgerMenu.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // asdasdas
  return (
    <div>
      <ul className="HamburgerMenu">
        <li>About</li>
        <li>Contact</li>
        <li>Inspiration</li>
      </ul>
    </div>
  );
};

export default HamburgerMenu;
