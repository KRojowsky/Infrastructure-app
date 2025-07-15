import React, { useState } from 'react';
import PostModal from '../Common/PostModal/PostModal';
import './Profile.scss';

type PostStatus = 'done' | 'inProgress' | 'pending';

interface Post {
  src: string;
  status: PostStatus;
  images: string[];
  id: number;
  author: string;
  avatar: string;
  time: string;
  description: string;
  likes: number;
  comments: number;
  status: PostStatus;
}

const Profile: React.FC = () => {
  const avatar = 'https://randomuser.me/api/portraits/women/75.jpg';
  const firstName = 'Anna';
  const lastName = 'Nowak';
  const stats = {
    done: 12,
    inProgress: 3,
    pending: 2,
  };

  const allPosts: Post[] = [
    {
      id: 1,
      author: `${firstName} ${lastName}`,
      avatar,
      time: '2 godziny temu',
      images: [
        'https://picsum.photos/500/700?random=1',
        'https://picsum.photos/500/700?random=11',
      ],
      description: 'Opis posta numer 1',
      status: 'done',
      likes: 15,
      comments: 2,
    },
    {
      id: 2,
      author: `${firstName} ${lastName}`,
      avatar,
      time: '1 dzień temu',
      images: ['https://picsum.photos/500/700?random=2'],
      description: 'Opis posta numer 2',
      status: 'inProgress',
      likes: 8,
      comments: 1,
    },
    {
      id: 3,
      author: `${firstName} ${lastName}`,
      avatar,
      time: '3 dni temu',
      images: ['https://picsum.photos/500/700?random=3'],
      description: 'Opis posta numer 3',
      status: 'pending',
      likes: 0,
      comments: 0,
    },
    {
      id: 4,
      author: `${firstName} ${lastName}`,
      avatar,
      time: '5 dni temu',
      images: [
        'https://picsum.photos/500/700?random=4',
        'https://picsum.photos/500/700?random=44',
        'https://picsum.photos/500/700?random=444',
      ],
      description: 'Opis posta numer 4',
      status: 'done',
      likes: 20,
      comments: 5,
    },
  ];

  const [filter, setFilter] = useState<'all' | PostStatus>('all');
  const filteredPosts = filter === 'all' ? allPosts : allPosts.filter(p => p.status === filter);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <div className="profile">
      <div className="profile-top">
        <img src={avatar} alt={`${firstName} ${lastName}`} className="profile-avatar" />
        <div className="profile-info">
          <h2 className="profile-name">{firstName} {lastName}</h2>
          <div className="profile-stats">
            <div>Zrealizowane: <span>{stats.done}</span></div>
            <div>W trakcie: <span>{stats.inProgress}</span></div>
            <div>Oczekujące: <span>{stats.pending}</span></div>
          </div>
        </div>
      </div>

      <div className="profile-posts">
        <h3>Twoje zgłoszenia</h3>

        <div className="profile-filters">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Wszystkie</button>
          <button className={filter === 'done' ? 'active' : ''} onClick={() => setFilter('done')}>Zrealizowane</button>
          <button className={filter === 'inProgress' ? 'active' : ''} onClick={() => setFilter('inProgress')}>W trakcie</button>
          <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Oczekujące</button>
        </div>

        <div className="posts-gallery">
          {filteredPosts.map((post) => (
            <img
              key={post.id}
              src={post.images[0]}
              alt={`Post ${post.id}`}
              className="post-image"
              onClick={() => setSelectedPost(post)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>

      {selectedPost && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <PostModal post={selectedPost} />
            <button
              className="modal-close"
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
