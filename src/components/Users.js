import React, { useState, useEffect, useContext } from "react";
import "./styles/users.css";

import { db } from "../firebase";

import { AuthContext, DataContext } from "../context";

export default function Users() {
  const { userData } = useContext(DataContext);
  console.log(userData);

  const [users, setUsers] = useState([]);
  // const [editUser, setEditUser] = useState(false);

  const toggleEdit = (index) => {
    const usersCopy = [...userData];
    if (usersCopy[index].editUser !== true) {
      usersCopy.forEach((user) => {
        user.editUser = false;
      });
    }
    usersCopy[index].editUser = !usersCopy[index].editUser;
    setUsers(usersCopy);
  };

  return (
    <div className="users__comp">
      {/* TABLE TITLES */}
      <h1 className="users__title">Users</h1>
      <div className="users__titles">
        {/* TABLE TITLES */}
        <h4>name</h4>
        <h4>email</h4>
        <h4>user role</h4>
        <h4>assigned databases</h4>
      </div>

      {/* DISPLAY USER DATA */}
      {userData.length > 0 ? (
        <div class="">
          {userData.map((user, index) => (
            <div
              onClick={(e) => {
                toggleEdit(index);
              }}
              className="user__data"
              key={user.email}
            >
              <p>{user.name}</p>
              <p>{user.email}</p>
              {user.role === "admin" ? <p>{user.role}</p> : <p>Editor</p>}
              <p>my databases</p>

              {/* EDITMODE */}

              {user.editUser ? (
                <div className="users__editMode">
                  <div>
                    <h3>Name</h3>
                    <input type="text" placeholder={user.name} />
                    <button>Update</button>

                    <h3>Email</h3>
                    <input type="email" placeholder={user.email} />
                    <button>Update</button>
                  </div>
                  <div>
                    <h3>User role</h3>
                    <label htmlFor="">admin</label>
                    <input type="radio" placeholder={user.role} />
                    <label htmlFor="">editor</label>
                    <input type="radio" placeholder={user.role} />
                    <button>Update</button>
                  </div>
                  {/* FOR EACH DATABASE, RENDER ITEM */}
                  <div style={{ backgroundColor: "yellow", maxWidth: "20vw" }}>
                    <h3>Database Access:</h3>
                    <div>
                      <label htmlFor="">Nike shop</label>
                      <input type="checkbox" />
                    </div>
                    <div>
                      <label htmlFor="">Adidas</label>
                      <input type="checkbox" />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p>loading users..</p>
      )}
    </div>
  );
}
