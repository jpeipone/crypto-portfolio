import React, { useState, useEffect } from "react";
import axios from "axios";

const Homepage = () => {
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
    <div className="Homepage">
      homepage
      <div className="coins-name">
        {trending.map((trending) => (
          <div className="trending__row" key={trending.item.coin_id}>
            <div className="trending__name"> {trending.item.name} </div>
            <img
              className="trending__image"
              src={trending.item.small}
              alt={trending.item.name ? trending.item.name : "coin symbol"}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
