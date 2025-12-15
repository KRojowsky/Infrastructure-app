import React, { useState, useEffect } from 'react';
import './FeedItem.scss';

interface Post {
  id: number;
  author: string;
  author_avatar?: string | null;
  time: string;
  city: string;
  images: string[];
  description: string;
  status: string;
  priority: string;
  category: string;
  likes: number;
  comments: number;
  is_liked_by_me?: boolean;
}

interface Props {
  post: Post;
  onClick: (post: Post) => void;
}

const FeedItem: React.FC<Props> = ({ post, onClick }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.is_liked_by_me || false);

  const token = localStorage.getItem('access');
  const avatarUrl =
    post.author_avatar || 'http://localhost:8000/media/avatars/avatar.svg';

  const fetchPostState = async () => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:8000/api/reports/${post.id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLikes(data.likes);
      setLiked(data.is_liked_by_me);
    } catch (err) {
      console.error('Błąd pobierania stanu raportu:', err);
    }
  };

  useEffect(() => {
    fetchPostState();
  }, [post.id]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:8000/api/reports/${post.id}/like/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLiked(data.liked);
      setLikes((prev) => (data.liked ? prev + 1 : prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="feed-item" onClick={() => onClick(post)}>
      {/* HEADER */}
      <div className="feed-item-header">
        <img src={avatarUrl} alt={post.author} className="feed-item-avatar" />
        <div className="feed-item-header-text">
          <div className="feed-item-author">{post.author}</div>
          <div className="feed-item-time">
            {post.time}
            {post.city && <span className="feed-item-city"> • {post.city}</span>}
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <div className="feed-item-image-wrapper">
        {post.images.length > 1 && (
          <button onClick={prevImage} className="feed-item-nav feed-item-nav-left">‹</button>
        )}
        <img
          src={post.images[imageIndex]}
          alt={`Zgłoszenie ${post.id}`}
          className="feed-item-image"
        />
        {post.images.length > 1 && (
          <button onClick={nextImage} className="feed-item-nav feed-item-nav-right">›</button>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="feed-item-description">
        <p>{post.description}</p>
      </div>

      {/* META */}
      <div className="feed-item-meta">
        <span className="category">{post.category}</span>
        <span className={`status ${post.status}`}>
          {post.status === 'pending'
            ? 'Oczekujące'
            : post.status === 'in-progress'
            ? 'W trakcie'
            : 'Zakończone'}
        </span>
        <span className={`priority-label ${post.priority}`}>
          {post.priority === 'low'
            ? 'Niski'
            : post.priority === 'medium'
            ? 'Średni'
            : 'Wysoki'}
        </span>
      </div>

      {/* FEEDBACK */}
      <div className="feed-item-feedback">
        <div 
          className={`flag-btn ${liked ? 'flagged' : ''}`} 
          onClick={toggleLike}
          role="button"
        >
          <span className="flag-icon">🚩</span>
          <span className="flag-count">{likes}</span>
        </div>

        {/* Jeśli chcesz, komentarze w estetycznej formie */}
        <div className="comments-display">
          <span className="comment-icon">💬</span>
          <span className="comment-count">{post.comments}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
