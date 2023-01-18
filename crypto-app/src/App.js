import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Coin from "./pages/Coin";

//https://www.youtube.com/watch?v=QA6oTpMZp84

//https://www.youtube.com/watch?v=fzxEECHnsvU

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Coin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
