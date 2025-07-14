import React, { useState } from 'react';
import './FeedItem.scss';

interface Post {
    id: number;
    author: string;
    avatar: string;
    time: string;
    images: string[];
    description: string;
    status: string;
    likes: number;
    comments: number;
}

const FeedItem: React.FC<{ post: Post }> = ({ post }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  return (
    <div className="feed-item">
      <div className="feed-item-header">
        <img src={post.avatar} alt={post.author} className="feed-item-avatar" />
        <div>
          <div className="feed-item-author-top">{post.author}</div>
          <div className="feed-item-time">{post.time}</div>
        </div>
      </div>

      <div className="feed-item-image-wrapper">
        {post.images.length > 1 && (
          <button onClick={prevImage} className="feed-item-nav feed-item-nav-left">‹</button>
        )}
        <img src={post.images[imageIndex]} alt={`Zgłoszenie ${post.id}`} className="feed-item-image"/>
        {post.images.length > 1 && (
          <button onClick={nextImage} className="feed-item-nav feed-item-nav-right">›</button>
        )}
      </div>
      

      <div className="feed-item-footer">
        <div>
          ❤️ {post.likes}  💬 {post.comments}
        </div>
        <span>Status: <strong>{post.status}</strong></span>
      </div>

      <div className="feed-item-description">
        <span className="feed-item-author">{post.author}</span>
        <p className="feed-item-text">{post.description}</p>
      </div>
    </div>
  );
};

export default FeedItem;
