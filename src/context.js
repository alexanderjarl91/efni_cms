import React, { useContext, useEffect, useState } from "react";
import firebase from "./firebase";

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
  const product = { name: "whatever" };
  return (
    <DataContext.Provider value={{ product }}>{children}</DataContext.Provider>
  );
};
