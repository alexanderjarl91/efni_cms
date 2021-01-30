import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//import components
import Navigation from "./Navigation";
import Header from "./Header";
import DashboardPanel from "./DashboardPanel";
import Users from "./Users";
import Collection from "./Collection";
import Profile from "./Profile";
import ApiGenerator from "./ApiGenerator";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", backgroundColor: "#F0F0F0" }}>
      <Navigation />
      <div className="container">
        <Header />
        <div>
        <h1 className="dashboard__title">Users</h1>
        <Switch>
          <Route path="/" exact component={DashboardPanel} />
          <Route path="/users" exact component={Users} />
          <Route path="/collection" exact component={Collection} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/api-generator" exact component={ApiGenerator} />
        </Switch>
        </div>
      </div>
    </div>
  );
}
