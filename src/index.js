import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider, DataProvider } from "./context";

//<App/> is wrapped in AuthProvider so it can now monitor if user is authenticated or not

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <Router>
          <App />
        </Router>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

