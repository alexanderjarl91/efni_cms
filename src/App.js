import "./App.css";
import React, { useState, useContext } from "react";
import firebase from "./firebase";
import { AuthContext } from "./context";

//import components
import Login2 from "./components/Login2";
import Dashboard from "./components/Dashboard";

function App() {
  //fetching user state from context
  const { user } = useContext(AuthContext);

  //declaring local states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  //sign in using state of email and state of password
  const handleLogin = () => {
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  //sign up using email and password
  const handleSignup = () => {
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      //then create a document in the database
      .then(function (user) {
        var userProfile = firebase.auth().currentUser;

        userProfile
          .updateProfile({
            displayName: name,
            photoURL:
              "https://herrmans.eu/wp-content/uploads/2019/01/765-default-avatar.png",
          })
          .then(() => {
            const userUid = user.user.uid;
            const email = user.user.email;
            const name = user.user.displayName;

            const account = {
              useruid: userUid,
              email: email,
              name: name,
            };
            firebase.firestore().collection("users").doc(email).set(account);
          });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            console.log(err);
        }
      });
  };

  //logout function
  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const logUser = () => {
    console.log(user);
  };

  return (
    <div className="App">
      {user ? (
        <>
          <Dashboard />
          <button onClick={handleLogout}>log out</button>
          <button onClick={logUser}>console log user</button>
        </>
      ) : (
        <Login2
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          name={name}
          setName={setName}
        />
      )}
    </div>
  );
}

export default App;
