import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextUser";
import { app, database } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import "./Save.css";

const Save = ({ id, portfolio }) => {
  console.log("save says idcrypto is", id);
  console.log("save says portfolio is", portfolio);

  let coinName = `${id}`;
  console.log("Coin string:", coinName);
  //Context
  const { readData, setReadData, userdata, setUserdata } =
    useContext(UserContext);
  //add one to database
  const addOneDatabase = async () => {
    const coinRef = doc(database, "users", userdata?.uid);

    await setDoc(
      coinRef,
      {
        favorites: {
          name: coinName,
          amount: portfolio,
        },
      },
      { merge: true }
    );
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
