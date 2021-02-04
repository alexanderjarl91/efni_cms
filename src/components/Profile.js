import React, { useContext, useEffect, useState } from "react";
import "./styles/profile.css";
import { AuthContext, DataContext } from "../context";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { userData, setUserData } = useContext(DataContext);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(user.photoURL);
  const [state, setState] = useState("");

  const currentUser = userData.find((x) => x.email === user.email);

  const editProfile = () => {
    setEditMode(!editMode);
  };

  const uploadImage = () => {
    console.log(currentUser.email);

    const photoRef = db.collection("users").doc(currentUser.email);

    photoRef.update({ photoURL: image });

    user
      .updateProfile({
        photoURL: image,
      })
      .then(() => {
        setState(image);
      });
  };

  return (
    <>
      {editMode ? (
        //in edit mode
        <div className="profile__editFormOverlay">
          <div className="profile__editForm">
            <Avatar alt="" className="profile__avatar" src={user.photoURL} />
            <br />

            <p>{user.displayName}</p>
            <br />
            <div>
              <h4>Image URL</h4>
              <input
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                type="text"
                placeholder={user.photoURL}
              />
            </div>
            <br />
            <div className="profile__editButtons">
              <button className="formButtons" onClick={editProfile}>
                Cancel
              </button>
              <button
                className="formButtons"
                onClick={() => {
                  editProfile();
                  uploadImage();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        //normal mode
        <div className="profile__container">
          <div className="profile__items">
            {currentUser ? (
              <img alt="" className="profile__avatar" src={user.photoURL} />
            ) : null}
            <h1>{user.displayName}</h1>
            <button className="formButtons" onClick={editProfile}>
              Edit profile
            </button>
          </div>
        </div>
      )}
    </>
  );
}
