import React, { useState } from "react";
import './styles/newEntry.css';
import firebase from "firebase/app";
import "firebase/auth";


export default function NewEntry ({toggleAddMode, setCurrCollection, currEndPoint}) {

    const [newEntry, setNewEntry] = useState({
        productName: '',
        productPrice: '',
        productImg: '',
        productOnSale: false,
        productDescription: ''
    })

    const addEntryToDb = async () => {
        try {
            const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            // Fetch from the api with POST method to add do database
            const r = await fetch(`https://efni-api.herokuapp.com/${currEndPoint}`, { 
            method: 'POST',
            body: JSON.stringify({
                productName: newEntry.productName,
                productPrice: newEntry.productPrice,
                productImg: newEntry.productImg,
                productOnSale: newEntry.productOnSale,
                productDescription: newEntry.productDescription
                }), 
            headers: {'Content-Type': 'application/json', 'Authorization': idToken}})
            const data = await r.json();
            // Setting the data to state and using concat to add to it
            setCurrCollection(products => products.concat(data))
        } catch (error) { 
            console.log(error)
        }
      }

    // Handle submit of the form
    const handleSubmit = (e) => {
    e.preventDefault()
    addEntryToDb()
    toggleAddMode()
  }

    // Handle when form changes
    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setNewEntry({...newEntry, [e.target.name]: value})
    }

    const handleCancel = () => {
        // Toggle back to collections
        toggleAddMode()
    }

    return (  
    <div className="newEntry__formOverlay">
    <div className="newEntry__formContainer">
        <form onSubmit={handleSubmit}>
            <label>Product name</label>
            <input type="text" name="productName" value={newEntry.productName} onChange={handleChange} required/>
            <br/>
            <label>Product price</label>
                <input type="number" name="productPrice" value={newEntry.productPrice} onChange={handleChange} required/>
            <br/>
            <label>Product image url</label>
                <input type="url" name="productImg" value={newEntry.productImg} onChange={handleChange}/>
            <br/>
            <label>On sale?</label>
                <input className="newEntry__checkbox" type="checkbox" name="productOnSale" checked={newEntry.productOnSale} onChange={handleChange}/>
            <br/>
            <label>Product description</label>
                <textarea name="productDescription" value={newEntry.productDescription} onChange={handleChange}/>
            <br/>
            <div className="newEntry__buttonContainer">  
                <button className="newEntry__formButtons" onClick={handleCancel}>Cancel</button>
                <button className="newEntry__formButtons" type='submit'>Save</button>
            </div>
        </form>
        </div>
    </div>
    );
}