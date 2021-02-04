import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext, DataContext } from "../context";
import "./styles/navigation.css";
import matterLogo from "../images/matter-logo.svg"

export default function Navigation({ goToCollection }) {
  const { user } = useContext(AuthContext);
  const { userData } = useContext(DataContext);
  const { collections } = useContext(DataContext);
  const [currentUserRole, setCurrentUserRole] = useState("editor"); //current users role
  const [showCollections, setShowCollections] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)


  //find currentUser in secondary user database
  const currentUser = userData.find((x) => x.email === user.email);

  useEffect(() => {
    setCurrentUserRole("admin");
  }, [userData]);


  const handleShowCollections = () => {
    setShowCollections(!showCollections)
  }

  const handleShowAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel)
  }

  return (
    <>
    <div className="navbar__navWrapper">
      <div className="navbar">
        <nav>
          <div className="navbar__header">
            <img className="navbar__logo" src={matterLogo} alt="logo"/>
            <span className="navbar__line"></span>
          </div>

          <div className="navigation__items">
            <Link className="navigation__link" to="/">Dashboard</Link>
            <Link className="navigation__link" to="/profile">Profile</Link>
            <div className="navigation__dropdown">
              <p onClick={handleShowCollections} className="navigation__link ">Collections</p>
            
              {showCollections && currentUser? 
              <>
                  {currentUser.access
                    ? currentUser.access.map((database) => (
                        <div key={database}>
                          <Link
                            className="navigation__sublink"
                            to={{
                              pathname: "/collection",
                              search: `?name=${database}`,
                            }}
                          >
                            {database}
                          </Link>
                        </div>
                      ))
                    : <p>no access</p>}
                </>

              : console.log('not showing')}
              </div>
            
            

            {currentUser ? (
              <>
                {currentUser.role === "admin" ? (
                  <div className="adminNav navigation__adminDropdown">
                    <button onClick={handleShowAdminPanel} className="navigation__link">Admin nav</button>
                    {showAdminPanel? <div className="navigation__adminSublink"><Link className="navigation__link" to="/users">
                      <p>Users</p>
                    </Link>
                    <Link className="navigation__link" to="/api-generator">
                      <p>API generator</p>
                    </Link></div> : null}
                    
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </nav>
      </div>
    </div>
    </>
  );
}
