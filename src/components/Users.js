import React, { useState, useContext, useEffect } from "react";
import "./styles/users.css";
import { AuthContext, DataContext } from "../context";
import { db } from "../firebase";
import { Button, Avatar } from "@material-ui/core";

export default function Users() {
  const { collections, userData, setUserData } = useContext(DataContext);
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");

  //match user databases
  const currentUser = userData.find((x) => x.email === user.email);

  useEffect(() => {
    setUsers(userData);
  }, [userData]);

  const toggleEdit = (index) => {
    const usersCopy = [...users];
    if (usersCopy[index].editUser !== true) {
      usersCopy.forEach((user) => {
        user.editUser = false;
      });
    }
    usersCopy[index].editUser = !usersCopy[index].editUser;
    setUsers(usersCopy);
    setRole(role || users[index].role || "editor");
  };

  // check if checkbox is checked, set database state according to
  const handleDatabaseAccess = (e) => {
    if (e.target.checked) {
      // return (cancel) if item is already in array
      if (selectedDatabase.includes(e.target.value)) return;
      //add item if checked
      setSelectedDatabase([...selectedDatabase, e.target.value]);
      console.log(selectedDatabase);
    } else {
      //remove item if unchecked
      const copyOfSelectedDatabase = [...selectedDatabase];
      const index = copyOfSelectedDatabase.indexOf(e.target.value);
      copyOfSelectedDatabase.splice(index, 1);
      setSelectedDatabase(copyOfSelectedDatabase);
    }
  };

  //update user button
  const updateUser = (email, index) => {
    const userRef = db.collection("users").doc(email);

    //firestore database
    userRef.update({
      //update these properties:
      access: selectedDatabase,
      role: role,
    });
    const copyOfUserData = [...userData];
    copyOfUserData[index].access = selectedDatabase;
    copyOfUserData[index].role = role;

    setUserData(copyOfUserData);
  };

  const handleRole = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setRole("admin");
    } else {
      setRole("editor");
    }
    console.log(role);
  };

  return (
    <>
      {currentUser && currentUser.role && currentUser.role === "admin" ? (
        <div className="users__comp">
          {/* TABLE TITLES */}
          <div className="users__header">
          <div className="users__headerElements">
            <h4>Name</h4>
            <h4>E-mail</h4>
            <h4>Role</h4>
            <h4>Access</h4>
          </div>
          </div>

          {/* DISPLAY USER DATA */}
          {users.length > 0 ? (
            <div>
              
              {users.map((user, index) => (
                <div key={user.useruid}>
                  <div
                    onClick={(e) => {
                      toggleEdit(index);
                    }}
                    className="user__data"
                    key={user.email}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      key={index}
                    >
                      <Avatar
                        style={{
                          margin: "1rem",
                          width: "30px",
                          height: "30px",
                        }}
                        src={user.photoURL}
                      />
                      <p>{user.name}</p>
                    </div>
          
                    <p>{user.email}</p>
                    {user.role === "admin" ? <p>{user.role} </p> : <p>Editor</p>}

                    {user.access ? (
                      <p style={{ textTransform: "capitalize" }}>
                        {user.access.toString()}
                      </p>
                    ) : (
                      <p>No access</p>
                    )}

                    {/* EDITMODE */}
                  </div>
                  {user.editUser ? (
                    <div className="editmode__container">
                      <div className="users__editMode">
                        <div>
                          <h3 className="users__editModeTitle">User role:</h3>

                          <label htmlFor="">
                            admin
                          </label>
                            <input
                              name="role"
                              type="checkbox"
                              checked={role === "admin"}
                              onChange={(e) => {
                                handleRole(e);
                              }}
                            />
                        </div>
                        {/* FOR EACH DATABASE, RENDER ITEM */}
                        <div
                          style={{
                            maxWidth: "20vw",
                          }}
                        >
                          <h3 className="users__editModeTitle">
                            Database Access:
                          </h3>
                          {collections.map((collection) => (
                            <div key={collection.collection}>
                              <label className="uppercase" htmlFor="">
                                {collection.collection}
                              </label>
                              <input
                                onChange={(e) => {
                                  handleDatabaseAccess(e);
                                }}
                                type="checkbox"
                                value={collection.collection}
                              />
                            </div>
                          ))}
                        </div>
                         <Button
                         style={{
                           background: "#FFFFFF",
                           boxShadow: "0px 4px 4px rgba(0,0,0,0.25",
                           borderRadius: "10px",
                           padding: "0px 20px",
                         }}
                         onClick={() => {
                           updateUser(user.email, index);
                           toggleEdit(index);
                         }}
                       >
                         Update User
                       </Button>
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
      ) : (
        <h1> 401 - NO ACCESS</h1>
      )}
    </>
  );
}
