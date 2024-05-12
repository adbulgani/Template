import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/TemplateManager.css"; // Import CSS file for styling

const TemplateManager = () => {
  const [showMenu, setShowMenu] = useState(false); // State to control the visibility of the burger menu
  const [userDetails, setUserDetails] = useState(null); // State to store user details

  // Function to toggle the visibility of the burger menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Effect to retrieve user details from local storage when the component mounts
  useEffect(() => {
    const userDetailsFromStorage = localStorage.getItem("user");
    // Parse JSON string to object
    setUserDetails(JSON.parse(userDetailsFromStorage));
    console.log(userDetails);
  }, []);

  return (
    <div className="template-manager-container">
      {/* Header */}
      <header className="header">
        <div className="title">Template Manager App</div>
        {/* Burger menu */}
        <div className="burger-menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </header>

      {/* Burger menu content */}
      {showMenu && (
        <div className="burger-menu-content">
          {/* Display user details */}
          <div>User Details</div>
          <div>Name: {userDetails["name"]}</div>
          <div>Desg: {userDetails["designation"]}</div>
          {/* Add more user details as needed */}
        </div>
      )}

      {/* Main content */}
      <div className="main-content">
        <h2>Template Manager</h2>
        {/* Buttons to navigate to other pages */}
        <Link to="/create-template">
          <button>Create Template</button>
        </Link>
        <Link to="/view-templates">
          <button>View Templates</button>
        </Link>
      </div>
    </div>
  );
};

export default TemplateManager;
