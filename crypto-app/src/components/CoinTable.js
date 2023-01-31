import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import "./CoinTable.css";

const CoinTable = () => {
  const [coinsInfo, setCoinsInfo] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=80&page=1&sparkline=false"
      )
      .then((result) => {
        setCoinsInfo(result?.data);
      })
      .catch((error) => console.log(error));
  }, []);
  //  console.log("coinsss table: ", coinsInfo);
  // console.log("coin name: ", coinsInfo?.name);

  /*  if (!coinsInfo) {
    return null;
  } */
  return (
    <div className="coin-table-container">
      Top 20 crypto currency
      {coinsInfo.map((coinsInfo) => (
        <Link to={`/coins/${coinsInfo?.id}`} className="coin-linkitems">
          <div className="table__coins" key={coinsInfo?.id}>
            <div className="table__row">
              <div className="coin__ranking"> {coinsInfo?.market_cap_rank}</div>
              <img
                className="coin__image"
                src={coinsInfo?.image}
                alt={coinsInfo?.name ? coinsInfo?.name : "coin symbol"}
              ></img>
              <div className="coin__name"> {coinsInfo?.name} </div>
              <div className="coin__price"> ${coinsInfo?.current_price} </div>
              <div
                className={
                  coinsInfo?.price_change_24h >= 0 ? "greenday" : "redday"
                }
              >
                {coinsInfo?.price_change_24h}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CoinTable;
