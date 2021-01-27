import React, {useEffect, useState} from 'react'
import './styles/collection.css'
import NewEntry from "./NewEntry";

export default function Collection() {
    const [addMode, setAddMode ] = useState(false)
    const [products, setProducts] = useState([])
    
    useEffect( () => {
        const getData = async () => {
            try {
                const response = await fetch("https://efni-api.herokuapp.com/products"); 
                const data = await response.json();
                setProducts(data)
                console.log(products)

              } catch(err) {
                console.log(err);
              }
        }
        getData()
        
    }, [])

    const toggleAddMode = () => {
        setAddMode(!addMode)
    }

    // const productList = products.map((product)=>{
    //     <p>{product.productName}</p>
    // })

    return (
        <>
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


                    {products.map((product) => 
                    <>
                        
                        <p>{product.productName}</p>
                        <p>{product.productPrice}</p>
                        <p>{product.productImg}</p>
                        <p>{product.productOnSale? "true" : "false"}</p>
                        <p>{product.productDescription}</p>
                        <button>edit</button>
                    </>
                )}                
                </div>
            </div>
        </div>
        {addMode ? 
            <NewEntry setProducts={setProducts} toggleAddMode={toggleAddMode}/>
            : null
        }
       
    </>
    )
}
