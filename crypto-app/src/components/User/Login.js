import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextUser";
import "./Login.css";
//firebase
import { app, database } from "../../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { getDoc, doc } from "firebase/firestore";

const Login = () => {
  //Context
  const { readData, setReadData, userdata, setUserdata, logged, setLogged } =
    useContext(UserContext);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  // const [logged, setLogged] = useState(false);

  const auth = getAuth();

  //sign in email

  const handleSignin = () => {
    // setLogged(true);
    signInWithEmailAndPassword(auth, username, password)
      .then((response) => {
        setUserdata(response.user);
        setError(false);
        setRegisterError(false);
        setLogged(true);
      })
      .catch((err) => {
        // alert(err.message);
        setError(true);
        setRegisterError(false);
      });
  };

  //log out
  const handleLogout = () => {
    setLogged(false);
    setUserdata(null);
    setReadData(null);
    setUsername(null);
    setPassword(null);
  };

  //register
  const handleRegisterUser = () => {
    createUserWithEmailAndPassword(auth, username, password)
      .then((response) => {
        setRegisterError(false);
        setError(false);
      })
      .catch((err) => {
        setRegisterError(true);
        setError(false);
      });
  };

  const readOneDatabase = async () => {
    const coinRef = doc(database, "users", userdata?.uid);
    const docSnap = await getDoc(coinRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setReadData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  console.log("error true or false", error);

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-input">
          {registerError && (
            <span className="login__error">fill email and password</span>
          )}
          {error && (
            <span className="login__error">wrong email or password</span>
          )}
          <label className="input__label">email:</label>
          <input
            placeholder="Email"
            name="username"
            type="username"
            className="input-username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="input__label">password:</label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            className="input-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!logged && (
            <button className="btn__login" onClick={handleSignin}>
              sign in
            </button>
          )}
          {logged && (
            <button className="btn__logout" onClick={handleLogout}>
              sign out
            </button>
          )}
          <button className="btn__register" onClick={handleRegisterUser}>
            register
          </button>
          {/* <button onClick={readOneDatabase}>read</button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
