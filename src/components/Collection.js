import React, { useEffect, useState, useContext } from "react";
import queryString from "query-string";
import NewEntry from "./NewEntry";
import EditEntry from "./EditEntry";
import { AuthContext, DataContext } from "../context";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { confirmAlert } from 'react-confirm-alert'; 
import firebase from "firebase/app";
import "firebase/auth";
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./styles/collection.css";

export default function Collection(props) {
  const { user } = useContext(AuthContext);
  const { userData, refreshCollections, setRefreshCollections } = useContext(DataContext);
  const [addMode, setAddMode] = useState(false);
  const [currEndPoint, setCurrEndPoint] = useState("");
  const [currCollection, setCurrCollection] = useState([]);
  const [productToEdit, setProductToEdit] = useState([]);
  const [allowAccess, setAllowAccess] = useState(true);

  useEffect(() => {
     console.log('collection component rerenderd')
  }, [currCollection])

  useEffect(() => {
    const collectionQs = queryString.parse(window.location.search);
    const foundUser = userData.find((x) => x.email === user.email); // Get the current user object that contains the data access
    // If the user has the requeststring in his access array we allow him access

    if (foundUser && foundUser.access.includes(collectionQs.name)) {
      //Get the collection from the url
      setCurrEndPoint(collectionQs.name);
      setAllowAccess(true);

      const getCollection = async () => {
        try {
          const response = await fetch(
            `https://efni-api.herokuapp.com/${collectionQs.name}`
          );
          const data = await response.json();
          setCurrCollection(data);
        } catch (err) {
          console.log(err);
        }
      };
      getCollection();
    } else {
      setAllowAccess(false);
    }
  }, [window.location.search]);

  const toggleAddMode = () => {
    setAddMode(!addMode);
  };


  // Handle when delete button is clicked
  const handleDelete = async (id) => {
    const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);

    try {
      const r = await fetch(`https://efni-api.herokuapp.com/${currEndPoint}/${id}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json', 'Authorization': idToken}
      });
      const data = await r.json();
      if(data.msg) {
        return;
      } else {
        setRefreshCollections(!refreshCollections);
        setCurrCollection(currCollection.filter((product) => id !== product._id));
      }
    } catch(err) {
      console.log(err);
    }
    // Fetch from the api with DELETE method to delete from database
    // fetch(`http://localhost:5000/${currEndPoint}/${id}`, {
    // })
    //   .then((r) => {
    //     const data = r.json()
    //     console.log('data is: ', data);
        
    //   })
    //   // Filtering and finding the object to remove from id
    //     console.log('R is: ', data);
        // setCurrCollection(
        // currCollection.filter((product) => id !== product._id)
      
        
    //   )
    //   .catch((error) => console.error(error));
  };
  

  const toggleEdit = (index) => {
    const currCollectionCopy = [...currCollection];
    setProductToEdit('')
    if (currCollectionCopy[index].editMode !== true) {
      currCollectionCopy.forEach((product) => {
        product.editMode = false;
      });
      setProductToEdit(currCollectionCopy[index]);
    }
    currCollectionCopy[index].editMode = !currCollectionCopy[index].editMode;
    setCurrCollection(currCollectionCopy);
  };

  // Confirm alert using react-confirm-alert module
  const handleAlert = (id) => {
    confirmAlert({
        title: 'Delete product!',
        message: 'Are you sure?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => handleDelete(id)
          },
          {
            label: 'No',
            onClick: () => handleAlert()
          }
        ]  
      });
  }


  return (
    <>
      {allowAccess ? (
        <>
        {addMode ? (
          <NewEntry setCurrCollection={setCurrCollection} currEndPoint={currEndPoint} toggleAddMode={toggleAddMode} />
        ) : null}
        <div>
            <h1>{currEndPoint}</h1>
            <div className="collection__listWrapper">
              <div className="collection__entryHeader">
                <h4>entries:</h4>
                <button className="formButtons" onClick={toggleAddMode}>add new entry</button>
              </div>
              <div className="collection__listHeaders">
                <h4>Name</h4>
                <h4>Price</h4>
                <h4>Image</h4>
                <h4>On sale?</h4>
                <h4>Description</h4>
                <h4></h4>
                <h4></h4>
              </div>

                {currCollection.map((product, index) => (
                  <div className="collection__list" key={product._id}>
                    <p>{product.productName}</p>
                    <p>{product.productPrice}</p>
                    {product.productImg ? (
                    <a
                      className="collection__imageLink"
                      href={product.productImg}
                      target="blank"
                    >
                      Link to image
                    </a>
                    ) : "No image"}
                    <p>{product.productOnSale ? "true" : "false"}</p>
                    <p>{product.productDescription.length > 50 ?
                      `${product.productDescription.substring(0, 50)} ...`
                      : product.productDescription}</p>
                    <EditIcon className="collection__actionIcons" onClick={() => toggleEdit(index)}/>
                    <DeleteIcon className="collection__actionIcons" onClick={() => handleAlert(product._id)}/>
                    {product.editMode ? (
                        <EditEntry currEndPoint={currEndPoint} id={product._id} currCollection={currCollection} setCurrCollection={setCurrCollection} productToEdit={productToEdit} />
                    ) : null}
                  </div>
                  ))}
                  </div>
                </div>
        </>
      ) : (
        <div>No Access to this collection</div>
      )}
    </>
  );
}
