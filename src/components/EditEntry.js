import React, { useState } from "react";
import './styles/editEntry.css'

export default function EditEntry ({toggleEdit, setProducts, currEndPoint}) {

    const [updatedEntry, setUpdatedEntry] = useState({
        // This needs to have clicked product info
        productName: '', 
        productPrice: '',
        productImg: '',
        productOnSale: false,
        productDescription: ''
    })

    const updateEntryInDb = () => {
        // Fetch from the api with POST method to add do database
        fetch(`https://efni-api.herokuapp.com/${currEndPoint}`, { 
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
        // Setting the data to state and using concat to add to it
        .then((data) => setProducts(products => products.concat(data))) // What function to use here?
        .catch((error) => console.error(error))
      }

    // Handle submit of the form
    const handleSubmit = (e) => {
    e.preventDefault()
    updateEntryInDb()
    toggleEdit()
  }

    // Handle when form changes
    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUpdatedEntry({...updatedEntry, [e.target.name]: value})
        console.log(value)  
    }

    console.log(updatedEntry)

    const handleCancel = (e) => {
        // Toggle back
        toggleEdit()
    }

    return (
    <div className="EditEntry__formContainer">
        <form className="EditEntry__form" onSubmit={handleSubmit}>
            <input type="text" name="productName" value={updatedEntry.productName} onChange={handleChange}/>
            <input type="text" name="productPrice" value={updatedEntry.productPrice} onChange={handleChange}/>
            <input type="text" name="productImg" value={updatedEntry.productImg} onChange={handleChange}/>
            <input type="checkbox" name="productOnSale" checked={updatedEntry.productOnSale} onChange={handleChange}/>
            <textarea name="productDescription" value={updatedEntry.productDescription} onChange={handleChange}/>
            <button onClick={handleCancel}>Cancel</button>
            <button type='submit'>Update</button>
        </form>
    
    </div>
    );
}