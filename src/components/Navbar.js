import React from 'react';
import './Navbar.css';
import { FiSearch, FiBell, FiMessageCircle, FiUser, FiSettings } from 'react-icons/fi';
import { RiEarthLine } from 'react-icons/ri';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <RiEarthLine className="logo-icon" />
          <span>bridge</span>
        </div>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search bridge..." />
        </div>
      </div>

      <div className="navbar-right">
        <button className="nav-item">
          <FiBell />
          <span className="notification-badge">3</span>
        </button>
        <button className="nav-item">
          <FiMessageCircle />
          <span className="notification-badge">5</span>
        </button>
        <button className="nav-item">
          <FiSettings />
        </button>
        <button className="nav-item profile">
          <img 
            src="https://ui-avatars.com/api/?name=John+Doe&background=random" 
            alt="Profile" 
            className="profile-pic"
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
