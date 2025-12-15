import React, { useState, useEffect } from 'react';
import './PostModal.scss';

interface Comment {
  id: number;
  content: string;
  author_name: string;
  author_avatar?: string;
  created_at: string;
  author_role?: string; // Załóżmy, że zwracamy role autora (np. "authority" dla władz terytorialnych)
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  images: string[];
  description: string;
  status: 'pending' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  category: string;
  likes: number;
  comments: number;
  is_liked_by_me?: boolean;
}

interface Props {
  post: Post;
}

const PostModal: React.FC<Props> = ({ post }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(!!post.is_liked_by_me);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const token = localStorage.getItem('access');

  // Mapowanie statusów, priorytetów i kategorii na czytelne etykiety
  const statusLabels: Record<string, string> = {
    pending: 'Oczekujące',
    'in-progress': 'W trakcie',
    done: 'Zakończone',
  };

  const priorityLabels: Record<string, string> = {
    low: 'Niski',
    medium: 'Średni',
    high: 'Wysoki',
  };

  const categoryLabels: Record<string, string> = {
    energy: 'Energetyka',
    water: 'Woda / kanalizacja',
    road: 'Infrastruktura drogowa',
    other: 'Inne',
  };

  const fetchComments = async () => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:8000/api/reports/${post.id}/comments/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Błąd pobierania komentarzy:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post.id]);

  const nextImage = () => setImageIndex((prev) => (prev + 1) % post.images.length);
  const prevImage = () => setImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length);

  const toggleLike = async () => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:8000/api/reports/${post.id}/like/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.liked) {
        setLikes((prev) => prev + 1);
        setLiked(true);
      } else {
        setLikes((prev) => Math.max(prev - 1, 0));
        setLiked(false);
      }
    } catch (err) {
      console.error('Błąd like (modal):', err);
    }
  };

  const addComment = async () => {
    if (!token || !newComment.trim()) return;
    try {
      const res = await fetch(`http://localhost:8000/api/reports/${post.id}/comments/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });
      const data = await res.json();
      setComments((prev) => [...prev, data]);
      setNewComment('');

      // Jeśli autor jest z władz terytorialnych, wyślij event do InfoBoard
      if (data.author_role === 'authority') {
        const event = new CustomEvent('newAuthorityComment', { detail: data });
        window.dispatchEvent(event);
      }
    } catch (err) {
      console.error('Błąd dodawania komentarza:', err);
    }
  };

  return (
    <div className="post-modal">
      {/* HEADER */}
      <div className="post-modal-header">
        <img src={post.avatar} alt={post.author} className="post-modal-avatar" />
        <div>
          <strong>{post.author}</strong>
          <div className="post-modal-time">{post.time}</div>
        </div>
      </div>

      {/* IMAGE */}
      <div className="post-modal-image-wrapper">
        {post.images.length > 1 && (
          <button onClick={prevImage} className="post-modal-nav post-modal-nav-left">‹</button>
        )}
        <img src={post.images[imageIndex]} alt={`Post ${imageIndex}`} className="post-modal-image" />
        {post.images.length > 1 && (
          <button onClick={nextImage} className="post-modal-nav post-modal-nav-right">›</button>
        )}
      </div>

      {/* DESCRIPTION */}
      <p className="post-modal-desc">{post.description}</p>

      {/* META: STATUS / PRIORYTET / KATEGORIA */}
      <div className="post-modal-meta">
        <span className={`category`}>{categoryLabels[post.category] || post.category}</span>
        <span className={`status ${post.status}`}>{statusLabels[post.status]}</span>
        <span className={`priority-label ${post.priority}`}>{priorityLabels[post.priority]}</span>
      </div>

      {/* FOOTER: LAJKI + LICZBA KOMENTARZY */}
      <div className="post-modal-footer">
        <button className={`like-btn ${liked ? 'liked' : ''}`} onClick={toggleLike}>
          ❤️ {likes}
        </button>
        <span>💬 {comments.length}</span>
      </div>

      {/* KOMENTARZE */}
      <div className="post-modal-comments">
        <h4>Komentarze ({comments.length})</h4>

        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <img
              src={c.author_avatar || 'http://localhost:8000/media/avatars/avatar.svg'}
              alt={c.author_name}
              className="comment-avatar"
            />
            <div className="comment-content">
              <div className="comment-header">
                <strong>{c.author_name}</strong>
                <span className="comment-time">{new Date(c.created_at).toLocaleString()}</span>
              </div>
              <p>{c.content}</p>
            </div>
          </div>
        ))}

        <div className="comment-add">
          <textarea
            placeholder="Dodaj komentarz..."
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Dodaj</button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
