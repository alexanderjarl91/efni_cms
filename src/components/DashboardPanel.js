import React, { useContext, useEffect, useState } from "react";
import { AuthContext, DataContext } from "../context";
import "./styles/dashboard.css";

export default function DashboardPanel() {
  const { user } = useContext(AuthContext);
  const { collections, setCollections } = useContext(DataContext);
  // const [collections, setCollections] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/collections");
  //       const data = await response.json();
  //       setCollections(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getData();
  // }, [])

  const collectionList = collections.map((item, index) => <React.Fragment key={index}><div>{item.collection}</div><div>{item.documentCount}</div><div>3</div><button>edit</button></React.Fragment>)
  return <div>
    <h1>Welcome, {user.displayName}!</h1>
    <div>
      <h4>Your collections:</h4>
      
      {/* collection titles */}
      <div className="dashboard__grid">
        <h4>name</h4>
        <h4># of entries</h4>
        <h4># of editors</h4>
        <h4></h4>
        {
          collectionList
        }
      </div>

    </div>
  </div>;
}