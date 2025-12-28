import React, { useState, useEffect } from 'react';
import './InfoBoard.scss';

interface Comment {
  id: number;
  content: string;
  created_at: string;
  author_name: string;
  author_avatar: string;
  is_authority: boolean;
  office_name?: string;
  report_id: number;
}

const InfoBoard: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem('access');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:8000/api/latest-comments/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error('Błąd pobierania komentarzy:', err);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="info-board">
      {comments.map((c) => (
        <div
          key={c.id}
          className={`info-board-card ${c.is_authority ? 'authority-comment' : ''}`}
        >
          <div className="info-board-header">
            <img
              src={c.author_avatar}
              alt={c.is_authority ? c.office_name : c.author_name}
              className="info-board-image"
            />
            <h4 className="info-board-title">
              {c.is_authority ? c.office_name : c.author_name}
            </h4>
          </div>
          <p className="info-board-message">{c.content}</p>
          <div className="info-board-date">{new Date(c.created_at).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

export default InfoBoard;
