import React, {useState, useEffect} from "react";
import './styles/users.css'

import {db} from '../firebase'


export default function Users() {

const [users, setUsers] = useState([])
const [editUser, setEditUser] = useState(false)

const toggleEdit = () => {
  setEditUser(!editUser)
}



console.log('user stateið:', users)
useEffect(() => {

  const getUsers = async () => {
    const response = db.collection('users')
    const data = await response.get();
    const userArray = [];
    data.docs.forEach((item) => {
       userArray.push(item.data())
    })
    setUsers(userArray)
  }
  
  getUsers()
}, [])


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
        {users.length > 0 ?
         <div class="" >
           {users.map(user => (
           <div onClick={toggleEdit} className="user__data" key={user.email}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            {user.role === 'admin'? <p>{user.role}</p> : <p>Editor</p>}
            <p>my databases</p>
          </div>
          
          
          ))}
         </div>
         
         : <p>loading users..</p>}

        <div className="user__data">
          <p>Alexander</p>
          <p>alexanderjarl91@gmail.com</p>
          <p>admin</p>
          <p>products</p>
        </div>
    </div>
  );
}