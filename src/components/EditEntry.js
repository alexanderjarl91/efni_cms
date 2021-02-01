import React, { useState } from "react";
import './styles/editEntry.css'

export default function EditEntry ({currCollection, setCurrCollection, currEndPoint, productToEdit, id}) {

    const [updatedEntry, setUpdatedEntry] = useState({
        // _id: productToEdit.product._id,
        productName: productToEdit.productName, 
        productPrice: productToEdit.productPrice,
        productImg: productToEdit.productImg,
        productOnSale: productToEdit.productOnSale,
        productDescription: productToEdit.productDescription
    })


    const updateEntryInDb = (id) => { 
        // Fetch from the api with POST method to add do database
        fetch(`https://efni-api.herokuapp.com/${currEndPoint}/${id}`, { 
          method: 'PATCH', 
          body: JSON.stringify({
              productName: updatedEntry.productName,
              productPrice: updatedEntry.productPrice,
              productImg: updatedEntry.productImg,
              productOnSale: updatedEntry.productOnSale,
              productDescription: updatedEntry.productDescription
            }), 
          headers: {'Content-Type': 'application/json'}})
        .then((r) => r.json())
        .then((data) => {
            const currCollectionCopy = [...currCollection]
            const productIndex = currCollectionCopy.findIndex((product) => data._id === product._id)
            currCollectionCopy[productIndex] = data;
            setCurrCollection(currCollectionCopy);
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
        <>
        <form className="EditEntry__form" onSubmit={handleSubmit}>
            <input type="text" name="productName" value={updatedEntry.productName} onChange={handleChange}/>
            <input type="text" name="productPrice" value={updatedEntry.productPrice} onChange={handleChange}/>
            <input type="text" name="productImg" value={updatedEntry.productImg} onChange={handleChange}/>
            <input type="checkbox" name="productOnSale" checked={updatedEntry.productOnSale} onChange={handleChange}/>
            <textarea name="productDescription" value={updatedEntry.productDescription} onChange={handleChange}/>
            <button onClick={handleCancel}>Cancel</button>
            <button type='submit'>Update</button>
        </form>
        </>
    );
}