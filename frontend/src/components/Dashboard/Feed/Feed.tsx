import React from 'react';
import FeedItem from '../FeedItem/FeedItem';
import './Feed.scss';

const mockPosts = [
  {
    id: 1,
    author: 'Anna Nowak',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    time: '10 minut temu',
    images: [
      'https://placehold.co/600x300?text=Zdjęcie+1',
      'https://placehold.co/600x300?text=Zdjęcie+2',
    ],
    description: 'Uszkodzony chodnik na ul. Głównej.',
    status: 'Oczekujące',
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    author: 'Jan Kowalski',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    time: '1 godzina temu',
    images: [
      'https://placehold.co/600x300?text=Zdjęcie+A',
      'https://placehold.co/600x300?text=Zdjęcie+B',
      'https://placehold.co/600x300?text=Zdjęcie+C',
    ],
    description: 'Nieświecąca latarnia przy przedszkolu.',
    status: 'W trakcie',
    likes: 7,
    comments: 1,
  },
];

const Feed: React.FC = () => {
  return (
    <div className="feed">
      {mockPosts.map((post) => (
        <FeedItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
