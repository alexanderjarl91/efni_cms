import React, { useEffect, useState, useContext } from "react";
import queryString from 'query-string';
import "./styles/collection.css";
import NewEntry from "./NewEntry";
import EditEntry from "./EditEntry";
import { DataContext } from "../context";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function Collection(props) {
  const [addMode, setAddMode] = useState(false);
  const [currEndPoint, setCurrEndPoint] = useState('');
  const [currCollection, setCurrCollection] = useState([]);
  const { products, setProducts } = useContext(DataContext);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Get the collection from the url
    const collectionQs = queryString.parse(window.location.search);
    setCurrEndPoint(collectionQs.name);

    const getCollection = async () => {
      try {
        const response = await fetch(`https://efni-api.herokuapp.com/${collectionQs.name}`);
        const data = await response.json();
        setCurrCollection(data);
      } catch(err) {
        console.log(err)
      }
    }

    getCollection();
  }, [window.location.search]);

  const toggleAddMode = () => {
    setAddMode(!addMode);
  };

  // Handle when delete button is clicked
  const handleDelete = (id) => {
    // Fetch from the api with DELETE method to delete from database
    fetch(`https://efni-api.herokuapp.com/${currEndPoint}/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      // Filtering and finding the name to remove from id
      .then(() => setCurrCollection(currCollection.filter((product) => id !== product._id)))
      .catch((error) => console.error(error));
  };

  // TODO
  // Make a editEntry component which gets info on porduct from collection
  // Get the clicked products info by id
  // Display the info in editable inputs in return
  // Update and cancel button
  // Make a PATCH method fetch call on update and close edit
  // setEditProduct?
  


  const toggleEdit = (id) => {
      setEditMode(!editMode);
      console.log("it works" + id)
  }

  return (
    <>
      {addMode ? (
        <NewEntry setProducts={setCurrCollection} currEndPoint={currEndPoint} toggleAddMode={toggleAddMode} />
      ) : null}
      <div>
        <h1>{currEndPoint}</h1>

        <div className="collection__entryHeader">
          <h4>entries:</h4>
          <button onClick={toggleAddMode}>add new entry</button>
        </div>

        <div>
          <div className="collection__titles">
            <h4>Product Name</h4>
            <h4>product price</h4>
            <h4>product image</h4>
            <h4>on sale?</h4>
            <h4>description</h4>
            <h4></h4>
            <h4></h4>

            {currCollection.map((product) => (
              <React.Fragment key={product._id}>
                <p>{product.productName}</p>
                <p>{product.productPrice}</p>
                <a
                  className="collection__imageLink"
                  href={product.productImg}
                  target="blank"
                >
                  Link to image
                </a>
                <p>{product.productOnSale ? "true" : "false"}</p>
                <p>{product.productDescription}</p>
                <EditIcon className="collection__actionIcons" onClick={() => toggleEdit(product._id)}/>
                <DeleteIcon className="collection__actionIcons" onClick={() => handleDelete(product._id)}/>
                {editMode ? (
                    <EditEntry/>
                ) : null}
              </React.Fragment>

            ))}
             
           
          </div>
        </div>
      </div>
    </>
  );
}
