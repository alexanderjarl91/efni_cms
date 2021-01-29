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
  const [productToEdit, setProductToEdit] = useState([]);

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


  // TODO / Checkout
  // Gera Delete conformation
  // Ath þegar collection síða er nýbúin að refreshast, og ýtt er á edit, kemur ekkert.
 
  // Þarf að tengja formið við rétt object, svo það opnist bara eitt, eins og er opnast 
  // tvö form og sama object birtist í báðum. Þarf líka að hreinsa state-ið áður en nýr er opnaður.
  // Spurning hvort að það þurfi að gera foreach eða if statement á EditEntry component í return
  // Þarf einhvern veginn að reseta productToEdit state-ið eftir að edit verður false

  const toggleEdit = (id) => {
    if (editMode !== false) {
        const currProduct = currCollection.find((product) => id === product._id)
        setProductToEdit(currProduct)
        console.log(productToEdit)
    } 
    // Kannski nota bara cancel til þess að loka, ekki toggla svo að það sé hægt að reseta state-ið
      setEditMode(!editMode);
      console.log(editMode)
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
                    <EditEntry setEditMode={setEditMode} productToEdit={productToEdit}/>
                ) : null}
              </React.Fragment>

            ))}
             
           
          </div>
        </div>
      </div>
    </>
  );
}
