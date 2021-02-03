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
            const r = await fetch(`http://localhost:5000/${currEndPoint}`, { 
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
    <div className="newEntry__formContainer">
        <form onSubmit={handleSubmit}>
            <label>
                productName
                <input type="text" name="productName" value={newEntry.productName} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                productPrice
                <input type="text" name="productPrice" value={newEntry.productPrice} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                productImg
                <input type="text" name="productImg" value={newEntry.productImg} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                onSale
                <input type="checkbox" name="productOnSale" checked={newEntry.productOnSale} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                description
                <textarea name="productDescription" value={newEntry.productDescription} onChange={handleChange}/>
            </label>
            <br/>
            <button onClick={handleCancel}>Cancel</button>
            <button type='submit'>Save</button>
        </form>
    
    </div>
    );
}