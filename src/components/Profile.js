import React, { useContext, useState } from "react";
import "./styles/profile.css";
import { AuthContext } from "../context";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);

  const editProfile = () => {
    setEditMode(!editMode);
  };

  const logUser = () => {
    console.log(user);
  };

  return (
    <>
      {editMode ? (
        //in edit mode
        <div>
          <img alt="" className="profile__avatar" src={user.photoURL} />
          <div>
            <h4>Name</h4>
            <input type="text" placeholder={user.displayName} />
          </div>
          <div>
            <h4>E-mail</h4>
            <input type="email" placeholder={user.email} />
          </div>
          <div>
            <h4>Image URL</h4>
            <input type="text" placeholder={user.photoURL} />
          </div>
          <div>
            <button onClick={editProfile}>cancel</button>
            <button onClick={editProfile}>update profile</button>
          </div>
        </div>
      ) : (
        //normal mode
        <div className="profile__container">
          <img alt="" className="profile__avatar" src={user.photoURL} />
          <h1>{user.displayName}</h1>
          <button onClick={editProfile}>edit profile</button>
          <button onClick={logUser}>console log user</button>
        </div>
      )}
    </>
  );
}
