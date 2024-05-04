import "../styles/styles.css";
import WhiteLogo from "../images/SweetSpot-white.png";
import { Link } from "react-router-dom";
import React from "react";
export default function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <img src={WhiteLogo} alt="sweetspot-logo-white"></img>
      </div>
      <div className="header-right">
        <Link to="/" className="header-link">
          Home
        </Link>
        <Link to="/app" className="header-link">
          Key Finder App
        </Link>
        <Link to="/about" className="header-link">
          About
        </Link>
      </div>
    </div>
  );
}
