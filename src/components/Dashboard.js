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
    <div style={{ display: "flex" }}>
      <Navigation />
      <div className="container">
        <Header />
        <Switch>
          <Route path="/" exact component={DashboardPanel} />
          <Route path="/users" exact component={Users} />
          <Route path="/collection" exact component={Collection} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/api-generator" exact component={ApiGenerator} />
        </Switch>
      </div>
    </div>
  );
}
