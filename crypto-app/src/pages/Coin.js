import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Coin.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
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

  useEffect(() => {
    async function Data() {
      const resultCoin = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true`
      );

      setCoin(resultCoin.data);
    }
    Data();
  }, [id]);
  console.log("coin/id info: ", coin);

  //historic price data usd
  // chart libray: https://react-chartjs-2.js.org/
  // https://momentjs.com/
  const [priceHistory, setPriceHistory] = useState();

  useEffect(() => {
    async function History() {
      const resultHistory = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=90&interval=daily`
      );

      setPriceHistory(resultHistory.data);
    }
    History();
  }, [id]);
  console.log("coin price history: ", priceHistory);

  const onlyPrice = priceHistory?.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(3),
  }));

  const options = {
    responsivie: true,
  };

  //data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
  const data = {
    labels: onlyPrice?.map((item) => moment(item.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: coin?.name,
        data: onlyPrice?.map((price) => price.y),
        borderColor: "rgb(0,0,0)",
      },
    ],
  };

  console.log("x and y", onlyPrice);
  return (
    <div className="coin-container">
      <div className="coin__name">{coin?.name}</div>
      <div className="coin-pricechart">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default Coin;
