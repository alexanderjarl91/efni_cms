import React, { useContext, useEffect, useState } from "react";
import { AuthContext, DataContext } from "../context";
import "./styles/dashboard.css";

export default function DashboardPanel() {
  const { user } = useContext(AuthContext);
  const { userData, collections, setCollections } = useContext(DataContext);
  const [currUser, setCurrUser] = useState(undefined);
  const [userCollection, setUserCollection] = useState([]);

  useEffect(() => {
    const foundUser = userData.find((x) => x.email === user.email);

    // console.log(collections);
    if (foundUser !== undefined) {
      setCurrUser(foundUser);
    }
  }, [userData]);

  useEffect(() => {
    if (currUser !== undefined) {
      // Get all the collection object that the user should have access to
      const filtered = collections.filter((item) =>
        currUser.access.includes(item.collection)
      );
      setUserCollection(filtered);
    }
  }, [currUser, collections]);

  const collectionList = userCollection.map((item, index) => (
    <React.Fragment key={index}>
      <div>{item.collection}</div>
      <div>{item.documentCount}</div>
      <div>3</div>
    </React.Fragment>
  ));
  return (
    <div>
      <h1>Welcome, {user.displayName}!</h1>
      <div>
        <h4>Your collections:</h4>

        {/* collection titles */}
        <div className="dashboard__grid">
          <h4>name</h4>
          <h4># of entries</h4>
          <h4># of editors</h4>
          {collectionList}
        </div>
      </div>
    </div>
  );
}
