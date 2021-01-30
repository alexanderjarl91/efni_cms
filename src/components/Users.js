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
      <h1 className="users__title">Users</h1>
      <div className="users__titles">
        {/* TABLE TITLES */}
        <h4>name</h4>
        <h4>email</h4>
        <h4>user role</h4>
        <h4>assigned databases</h4>
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
                      <h3>Name</h3>
                      <p>{user.name}</p>

                      <h3>Email</h3>
                      <p>{user.email}</p>
                      {user.emailVerified ? (
                        <p>verified!</p>
                      ) : (
                        <p>not verified</p>
                      )}
                    </div>
                    <div>
                      <h3>User role</h3>

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
                          admin
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
                      <h3>Database Access:</h3>
                      {collections.map((collection) => (
                        <div key={collection.collection}>
                          <label htmlFor="">{collection.collection}</label>
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
