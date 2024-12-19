import React from 'react';
import { FiTrendingUp, FiExternalLink } from 'react-icons/fi';
import './TrendingSidebar.css';

const TrendingSidebar = () => {
  return (
    <aside className="trending-sidebar">
      <div className="trending-header">
        <h2><FiTrendingUp /> Trending Topics</h2>
      </div>

      <div className="trending-topics">
        <div className="trending-item">
          <div className="topic-category">Technology</div>
          <h3>#ArtificialIntelligence</h3>
          <p>125K posts</p>
        </div>

        <div className="trending-item">
          <div className="topic-category">Programming</div>
          <h3>#ReactJS</h3>
          <p>89K posts</p>
        </div>

        <div className="trending-item">
          <div className="topic-category">Design</div>
          <h3>#UIDesign</h3>
          <p>67K posts</p>
        </div>
      </div>

      <div className="trending-news">
        <h3>Latest News</h3>
        <div className="news-item">
          <h4>New Features in React 19</h4>
          <p>The latest update brings significant improvements...</p>
          <a href="#" className="read-more">
            Read More <FiExternalLink />
          </a>
        </div>
        <div className="news-item">
          <h4>Web Development Trends 2024</h4>
          <p>Discover the most popular technologies...</p>
          <a href="#" className="read-more">
            Read More <FiExternalLink />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default TrendingSidebar;
