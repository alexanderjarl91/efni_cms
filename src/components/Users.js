import React, { useState, useContext, useEffect } from "react";
import "./styles/users.css";
import { AuthContext, DataContext } from "../context";
import { db } from "../firebase";

export default function Users() {
  const { user } = useContext(AuthContext);
  const { collections } = useContext(DataContext);
  const [selectedDatabase, setSelectedDatabase] = useState([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = db.collection("users");
      const data = await response.get();

      const userArray = [];
      data.docs.forEach((item) => {
        userArray.push(item.data());
      });
      setUsers(userArray);
    };
    getUsers();
  }, [state]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const toggleEdit = (index) => {
    const usersCopy = [...users];
    if (usersCopy[index].editUser !== true) {
      usersCopy.forEach((user) => {
        user.editUser = false;
      });
    }
    usersCopy[index].editUser = !usersCopy[index].editUser;
    setUsers(usersCopy);
    setName(user.displayName);
    
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
  const updateUser = (email) => {
    const userRef = db.collection("users").doc(email);

    //auth database
    user.updateProfile({
      displayName: name,
    });

    //firestore database
    userRef.update({
      //update these properties:
      access: selectedDatabase,
      role: role,
      name: name,
    });
    console.log(user);
    setState(!state);
  };

  const handleRole = (e) => {
    if (e.target.checked) {
      setRole("admin");
    } else {
      setRole("editor");
    }
    console.log(role);
  };

  const handleName = (e) => {
    setName(e.target.value);
    console.log(name);
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

                      {user.role === "admin" ? (
                        <label htmlFor="">
                          admin
                          <input
                            name="role"
                            type="checkbox"
                            checked="true"
                            onChange={(e) => {
                              handleRole(e);
                            }}
                          />
                        </label>
                      ) : (
                        <label htmlFor="">
                          Admin
                          <input
                            name="role"
                            type="checkbox"
                            checked="false"
                            onChange={(e) => {
                              handleRole(e);
                            }}
                          />
                        </label>
                      )}
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
                        updateUser(user.email);
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
