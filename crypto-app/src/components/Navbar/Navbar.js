import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      Navbar
      <div className="navbar-container">
        <Link to="/" className="navbar-link">
          crypto tracker
        </Link>
        <Link to="/" className="navbar-link">
          coins
        </Link>
        <Link to="/portfolio" className="navbar-link">
          portfolio
        </Link>
        <Link to="/login" className="navbar-link">
          log in
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
