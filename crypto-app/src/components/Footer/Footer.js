import React from "react";
import "./Footer.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer__coingecko">Data provided by CoinGecko</div>
      <div className="footer-link--wrapper">
        <div className="footer-link__item">
          <a href="https://www.linkedin.com/">LinkedIn</a>
        </div>
        <div className="footer-link__item">
          <a href="https://www.coingecko.com/en/api">CoinGecko API</a>
        </div>
        <div className="footer-link__item">
          <a href="https://www.github.com/">GitHub</a>
        </div>
      </div>
      <div className="footer__icons">
        <a href="https://www.linkedin.com/" className="icon__link">
          <LinkedInIcon />
        </a>

        <a href="https://www.github.com/" className="icon__link">
          <GitHubIcon />
        </a>
      </div>
    </div>
  );
};

export default Footer;
