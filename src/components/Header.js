import React, { useContext } from "react";
import { AuthContext } from "../context";
import firebase from "../firebase";
import "./styles/header.css";

export default function Header() {
  const { user } = useContext(AuthContext);

  const logOut = () => {
    firebase.auth().signOut();
  };
  return (
    <div className="header">
      <div className="header__userInfo">
        <img className="header__avatar" src={user.photoURL} />
        <p>{user.displayName}</p>
        <p style={{ opacity: "0.5" }}>, admin</p>
      </div>
      <button onClick={logOut}>log out</button>
    </div>
  );
}
