import React from 'react'
import './styles/collection.css'

export default function Collection() {
    return (
        <>
        <div>
            <h1>Collection Name</h1>

            <div className="collection__entryHeader">
                <h4>entries:</h4>
                <button>add new entry</button>
            </div>

            <div>
                <div className="collection__titles">
                    <h4>Product Name</h4>
                    <h4>product price</h4>
                    <h4>product image</h4>
                    <h4>on sale?</h4>
                    <h4>description</h4>
                    <p>Metcon 6</p>
                <p> 20000</p>
                <p>http://image.png</p>
                <p>true</p>
                <p>cool shoes</p>                  
                </div>
            </div>
        </div>
    </>
    )
}
