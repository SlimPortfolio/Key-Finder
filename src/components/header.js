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
        <Link to="/" className="header-link">
          Home
        </Link>
        <Link to="/key-finder" className="header-link">
          Key Finder
        </Link>
        <Link to="/key-finder" className="header-link">
          Add User/Song
        </Link>
        <Link to="/search-bar" className="header-link">
          Vocal Range Test
        </Link>
      </div>
    </div>
  );
}
