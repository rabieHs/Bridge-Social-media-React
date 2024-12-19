import React, { useState } from 'react';
import './CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!text && attachments.length === 0) || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const newPost = {
        userId: '1', // This would normally come from authentication
        text: text,
        attachments: attachments
      };

      await onPostCreated(newPost);
      setText('');
      setAttachments([]);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      originalFile: file // Keep the original file for upload
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    URL.revokeObjectURL(newAttachments[index].url);
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="create-post-header">
        <div className="user-avatar">
          <span className="user-avatar-icon">👤</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="post-input"
        />
      </div>
      
      {attachments.length > 0 && (
        <div className="attachments-preview">
          {attachments.map((file, index) => (
            <div key={index} className="attachment-item">
              <span>{file.name}</span>
              <button
                type="button"
                className="remove-attachment"
                onClick={() => removeAttachment(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="divider" />
      
      <div className="post-actions">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file-input"
          id="file-input"
          accept=".pdf,.doc,.docx,.txt,image/*"
        />
        <label 
          htmlFor="file-input" 
          className={`file-label ${attachments.length > 0 ? 'has-file' : ''}`}
        >
          📎 Add Files
        </label>
        <button 
          type="submit" 
          className="post-button"
          disabled={(!text && attachments.length === 0) || isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
