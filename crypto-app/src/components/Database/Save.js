import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextUser";
import { app, database } from "../../firebaseConfig";
import {
  doc,
  setDoc,
  Firestore,
  FieldValue,
  ArrayUnion,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import "./Save.css";
//import firebase from "firebase"; //firestore object eeds firebase maybe?
import firebase from "firebase/compat/app";

const Save = ({ id, portfolio }) => {
  console.log("save says idcrypto is", id);
  console.log("save says portfolio is", portfolio);

  // const firestore = new FieldValue();
  // const firestore_1 = require("firebase/firestore");

  let coinName = `${id}`;
  console.log("Coin string:", coinName);
  //Context
  const { readData, setReadData, userdata, setUserdata } =
    useContext(UserContext);
  //add one to database
  const coinRef = doc(database, "users", userdata?.uid);
  const addOneDatabase = async () => {
    /*   await setDoc(
      coinRef,
      {
        favorites: {
          name: coinName,
          amount: portfolio,
        },
      },
      { merge: true }
    ); */
    await updateDoc(coinRef, {
      favorites: arrayUnion(coinName),
    });
  };

  return (
    <div className="saveordelete-container">
      <button className="btn__save" onClick={addOneDatabase}>
        Save
      </button>
    </div>
  );
};

export default Save;
