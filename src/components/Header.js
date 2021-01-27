import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
import firebase from "../firebase";
import { db } from "../firebase";
import "./styles/header.css";

export default function Header() {
  const { user } = useContext(AuthContext); //current user info
  const [users, setUsers] = useState([]); //all users info from users firestore database

  const [currentUserRole, setCurrentUserRole] = useState("editor"); //current users role

  //get users from users database
  const getUsers = async () => {
    const response = db.collection("users");
    const data = await response.get();
    const userArray = [];
    data.docs.forEach((item) => {
      userArray.push(item.data());
    });
    setUsers(userArray);
  };

  useEffect(() => {
    getUsers();
  }, []);

  //match users database to current user and set current role
  useEffect(() => {
    users.forEach((currUser) => {
      if (currUser.email == user.email) {
        setCurrentUserRole(currUser.role);
      }
    });
  }, [users]);

  const logOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="header">
      <div className="header__userInfo">
        <img className="header__avatar" src={user.photoURL} />
        <p>{user.displayName}</p>
        <p style={{ opacity: "0.5" }}>, {currentUserRole}</p>
        {user.name}
      </div>
      <button onClick={logOut}>log out</button>
    </div>
  );
}
