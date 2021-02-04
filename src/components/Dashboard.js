import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

//import components
import Navigation from "./Navigation";
import Header from "./Header";
import DashboardPanel from "./DashboardPanel";
import Users from "./Users";
import Collection from "./Collection";
import Profile from "./Profile";
import ApiGenerator from "./ApiGenerator";

export default function Dashboard() {
  const [title, setTitle] = useState("not found");

  useEffect(() => {
    setTitle(window.location.pathname);
  }, []);

  return (
    <div className="dashboard__appWrapper">
      <Navigation setTitle={setTitle} />
      <div className="container">
        <Header />
        <div className="dashboard__container">
          <h1 className="dashboard__title">{title}</h1>
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
