import React, { useEffect, useState, useContext } from "react";
import queryString from 'query-string';
import "./styles/collection.css";
import NewEntry from "./NewEntry";
import EditEntry from "./EditEntry";
import { AuthContext, DataContext } from "../context";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function Collection(props) {
  // const { products, setProducts } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const { userData } = useContext(DataContext);
  const [addMode, setAddMode] = useState(false);
  const [currEndPoint, setCurrEndPoint] = useState('');
  const [currCollection, setCurrCollection] = useState([]);
//   const [editMode, setEditMode] = useState(false);
  const [productToEdit, setProductToEdit] = useState([]);
  const [allowAccess, setAllowAccess] = useState([false]);

  useEffect(() => {
     console.log('collection component rerenderd')
  }, [currCollection])

  useEffect(() => {
    const collectionQs = queryString.parse(window.location.search);
    const foundUser = userData.find(x => x.email === user.email); // Get the current user object that contains the data access
    // If the user has the requeststring in his access array we allow him access
    if(foundUser.access.includes(collectionQs.name)) {
      // Get the collection from the url
      setCurrEndPoint(collectionQs.name);
      setAllowAccess(true);
  
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
    } else {
      setAllowAccess(false);
    }
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


  // TODO / Checkout
  // Gera Delete conformation
  // Gera submit on enter
  
 

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


  return (
    <>
      {allowAccess ? (
        <>
        {addMode ? (
          <NewEntry setCurrCollection={setCurrCollection} currEndPoint={currEndPoint} toggleAddMode={toggleAddMode} />
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

              {currCollection.map((product, index) => (
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
                  <EditIcon className="collection__actionIcons" onClick={() => toggleEdit(index)}/>
                  <DeleteIcon className="collection__actionIcons" onClick={() => handleDelete(product._id)}/>
                  {product.editMode ? (
                      <EditEntry currEndPoint={currEndPoint} key={product._id} id={product._id} currCollection={currCollection} setCurrCollection={setCurrCollection} productToEdit={productToEdit} />
                  ) : null}
                </React.Fragment>

              ))}
              
            
            </div>
          </div>
        </div>
        </>
        ) : (<div>No Access to this collection</div>)
      }
    </>
  );
}
