import React, { useState } from 'react';
import './Profile.scss';

const Profile: React.FC = () => {
  const avatar = 'https://randomuser.me/api/portraits/men/75.jpg';
  const firstName = 'Anna';
  const lastName = 'Nowak';
  const stats = {
    done: 12,
    inProgress: 3,
    pending: 2,
  };

  const allPosts = [
    { src: 'https://picsum.photos/200/350?random=1', status: 'done' },
    { src: 'https://picsum.photos/200/350?random=2', status: 'inProgress' },
    { src: 'https://picsum.photos/200/350?random=3', status: 'pending' },
    { src: 'https://picsum.photos/200/350?random=4', status: 'done' },
  ];

  const [filter, setFilter] = useState<'all' | 'done' | 'inProgress' | 'pending'>('all');

  const filteredPosts = filter === 'all' ? allPosts : allPosts.filter(p => p.status === filter);

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
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
            Wszystkie
          </button>
          <button className={filter === 'done' ? 'active' : ''} onClick={() => setFilter('done')}>
            Zrealizowane
          </button>
          <button className={filter === 'inProgress' ? 'active' : ''} onClick={() => setFilter('inProgress')}>
            W trakcie
          </button>
          <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>
            Oczekujące
          </button>
        </div>

        <div className="posts-gallery">
          {filteredPosts.map((post, index) => (
            <img key={index} src={post.src} alt={`Post ${index + 1}`} className="post-image" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
