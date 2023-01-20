import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CoinRow from "./components/CoinRow";
import Homepage from "./pages/Homepage";
import Coin from "./pages/Coin";
import { Button } from "@mui/material";
import { AccessAlarmIcon } from "@mui/icons-material";
import CoinTable from "./components/CoinTable";

//https://www.youtube.com/watch?v=QA6oTpMZp84

//https://www.youtube.com/watch?v=fzxEECHnsvU

//https://www.youtube.com/watch?v=0sY4fUi5dMM

function App() {
  return (
    <Router>
      <div>
        <Header />
        <CoinTable />
        <Routes>
          <Route path="/" element={<CoinRow />} />
          <Route path="/coins/:id" element={<Coin />} />
        </Routes>
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </div>
    </Router>
  );
}

export default App;
