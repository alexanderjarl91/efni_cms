import React, { useContext, useEffect, useState } from "react";
import firebase from "./firebase";
import { db } from "./firebase";

//creating
export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const DataContext = React.createContext();

//creating data context.
//userData = info on all users
// products = fetches /products endpoint

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);

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

    const getData = async () => {
      try {
        const response = await fetch("https://efni-api.herokuapp.com/nike");
        const data = await response.json();
        setProducts(data);
        console.log(products);
      } catch (err) {
        console.log(err);
      }
    };

    
    const getCollections = async () => {
      try {
        const response = await fetch("https://efni-api.herokuapp.com/collections");
        const data = await response.json();
        setCollections(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
    getData();
    getCollections();
  }, []);

  return (
    <DataContext.Provider value={{ userData, products, collections, setProducts, setCollections }}>
      {children}
    </DataContext.Provider>
  );
};
