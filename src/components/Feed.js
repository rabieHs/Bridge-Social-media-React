import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import CreatePost from './CreatePost';
import './Feed.css';

const API_BASE_URL = 'http://localhost:8080/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('english');
  const [activeFilter, setActiveFilter] = useState('following');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Comprehensive list of languages with native names and flags
  const languages = [
    { code: 'english', name: 'English', flag: '🇬🇧', region: 'Popular' },
    { code: 'spanish', name: 'Español', flag: '🇪🇸', region: 'Popular' },
    { code: 'french', name: 'Français', flag: '🇫🇷', region: 'Popular' },
    { code: 'german', name: 'Deutsch', flag: '🇩🇪', region: 'Popular' },
    { code: 'chinese', name: '中文', flag: '🇨🇳', region: 'Popular' },
    { code: 'japanese', name: '日本語', flag: '🇯🇵', region: 'Popular' },
    { code: 'korean', name: '한국어', flag: '🇰🇷', region: 'Popular' },
    { code: 'arabic', name: 'العربية', flag: '🇸🇦', region: 'Popular' },
    { code: 'hindi', name: 'हिन्दी', flag: '🇮🇳', region: 'Popular' },
    { code: 'portuguese', name: 'Português', flag: '🇵🇹', region: 'Europe' },
    { code: 'italian', name: 'Italiano', flag: '🇮🇹', region: 'Europe' },
    { code: 'dutch', name: 'Nederlands', flag: '🇳🇱', region: 'Europe' },
    { code: 'polish', name: 'Polski', flag: '🇵🇱', region: 'Europe' },
    { code: 'greek', name: 'Ελληνικά', flag: '🇬🇷', region: 'Europe' },
    { code: 'swedish', name: 'Svenska', flag: '🇸🇪', region: 'Europe' },
    { code: 'danish', name: 'Dansk', flag: '🇩🇰', region: 'Europe' },
    { code: 'finnish', name: 'Suomi', flag: '🇫🇮', region: 'Europe' },
    { code: 'norwegian', name: 'Norsk', flag: '🇳🇴', region: 'Europe' },
    { code: 'russian', name: 'Русский', flag: '🇷🇺', region: 'Europe' },
    { code: 'turkish', name: 'Türkçe', flag: '🇹🇷', region: 'Asia' },
    { code: 'thai', name: 'ไทย', flag: '🇹🇭', region: 'Asia' },
    { code: 'vietnamese', name: 'Tiếng Việt', flag: '🇻🇳', region: 'Asia' },
    { code: 'indonesian', name: 'Bahasa Indonesia', flag: '🇮🇩', region: 'Asia' },
    { code: 'malay', name: 'Bahasa Melayu', flag: '🇲🇾', region: 'Asia' },
    { code: 'persian', name: 'فارسی', flag: '🇮🇷', region: 'Asia' },
    { code: 'bengali', name: 'বাংলা', flag: '🇧🇩', region: 'Asia' },
    { code: 'urdu', name: 'اردو', flag: '🇵🇰', region: 'Asia' },
    { code: 'tamil', name: 'தமிழ்', flag: '🇱🇰', region: 'Asia' }
  ];

  // Group languages by region
  const groupedLanguages = languages.reduce((acc, lang) => {
    if (!acc[lang.region]) {
      acc[lang.region] = [];
    }
    acc[lang.region].push(lang);
    return acc;
  }, {});

  const fetchPosts = async (selectedLanguage) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`, {
        params: { language: selectedLanguage },
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });

      setPosts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.response?.status === 403 
        ? 'CORS Error: Please enable CORS on the server'
        : 'Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(language);
  }, [language]);

  const handleNewPost = async (newPost) => {
    try {
      const formData = new FormData();
      formData.append('userId', newPost.userId);
      formData.append('text', newPost.text);
      formData.append('language', language);
      
      if (newPost.attachments?.length > 0) {
        newPost.attachments.forEach(file => {
          formData.append('file', file.originalFile);
        });
      }

      await axios.post(`${API_BASE_URL}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      });

      fetchPosts(language);
    } catch (err) {
      console.error('Error creating post:', err);
      alert(err.response?.status === 403 
        ? 'CORS Error: Please enable CORS on the server'
        : 'Failed to create post. Please try again.');
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    // Here you would typically fetch posts based on the filter
  };

  return (
    <div className="feed">
      <div className="feed-header">
        <div className="feed-top">
          <h2>Your Feed</h2>
          <div className="language-select-wrapper">
            <button 
              className="language-select-button"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <span className="selected-language">
                {languages.find(l => l.code === language)?.flag}
                {languages.find(l => l.code === language)?.name}
              </span>
              <span className="language-icon">🌐</span>
            </button>
            
            {showLanguageDropdown && (
              <div className="language-dropdown">
                {Object.entries(groupedLanguages).map(([region, langs]) => (
                  <div key={region} className="language-group">
                    <div className="language-group-header">{region}</div>
                    {langs.map((lang) => (
                      <button
                        key={lang.code}
                        className={`language-option ${language === lang.code ? 'active' : ''}`}
                        onClick={() => {
                          handleLanguageChange(lang.code);
                          setShowLanguageDropdown(false);
                        }}
                      >
                        <span className="language-flag">{lang.flag}</span>
                        <span className="language-name">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="feed-filters">
          <button 
            className={`filter-button ${activeFilter === 'following' ? 'active' : ''}`}
            onClick={() => handleFilterChange('following')}
          >
            <span className="filter-icon">👥</span>
            Following
          </button>
          <button 
            className={`filter-button ${activeFilter === 'popular' ? 'active' : ''}`}
            onClick={() => handleFilterChange('popular')}
          >
            <span className="filter-icon">🔥</span>
            Popular
          </button>
          <button 
            className={`filter-button ${activeFilter === 'latest' ? 'active' : ''}`}
            onClick={() => handleFilterChange('latest')}
          >
            <span className="filter-icon">⚡</span>
            Latest
          </button>
          <button 
            className={`filter-button ${activeFilter === 'trending' ? 'active' : ''}`}
            onClick={() => handleFilterChange('trending')}
          >
            <span className="filter-icon">📈</span>
            Trending
          </button>
        </div>
      </div>

      <CreatePost onPostCreated={handleNewPost} />
      
      <div className="posts-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading posts...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={() => fetchPosts(language)}>Try Again</button>
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts yet. Be the first to post!</p>
          </div>
        ) : (
          posts.map((post) => (
            <Post 
              key={post.id} 
              post={{
                ...post,
                username: post.userName || 'Anonymous',
                avatarColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                userTag: post.userRole || 'Member',
                content: post.text,
                timestamp: post.timestamp || new Date(),
                tags: post.tags || []
              }} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
