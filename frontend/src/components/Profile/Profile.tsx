import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedItem from '../Dashboard/FeedItem/FeedItem';
import Modal from '../Common/Modal/Modal';
import PostModal from '../Common/PostModal/PostModal';
import './Profile.scss';

type Status = 'done' | 'in-progress' | 'pending';
type Priority = 'low' | 'medium' | 'high';

interface User {
  first_name: string;
  last_name: string;
  avatar?: string | null;
}

interface ReportImage { id: number; image: string; }

interface Post {
  id: number;
  author: string;
  author_avatar?: string | null;
  time: string;
  city?: string;
  images?: string[];
  description?: string;
  category?: string;
  status: Status;
  priority: Priority;
  likes: number;
  comments: number;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [loading, setLoading] = useState(true);

  const categoryLabels: Record<string, string> = {
    energy: 'Energetyka',
    water: 'Woda / kanalizacja',
    road: 'Infrastruktura drogowa',
    other: 'Inne',
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/users/me/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
        });
        setUser(res.data);
      } catch (err) { console.error(err); }
    };
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/reports/user/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
        });
        const mapped: Post[] = res.data.map((report: any) => ({
          id: report.id,
          author: report.author_name || 'Ty',
          author_avatar: report.author_avatar,
          time: new Date(report.created_at).toLocaleString(),
          city: report.city,
          images: report.images?.map((img: ReportImage) => img.image) || [],
          description: report.description,
          category: categoryLabels[report.category] || report.category,
          status: report.status,
          priority: report.priority,
          likes: report.likes_count ?? 0,
          comments: report.comments_count ?? 0,
        }));
        setPosts(mapped);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchUser();
    fetchPosts();
  }, []);

  const filteredPosts = filter === 'all' ? posts : posts.filter(p => p.status === filter);
  const stats = {
    done: posts.filter(p => p.status === 'done').length,
    inProgress: posts.filter(p => p.status === 'in-progress').length,
    pending: posts.filter(p => p.status === 'pending').length,
  };
  const avatarUrl = user?.avatar || 'https://i.pravatar.cc/150?u=' + (user?.first_name || 'placeholder');

  return (
    <div className="profile">
      <div className="profile-top">
        <img src={avatarUrl} alt={`${user?.first_name} ${user?.last_name}`} className="profile-avatar" />
        <div className="profile-info">
          <h2>{user?.first_name} {user?.last_name}</h2>
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
          <button className={filter === 'in-progress' ? 'active' : ''} onClick={() => setFilter('in-progress')}>W trakcie</button>
          <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Oczekujące</button>
        </div>
        {loading ? <p>Ładowanie...</p> :
          filteredPosts.length === 0 ? <p>Brak zgłoszeń</p> :
          <div className="posts-gallery">
            {filteredPosts.map(post => (
              <FeedItem key={post.id} post={post} onClick={(p) => setSelectedPost(p)} />
            ))}
          </div>
        }
      </div>
      <Modal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)}>
        {selectedPost && <PostModal post={selectedPost} />}
      </Modal>
    </div>
  );
};

export default Profile;
