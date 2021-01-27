import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context";

export default function Navigation({ goToCollection }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const { product } = useContext(DataContext);

  const toggleAdminView = () => {
    setIsAdmin(!isAdmin);
    console.log(product);
  };

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
            <Link to="/collection">
              <p>Collection</p>
            </Link>
            <Link to="/profile">
              <p>Profile</p>
            </Link>
          </div>
          {isAdmin ? (
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
          <button onClick={toggleAdminView}>Toggle admin view</button>
        </nav>
      </div>
    </>
  );
}
