import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

const Table = () => {
  const [coinsInfo, setCoinsInfo] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
      )
      .then((result) => {
        setCoinsInfo(result?.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log("table: ", coinsInfo);

  return (
    <div className="table-container">
      <table>
        <tr>
          <th>ranking</th>
          <th>icon</th>
          <th>name</th>
          <th>price</th>
          <th>24/h</th>
        </tr>
        {coinsInfo.map((coinsInfo) => {
          return (
            <tr key={coinsInfo?.id}>
              <td>{coinsInfo?.market_cap_rank}</td>
              <td>
                {" "}
                <img
                  className="coin__image"
                  src={coinsInfo?.image}
                  alt={coinsInfo?.name ? coinsInfo?.name : "coin symbol"}
                ></img>
              </td>
              <td>{coinsInfo?.name}</td>
              <td>{coinsInfo?.current_price}$</td>
              <td
                className={
                  coinsInfo?.price_change_24h > 0 ? "greenday" : "redday"
                }
              >
                {coinsInfo?.price_change_24h}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
