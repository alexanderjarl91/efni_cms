import React, { useContext, useState } from "react";
import "./styles/profile.css";
import { AuthContext } from "../context";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);

  const editProfile = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      {editMode ? (
        //in edit mode
      <div className="profile__editFormOverlay">
        <div className="profile__editForm">
          <img alt="" className="profile__avatar" src={user.photoURL} /><br/>
          <div>
            <h4>Name</h4>
            <input type="text" placeholder={user.displayName} />
          </div>
          <br/>
          <div>
            <h4>E-mail</h4>
            <input type="email" placeholder={user.email} />
          </div>
          <br/>
          <div>
            <h4>Image URL</h4>
            <input type="text" placeholder={user.photoURL} />
          </div>
          <br/>
          <div className="profile__editButtons">
            <button className="formButtons" onClick={editProfile}>Cancel</button>
            <button className="formButtons" onClick={editProfile}>Save</button>
          </div>
        </div>
      </div>
      ) : (
        //normal mode
        <div className="profile__container">
          <div className="profile__items">
            <img alt="" className="profile__avatar" src={user.photoURL} />
            <h1>{user.displayName}</h1>
            <button className="formButtons" onClick={editProfile}>Edit profile</button>
          </div>
        </div>
      )}
    </>
  );
}
