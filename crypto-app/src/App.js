import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CoinRow from "./components/CoinRow";
import Table from "./components/Table";
import Homepage from "./pages/Homepage";
import Coin from "./pages/Coin";

import CoinTable from "./components/CoinTable";
import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";

//firebase
import { app, database } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "firebase/firestore";

import ContextUser, { UserContext } from "./ContextUser";
import Login from "./components/User/Login";
import Footer from "./components/Footer/Footer";

function App() {
  //email
  const auth = getAuth();

  //google
  const provider = new GoogleAuthProvider();

  //Context
  const { readData, setReadData, userdata, setUserdata } =
    useContext(UserContext);

  //  const [userdata, setUserdata] = useState(null);
  const [array, setArray] = useState([]);
  // const [readData, setReadData] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [coindb, setCoindb] = useState([]);

  //const coinRef = doc(database, "users", userdata?.uid); //ONE USERS info

  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<CoinTable />} />
          <Route path="/about" element={<CoinRow />} />
          <Route path="/portfolio" element={<Coin />} />
          <Route path="/coins/:id" element={<Coin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
