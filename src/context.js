import React, { useContext, useEffect, useState } from "react";
import firebase from "./firebase";
import { db } from "./firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const handleLogoutContext = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = db.collection("users");
      const data = await response.get();
      const userArray = [];
      data.docs.forEach((item) => {
        userArray.push(item.data());
      });

      setUserData(userArray);
    };

    getUsers();
  }, []);

  return (
    <DataContext.Provider value={{ userData }}>{children}</DataContext.Provider>
  );
};
