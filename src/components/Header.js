import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, DataContext } from "../context";
import firebase from "../firebase";
import "./styles/header.css";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function Header() {
  const { user } = useContext(AuthContext); //current user info
  const { userData } = useContext(DataContext);

  const [currentUserRole, setCurrentUserRole] = useState("editor"); //current users role

  //match users database to current user and set current role
  useEffect(() => {
    const email = user.email;
    userData.forEach((currUser) => {
      if (currUser.email === email) {
        setCurrentUserRole(currUser.role);
      }
    });
  }, [userData]);

  const logOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="header">
      <div className="header__userInfo">
        <Link
          style={{
            display: "flex",
            color: "black",
            alignItems: "center",
            marginRight: "0rem",
          }}
          to="/profile"
        >
          <Avatar src={user.photoURL} style={{ marginRight: "8px" }} />
          <div className="header__userName">
            <p>{user.displayName}</p>
            <p style={{ opacity: "0.5", fontSize: "8px" }}>
              , {currentUserRole}
            </p>
          </div>
        </Link>
      </div>
      <ExitToAppIcon
        className="header__logout"
        onClick={logOut}
      ></ExitToAppIcon>
    </div>
  );
}
