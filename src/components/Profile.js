import React, { useContext, useState } from "react";
import "./styles/profile.css";
import { AuthContext } from "../context";
import { SentimentSatisfied } from "@material-ui/icons";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(user.photoURL);
  const [state, setState] = useState();

  const editProfile = () => {
    setEditMode(!editMode);
  };
  console.log(user.photoURL);

  // set userProfile's photoURL to the imageURL state
  const uploadImage = () => {
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
            <img alt="" className="profile__avatar" src={user.photoURL} />
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
            <img alt="" className="profile__avatar" src={user.photoURL} />
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
