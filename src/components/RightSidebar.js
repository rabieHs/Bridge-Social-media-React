import React from 'react';
import './RightSidebar.css';
import { FiUsers, FiGlobe, FiTrendingUp, FiGrid } from 'react-icons/fi';

const RightSidebar = () => {
  return (
    <aside className="right-sidebar">
      <div className="sidebar-section">
        <h3>Communities</h3>
        <div className="community-item">
          <div className="community-icon">
            <FiUsers />
          </div>
          <div className="community-info">
            <span className="community-name">Tech Enthusiasts</span>
            <span className="community-members">12.5k members</span>
          </div>
        </div>
        <div className="community-item">
          <div className="community-icon">
            <FiGlobe />
          </div>
          <div className="community-info">
            <span className="community-name">Global Network</span>
            <span className="community-members">45.2k members</span>
          </div>
        </div>
        <div className="community-item">
          <div className="community-icon">
            <FiGrid />
          </div>
          <div className="community-info">
            <span className="community-name">Startup Hub</span>
            <span className="community-members">8.3k members</span>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Active Networks</h3>
        <div className="network-item">
          <div className="network-icon">
            <FiTrendingUp />
          </div>
          <div className="network-info">
            <span className="network-name">AI & Machine Learning</span>
            <div className="network-status">
              <span className="status-dot"></span>
              <span>Active now</span>
            </div>
          </div>
        </div>
        <div className="network-item">
          <div className="network-icon">
            <FiTrendingUp />
          </div>
          <div className="network-info">
            <span className="network-name">Web Development</span>
            <div className="network-status">
              <span className="status-dot"></span>
              <span>2k online</span>
            </div>
          </div>
        </div>
        <div className="network-item">
          <div className="network-icon">
            <FiTrendingUp />
          </div>
          <div className="network-info">
            <span className="network-name">Data Science</span>
            <div className="network-status">
              <span className="status-dot"></span>
              <span>1.5k online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Suggested Connections</h3>
        <div className="connection-item">
          <img 
            src="https://ui-avatars.com/api/?name=Sarah+Wilson&background=random" 
            alt="Sarah Wilson" 
            className="connection-avatar"
          />
          <div className="connection-info">
            <span className="connection-name">Sarah Wilson</span>
            <span className="connection-title">Software Engineer</span>
          </div>
        </div>
        <div className="connection-item">
          <img 
            src="https://ui-avatars.com/api/?name=Mike+Johnson&background=random" 
            alt="Mike Johnson" 
            className="connection-avatar"
          />
          <div className="connection-info">
            <span className="connection-name">Mike Johnson</span>
            <span className="connection-title">Product Designer</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
