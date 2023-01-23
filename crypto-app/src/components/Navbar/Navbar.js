import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">
        crypto tracker
      </Link>
      <div className="navbar-link--wrapper">
        <Link to="/" className="navbar-link">
          coins
        </Link>
        <Link to="/portfolio" className="navbar-link">
          portfolio
        </Link>
        <Link to="/login" className="navbar-link">
          log in
        </Link>
        <Link to="/about" className="navbar-link">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
