import React, { useState } from 'react';
import './PostModal.scss';

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

interface PostModalProps {
  post: Post;
}

const PostModal: React.FC<PostModalProps> = ({ post }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [newComment, setNewComment] = useState('');

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  return (
    <div className="post-modal">
      <div className="post-modal-header">
        <img src={post.avatar} alt={post.author} className="post-modal-avatar" />
        <div>
          <strong>{post.author}</strong>
          <div className="post-modal-time">{post.time}</div>
        </div>
      </div>

      <div className="post-modal-image-wrapper">
        {post.images.length > 1 && (
          <button onClick={prevImage} className="post-modal-nav post-modal-nav-left">‹</button>
        )}
        <img
          src={post.images[imageIndex]}
          alt={`Post ${imageIndex}`}
          className="post-modal-image"
        />
        {post.images.length > 1 && (
          <button onClick={nextImage} className="post-modal-nav post-modal-nav-right">›</button>
        )}
      </div>

      <p className="post-modal-desc">{post.description}</p>

      <div className="post-modal-footer">
        <span>❤️ {post.likes} • 💬 {post.comments}</span>
        <div>Status: <strong>{post.status}</strong></div>
      </div>

      <div className="post-modal-comments">
        <h4>Komentarze</h4>
        <p>💬 Przykładowy komentarz użytkownika</p>
        <textarea
          placeholder="Dodaj komentarz..."
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button onClick={() => setNewComment('')}>Dodaj</button>
      </div>
    </div>
  );
};

export default PostModal;
