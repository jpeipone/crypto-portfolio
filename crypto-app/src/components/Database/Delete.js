import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextUser";
import { app, database } from "../../firebaseConfig";
import { doc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import "./Delete.css";

const Delete = ({ id }) => {
  //Context
  const { readData, setReadData, userdata, setUserdata } =
    useContext(UserContext);

  //delete data
  const deleteCoin = async () => {
    const coinRef = doc(database, "users", userdata?.uid);

    // Remove the 'coin' field from the document
    await updateDoc(coinRef, {
      favorites: deleteField(),
    });
  };
  return (
    <div>
      <button className="btn__delete" onClick={deleteCoin}>
        Delete
      </button>
    </div>
  );
};

export default Delete;
