import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, DataContext } from "../context";
import DocumentIcon from '@material-ui/icons/InsertDriveFile';
import PersonIcon from '@material-ui/icons/Person';
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
    <Link key={index} className="card__link" to={{pathname: "/collection", search: `?name=${item.collection}`}}>
      <div className="collection__card">
        <div className="card__title">{item.collection}</div>
        <div className="card__document"><DocumentIcon className="document__icon"/>{item.documentCount}</div>
        <div className="card__user"><PersonIcon className="user__icon"/>3</div>
      </div>
    </Link>
  ));
  return (
    <div>
      <h1>Welcome, {user.displayName}!</h1>
      <div>
        <h4 className="dashboard__panel__title">Your collections:</h4>

        {/* collection titles */}
        <div className="dashboard__grid">
          {/* <h4>name</h4>
          <h4># of entries</h4>
          <h4># of editors</h4> */}
          {collectionList}
        </div>
      </div>
    </div>
  );
}
