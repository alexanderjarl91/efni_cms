import React, { useEffect, useState, useContext } from "react";
import "./styles/collection.css";
import NewEntry from "./NewEntry";
import { DataContext } from "../context";

export default function Collection() {
  const [addMode, setAddMode] = useState(false);
  const { products, setProducts } = useContext(DataContext);

  const toggleAddMode = () => {
    setAddMode(!addMode);
  };

  // Handle when delete button is clicked
  const handleDelete = (id) => {
    // Fetch from the api with DELETE method to delete from database
    fetch(`https://efni-api.herokuapp.com/nike/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      // Filtering and finding the name to remove from id
      .then(() => setProducts(products.filter((product) => id !== product._id)))
      .catch((error) => console.error(error));
  };

  // const productList = products.map((product)=>{
  //     <p>{product.productName}</p>
  // })

  return (
    <>
      {addMode ? (
        <NewEntry setProducts={setProducts} toggleAddMode={toggleAddMode} />
      ) : null}
      <div>
        <h1>Collection Name</h1>

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

            {products.map((product) => (
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
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
