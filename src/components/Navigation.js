import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//importing components
import DashboardPanel from "./DashboardPanel";
import Users from "./Users";

export default function Navigation({ goToCollection }) {
  return (
    <>
      <div
        className="navbar"
        style={{ height: "100vh", width: "20vw", backgroundColor: "#263774" }}
      >
        <nav>
          <p>Dashboard</p>
          <p>LOGO</p>
          <div className="userNav">
            <h1>user nav</h1>
            <Link to="/">
              <p>Dashboard</p>
            </Link>
            <Link to="/collection">
              <p>Collection</p>
            </Link>
            <Link to="/myprofile">
              <p>My profile</p>
            </Link>
          </div>
          <div className="adminNav">
            <h1 className="adminNav">Admin nav</h1>
            <Link to="/users">
              <p>Users</p>
            </Link>
            <Link to="/api-generator">
              <p>API generator</p>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
