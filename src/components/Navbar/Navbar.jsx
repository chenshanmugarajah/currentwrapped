import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const toggleMenu = () => {
    let linksElement = document.getElementById("links");
    if (linksElement.style.display === "flex") {
      linksElement.style.display = "none";
    } else {
      linksElement.style.display = "flex";
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <h3>CurrentWrapped</h3>
      </div>
      <div className="right">
        <button id="menuToggle" onClick={toggleMenu}>
          X
        </button>
        <div id="links">
          <Link className="link" to="/aboutus">
            About us
          </Link>
          <Link className="link" to="/datausage">
            Data
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
