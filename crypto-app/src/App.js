import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CoinRow from "./components/CoinRow";
import Table from "./components/Table";
import Homepage from "./pages/Homepage";
import Coin from "./pages/Coin";
import { Button } from "@mui/material";
import { AccessAlarmIcon } from "@mui/icons-material";

import Navbar from "./components/Navbar/Navbar";
//https://www.youtube.com/watch?v=QA6oTpMZp84

//https://www.youtube.com/watch?v=fzxEECHnsvU

//https://www.youtube.com/watch?v=0sY4fUi5dMM

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/about" element={<CoinRow />} />
          <Route path="/portfolio" element={<Coin />} />
          <Route path="/coins/:id" element={<Coin />} />
        </Routes>
        {/*     <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button> */}
      </Router>
    </div>
  );
}

export default App;
