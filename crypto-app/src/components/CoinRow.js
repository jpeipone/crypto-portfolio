import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CoinRow.css";

const CoinRow = () => {
  const [trending, setTrending] = useState([]);
  //'https://api.coingecko.com/api/v3/search/trending'
  useEffect(() => {
    const trendResults = axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((data) => {
        setTrending(data?.data.coins);
        console.log("specific: ", data?.data.coins);
      });
  }, []);

  console.log("trending: ", trending);

  return (
    <div className="coinRow-container">
      homepage
      {trending.map((trending) => (
        <div className="coins-row" key={trending.item.coin_id}>
          <img
            className="coins__image"
            src={trending.item.small}
            alt={trending.item.name ? trending.item.name : "coin symbol"}
          ></img>
          <div className="coins__name"> {trending.item.name} </div>
        </div>
      ))}
    </div>
  );
};

export default CoinRow;
