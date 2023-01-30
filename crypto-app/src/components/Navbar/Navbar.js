import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserContext } from "../../ContextUser";

const Navbar = () => {
  //Context
  const { readData, setReadData, userdata, setUserdata, logged, setLogged } =
    useContext(UserContext);
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">
        CoinHouse
      </Link>
      <div className="navbar-link--wrapper">
        <Link to="/" className="navbar-link">
          coins
        </Link>
        <Link to="/portfolio" className="navbar-link">
          portfolio
        </Link>
        <Link to="/login" className="navbar-link">
          {!logged && <AccountCircleIcon></AccountCircleIcon>}
          {logged && <div>sign out</div>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
