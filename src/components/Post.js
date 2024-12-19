import React, { useState } from 'react';
import { FiHeart, FiMessageSquare, FiShare2, FiBookmark, FiDownload, FiMoreHorizontal } from 'react-icons/fi';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaFileAlt } from 'react-icons/fa';
import './Post.css';

const Post = ({ post = {} }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [voteCount, setVoteCount] = useState(post?.voteCount || 0);

  const getRandomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleVote = (type) => {
    setVoteCount(prev => type === 'up' ? prev + 1 : prev - 1);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleDownload = () => {
    if (post.file) {
      try {
        const base64Data = post.file.includes('base64,') 
          ? post.file.split('base64,')[1] 
          : post.file;

        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const fileName = post.fileName || 'document.pdf';
        
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 100);
      } catch (error) {
        console.error('Error downloading file:', error);
        alert('Error downloading file. Please try again.');
      }
    }
  };

  const avatarColor = getRandomColor();
  const avatarInitial = post.username ? post.username[0].toUpperCase() : '?';

  return (
    <article className="post">
      <div className="post-header">
        <div className="post-user">
          <div className="user-avatar" style={{ backgroundColor: avatarColor }}>
            {avatarInitial}
          </div>
          <div className="user-info">
            <div className="user-meta">
              <span className="username">{post.username}</span>
              <span className="post-time">{formatTimestamp(post.timestamp)}</span>
            </div>
            {post.userTag && (
              <span className="user-tag">{post.userTag}</span>
            )}
          </div>
        </div>
        <button className="action-icon-button">
          <FiMoreHorizontal />
        </button>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <div className="post-image">
            <img src={post.image} alt="Post content" />
          </div>
        )}
        {post.tags && (
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
        {post.file && (
          <div className="attachment-container">
            <div className="attachment-box">
              <div className="attachment-info">
                <span className="file-name">{post.fileName || 'Document.pdf'}</span>
                <span className="file-type">PDF Document</span>
              </div>
              <button className="download-button" onClick={handleDownload}>
                <FiDownload />
                <span>Download</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="post-stats">
        <div className="stat-group">
          <div className="vote-buttons">
            <button 
              className={`vote-button ${voteCount > 0 ? 'upvoted' : ''}`}
              onClick={() => handleVote('up')}
            >
              <BiUpvote />
            </button>
            <span className="vote-count">{voteCount}</span>
            <button 
              className={`vote-button ${voteCount < 0 ? 'downvoted' : ''}`}
              onClick={() => handleVote('down')}
            >
              <BiDownvote />
            </button>
          </div>
          <span className="stat-divider">•</span>
          <button className="stat-button">
            <FiMessageSquare />
            <span>{post.commentCount || 0}</span>
          </button>
        </div>
        
        <div className="post-actions">
          <button 
            className={`action-button ${isLiked ? 'active' : ''}`}
            onClick={handleLike}
          >
            <FiHeart />
          </button>
          <button className="action-button">
            <FiShare2 />
          </button>
          <button 
            className={`action-button ${isSaved ? 'active' : ''}`}
            onClick={handleSave}
          >
            <FiBookmark />
          </button>
        </div>
      </div>

      {post.commentCount > 0 && (
        <div className="post-preview">
          <div className="preview-line" />
          <button className="preview-button">
            View {post.commentCount} comment{post.commentCount !== 1 ? 's' : ''}
          </button>
        </div>
      )}
    </article>
  );
};

export default Post;
