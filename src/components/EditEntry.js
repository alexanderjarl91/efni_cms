import React, { useState } from "react";
import './styles/editEntry.css'
import firebase from "firebase/app";
import "firebase/auth";

export default function EditEntry ({currCollection, setCurrCollection, currEndPoint, productToEdit, id}) {

    const [updatedEntry, setUpdatedEntry] = useState({
        // _id: productToEdit.product._id,
        productName: productToEdit.productName, 
        productPrice: productToEdit.productPrice,
        productImg: productToEdit.productImg,
        productOnSale: productToEdit.productOnSale,
        productDescription: productToEdit.productDescription
    })


    const updateEntryInDb = async (id) => { 
        const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
        // Fetch from the api with POST method to add do database
        fetch(`https://efni-api.herokuapp.com//${currEndPoint}/${id}`, { 
          method: 'PATCH', 
          body: JSON.stringify({
              productName: updatedEntry.productName,
              productPrice: updatedEntry.productPrice,
              productImg: updatedEntry.productImg,
              productOnSale: updatedEntry.productOnSale,
              productDescription: updatedEntry.productDescription
            }), 
            headers: {'Content-Type': 'application/json', 'Authorization': idToken}})
        .then((r) => r.json())
        .then((data) => {
            if(data.msg) {
                return;
            } else {
                const currCollectionCopy = [...currCollection]
                const productIndex = currCollectionCopy.findIndex((product) => data._id === product._id)
                currCollectionCopy[productIndex] = data;
                setCurrCollection(currCollectionCopy);
            }
        }) 
        .catch((error) => console.error(error))
      }

    // Handle submit of the form
    const handleSubmit = (e) => {
    e.preventDefault()
    updateEntryInDb(id)
    const copyOfCurrCollection = [...currCollection]
    copyOfCurrCollection.forEach((collection) => {
        collection.editMode = false
    })
    setCurrCollection(copyOfCurrCollection)
  }

    // Handle when form changes
    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUpdatedEntry({...updatedEntry, [e.target.name]: value})
        console.log(value);
    }

    // console.log(updatedEntry)

    const handleCancel = () => {
        const copyOfCurrCollection = [...currCollection]
        copyOfCurrCollection.forEach((collection) => {
            collection.editMode = false
        })
        setCurrCollection(copyOfCurrCollection)
    }

    return (
        <div className="editEntry__formOverlay" key={updatedEntry._id}>
            <div className="editEntry__formContainer">
                <form className="editEntry__form" onSubmit={handleSubmit}>
                    <label>Product name</label>
                    <input type="text" name="productName" placeholder="Product name ..." value={updatedEntry.productName} onChange={handleChange} required/> <br/>
                    <label>Product price</label>
                    <input type="number" name="productPrice" placeholder="Product price ..." value={updatedEntry.productPrice} onChange={handleChange} required/> <br/>
                    <label>Product image url</label>
                    <input type="url" name="productImg" placeholder="Product image url ..." value={updatedEntry.productImg} onChange={handleChange}/> <br/>
                    <label>On sale?</label>
                    <input className="editEntry__checkbox" type="checkbox" name="productOnSale" checked={updatedEntry.productOnSale} onChange={handleChange}/> <br/>
                    <label>Product description</label>
                    <textarea name="productDescription" placeholder="Product description ..." value={updatedEntry.productDescription} onChange={handleChange}/> <br/>
                    <div className="editEntry__buttonContainer">  
                        <button className="formButtons" onClick={handleCancel}>Cancel</button>
                        <button className="formButtons" type='submit'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}