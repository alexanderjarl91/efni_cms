import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext, authContext, DataContext } from "../context";

export default function Navigation({ goToCollection }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState("editor"); //current users role

  const { user } = useContext(AuthContext);
  const { userData } = useContext(DataContext);
  const { collections } = useContext(DataContext);
  

  const toggleAdminView = () => {
    setIsAdmin(!isAdmin);
  };

  useEffect(() => {
    userData.forEach((currUser) => {
      if (currUser.email == user.email) {
        setCurrentUserRole(currUser.role);
        console.log(currUser.role);
      }
    });
  }, [userData]);

  return (
    <>
      <div
        className="navbar"
        style={{
          height: "100vh",
          width: "20vw",
          backgroundColor: "#263774",
          minWidth: "200px",
        }}
      >
        <nav>
          <p>logo</p>
          <div className="userNav">
            <h1>user nav</h1>
            <Link to="/">
              <p>Dashboard</p>
            </Link>
            {collections.map((collection) => (<div><Link to="/collection">{collection.collection}</Link></div>))}
            <Link to="/profile">
              <p>Profile</p>
            </Link>
          </div>

          {currentUserRole == "admin" ? (
            <div className="adminNav">
              <h1 className="adminNav">Admin nav</h1>
              <Link to="/users">
                <p>Users</p>
              </Link>
              <Link to="/api-generator">
                <p>API generator</p>
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </nav>
      </div>
    </>
  );
}
