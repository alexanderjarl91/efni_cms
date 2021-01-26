import React from 'react'
import "./styles/header.css"

export default function Header() {
    return (
        <div className="header">
            <div className="header__userInfo">
                <img className="header__avatar" src="https://lh3.googleusercontent.com/proxy/6FebvxrOccNZDEmIfJPttIcZAPRUzXSIEFbOMc9x_JPbL3diqeUJtj_EDSTZHInGgsYhgJpd8ldiSoohR6SROcJveJbnqqp7rMViDgToFR6IKTvRxzzQ5lmhlsaerSMlQo7U"/>
                <p>Name</p>
                <p>admin</p>
            </div>
            <button>log out</button>
        </div>
    )
}
