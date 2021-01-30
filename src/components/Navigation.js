import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext, DataContext } from "../context";

export default function Navigation({ goToCollection }) {
  
  const { user } = useContext(AuthContext);
  const { userData } = useContext(DataContext);
  const { collections } = useContext(DataContext);
  const [currentUserRole, setCurrentUserRole] = useState("editor"); //current users role


  const currentUser = userData.find((x) => x.email === user.email);
  
  
  
  useEffect(() => {
    setCurrentUserRole('admin')

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
            
            {currentUser ? 
            <>{currentUser.access
             ? currentUser.access.map((database) => (
                 <div key={database}>
                   <Link
                     to={{
                       pathname: "/collection",
                       search: `?name=${database}`,
                     }}>
                     {database}
                   </Link>
                 </div>
               ))
             : null }</>
            : null}
            <Link to="/profile">
              <p>Profile</p>
            </Link>
          </div>
          
          {currentUser? 
          <>{currentUser.role === "admin" ? (
            <div className="adminNav">
              <h1 className="adminNav">Admin nav</h1>
              <Link to="/users">
                <p>Users</p>
              </Link>
              <Link to="/api-generator">
                <p>API generator</p>
              </Link>
            </div>
          ) : null}</>
          
          : null}
        </nav>
      </div>
    </>
  );
}
