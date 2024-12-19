import React from 'react';
import { FiHome, FiCompass, FiBookmark, FiUser, FiSettings, FiHelpCircle } from 'react-icons/fi';
import './LeftSidebar.css';

const LeftSidebar = () => {
  return (
    <aside className="left-sidebar">
      <div className="sidebar-section">
        <nav className="nav-menu">
          <a href="#" className="nav-item active">
            <FiHome />
            <span>Home</span>
          </a>
          <a href="#" className="nav-item">
            <FiCompass />
            <span>Explore</span>
          </a>
          <a href="#" className="nav-item">
            <FiBookmark />
            <span>Bookmarks</span>
          </a>
          <a href="#" className="nav-item">
            <FiUser />
            <span>Profile</span>
          </a>
        </nav>
      </div>

      <div className="sidebar-section">
        <h3>Your Communities</h3>
        <div className="community-list">
          <a href="#" className="community-item">
            <div className="community-icon">🎮</div>
            <span>Gaming</span>
          </a>
          <a href="#" className="community-item">
            <div className="community-icon">💻</div>
            <span>Programming</span>
          </a>
          <a href="#" className="community-item">
            <div className="community-icon">🎨</div>
            <span>Design</span>
          </a>
        </div>
      </div>

      <div className="sidebar-section">
        <nav className="footer-menu">
          <a href="#" className="nav-item">
            <FiSettings />
            <span>Settings</span>
          </a>
          <a href="#" className="nav-item">
            <FiHelpCircle />
            <span>Help</span>
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default LeftSidebar;
