import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CoinRow.css";

const CoinRow = () => {
  const [trending, setTrending] = useState([]);
  const [coinsMarket, setCoinsMarket] = useState([]);
  //'https://api.coingecko.com/api/v3/search/trending'
  useEffect(() => {
    const trendResults = axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((data) => {
        setTrending(data?.data.coins);
        //  console.log("specific: ", data?.data.coins);
      });
  }, []);

  console.log("trending: ", trending);

  const [coinsInfo, setCoinsInfo] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
      )
      .then((result) => {
        setCoinsInfo(result.data);
      })
      .catch((error) => console.log(error));
  }, []);
  // console.log("coinsss: ", coinsInfo);
  //console.log("coin name: ", coinsInfo[0]?.name);

  return (
    <div className="coinRow-container">
      {trending.map((trending) => (
        <div className="coins-row" key={trending.item.coin_id}>
          <img
            className="coins__image"
            src={trending.item.small}
            alt={trending.item.name ? trending.item.name : "coin symbol"}
          ></img>
          <div className="coins__name"> {trending.item.name} </div>
          <div className="coins__usd">{} </div>
        </div>
      ))}
    </div>
  );
};

export default CoinRow;
