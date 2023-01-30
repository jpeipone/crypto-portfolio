import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Coin.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import moment from "moment";
import { UserContext } from "../ContextUser";
import Save from "../components/Database/Save";
import Delete from "../components/Database/Delete";
import Header from "../components/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  LineElement,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Coin = () => {
  const { id } = useParams();
  console.log({ id });
  const [coin, setCoin] = useState();
  const [portfolio, setPortfolio] = useState();
  const [priceHistory, setPriceHistory] = useState();
  const [idcrypto, setIdCrypto] = useState(id);
  const [message, setMessage] = useState();

  console.log("idcrypto is: ", idcrypto);

  //Context
  const { readData, setReadData, userdata, setUserdata } =
    useContext(UserContext);

  useEffect(() => {
    async function Data() {
      const resultCoin = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${idcrypto}?tickers=true&market_data=true`
      );

      setCoin(resultCoin.data);
    }
    Data();
  }, [idcrypto]);
  // console.log("coin/id info: ", coin);

  //historic price data usd
  // chart libray: https://react-chartjs-2.js.org/
  // https://momentjs.com/

  useEffect(() => {
    async function History() {
      const resultHistory = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${idcrypto}/market_chart?vs_currency=usd&days=730&interval=daily`
      );

      setPriceHistory(resultHistory.data);
    }
    History();
  }, [idcrypto]);
  console.log("coin price history: ", priceHistory);

  const onlyPrice = priceHistory?.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(3),
  }));

  const options = {
    responsivie: true,
  };

  //Multiaxis line chart
  const options3 = {
    responsive: true,

    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "logarithmic",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  //multiaxis data

  const dataMultiaxis = {
    labels: onlyPrice?.map((item) => moment(item.x).format("MMM DD")),
    datasets: [
      {
        label: coin?.name,
        data: onlyPrice?.map((price) => price.y),
        borderColor: "rgb(4, 10, 84)",
        backgroundColor: "rgba(4, 10, 84, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Portfolio value usd",
        data: onlyPrice?.map((price) => price.y * portfolio),
        borderColor: "rgb(58, 135, 7)",
        backgroundColor: "rgba(58, 135, 7, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  // console.log("x and y", onlyPrice);
  //  console.log("porfolio given: ", portfolio);
  //  console.log("current price", coin?.market_data?.current_price);

  //input coin name
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    setIdCrypto(message);
  };

  console.log("coin.js passed from app.js:", readData?.coins[0].hodl);

  return (
    <div className="coin">
      <div className="input-container">
        <input
          className="input-coin"
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={message}
        />
        <button className="btn__search" onClick={handleClick}>
          search
        </button>
      </div>
      <div className="coin-container">
        <div className="coin-pricechart">
          <Line options={options3} data={dataMultiaxis} />
        </div>
        <div className="coin-info">
          <h2>{coin?.name}</h2>
          <div className="coin__value">
            current value: ${coin?.market_data?.current_price?.usd}
          </div>
          <div className="coin__ath">
            ATH value: ${coin?.market_data?.ath?.usd}
          </div>
          <br />
          <h2>Portfolio</h2>
          <p>Enter amount of coins:</p>

          <input
            value={portfolio}
            name="coin amount"
            onChange={(event) => setPortfolio(event.target.value)}
          />
          <Save id={`${id}`} portfolio={portfolio} />
          <Delete id={`${id}`} />
          <div className="portfolio__currentvalue">
            current value: ${coin?.market_data?.current_price?.usd * portfolio}
          </div>
          <div className="portfolio__athvalue">
            ATH value: ${coin?.market_data?.ath?.usd * portfolio}
          </div>
          <div className="coins__held">coins held: {portfolio}</div>
          <div className="db__held">
            Portfolio:{readData?.coins[0]?.id_coin} amount:
            {readData?.coins[0]?.hodl}
          </div>
        </div>
      </div>
      <Header />
    </div>
  );
};

export default Coin;
