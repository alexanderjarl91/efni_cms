import React, { useState, useContext, useEffect } from "react";
import "./styles/users.css";
import { DataContext } from "../context";
import { db } from "../firebase";

export default function Users() {
  const { collections, userData, setUserData } = useContext(DataContext);
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");

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
    <div className="users__comp">
      {/* TABLE TITLES */}
      <div className="users__header">
        <h4>Name</h4>
        <h4>E-mail</h4>
        <h4>Role</h4>
        <h4>Access</h4>
      </div>

      {/* DISPLAY USER DATA */}
      {users.length > 0 ? (
        <div>
          {users.map((user, index) => (
            <div key={user.email}>
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

                {user.access ? <p>{user.access}</p> : <p>No access</p>}

                {/* EDITMODE */}
              </div>
              {user.editUser ? (
                <>
                  <div className="users__editMode">
                    <div>
                      <h3 className="users__editModeTitle">User role</h3>

                      <label htmlFor="">
                        admin
                        <input
                          name="role"
                          type="checkbox"
                          checked={role === "admin"}
                          onChange={(e) => {
                            handleRole(e);
                          }}
                        />
                      </label>
                    </div>
                    {/* FOR EACH DATABASE, RENDER ITEM */}
                    <div
                      style={{ backgroundColor: "yellow", maxWidth: "20vw" }}
                    >
                      <h3 className="users__editModeTitle">Database Access:</h3>
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
                    <button
                      onClick={() => {
                        updateUser(user.email, index);
                        toggleEdit(index);
                      }}
                    >
                      save
                    </button>
                  </div>
                </>
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
