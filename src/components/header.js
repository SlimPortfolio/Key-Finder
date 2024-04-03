import "../styles/styles.css";
import WhiteLogo from "../images/SweetSpot-white.png";
import { Link } from "react-router-dom";
import React from "react";
export default function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <img src={WhiteLogo}></img>
      </div>
      <div className="header-right">
        <Link to="/Key-Finder" className="header-link">
          Home
        </Link>
        <Link to="/Key-Finder/app" className="header-link">
          Key Finder App
        </Link>
        <Link to="/Key-Finder/about" className="header-link">
          About
        </Link>
      </div>
    </div>
  );
}
