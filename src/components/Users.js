import React, { useState, useEffect, useContext } from "react";
import "./styles/users.css";
import { DataContext } from "../context";
import {db} from '../firebase'

export default function Users() {
  const { userData, collections } = useContext(DataContext);
  const [users, setUsers] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState([])


  // check if checkbox is checked, set database state according to 
  const handleCheck = (e) => {
    if (e.target.checked) {
      // return (cancel) if item is already in array
      if (selectedDatabase.includes(e.target.value)) return;
      
      //add item if checked
      setSelectedDatabase([...selectedDatabase, e.target.value])
      console.log(selectedDatabase)
    } else {

      //remove item if unchecked
      const copyOfSelectedDatabase = [...selectedDatabase]
      const index = copyOfSelectedDatabase.indexOf(e.target.value)
      copyOfSelectedDatabase.splice(index, 1)
      setSelectedDatabase(copyOfSelectedDatabase)
    }
  }
  //update user button
  const updateUser = (email) => {
    const userRef = db.collection('users').doc(email)
     userRef.update({access: selectedDatabase})
  }

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
        <div>
          {userData.map((user, index) => (
            <div>

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

          </div>
              {user.editUser ? (
                <>
                <div className="users__editMode">
                  <div>
                    <h3>Name</h3>
                    <input type="text" placeholder={user.name} />

                    <h3>Email</h3>
                    <input type="email" placeholder={user.email} />

                  </div>
                  <div>
                    <h3>User role</h3>
                    <label htmlFor="">admin</label>
                    <input name=""type="radio" placeholder={user.role} />
                    <label htmlFor="">editor</label>
                    <input name=""type="radio" placeholder={user.role} />
                  </div>



                  {/* FOR EACH DATABASE, RENDER ITEM */}
                  <div style={{ backgroundColor: "yellow", maxWidth: "20vw" }}>
                    <h3>Database Access:</h3>
                    {collections.map((collection) => (
                    <div>
                      <label htmlFor="">{collection.collection}</label>
                      <input onChange={(e) => {
                        handleCheck(e)

                      }}type="checkbox" value={collection.collection} />
                    </div>)
                      
                    )}
                  </div>
                  <button onClick={() => {
                    updateUser(user.email)}
                  }>save</button>
                </div>
                </> ) 
                
                
                
                : null}
            </div>
          ))}
        </div>
      ) : (
        <p>loading users..</p>
      )}
    </div>
  );
}
