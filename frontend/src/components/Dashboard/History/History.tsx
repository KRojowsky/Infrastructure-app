import React, { useState, useEffect } from 'react';
import Sidebar from '../../Common/Sidebar/Sidebar';
import SidebarMobile from '../../Common/SidebarMobile/SidebarMobile';
import Navbar from '../../Common/Navbar/Navbar';
import FeedItem from '../../Dashboard/FeedItem/FeedItem';
import InfoBoard from '../../Common/InfoBoard/InfoBoard';
import Modal from '../../Common/Modal/Modal';
import PostModal from '../../Common/PostModal/PostModal';
import axios from 'axios';
import './History.scss';

type Status = 'pending' | 'in-progress' | 'done' | '';
type Priority = 'low' | 'medium' | 'high' | '';

interface ReportImage {
  id: number;
  image: string;
}

interface Report {
  id: number;
  title: string;
  description: string;
  category: string;
  status: Status;
  priority: Priority;
  created_at: string;
  images: ReportImage[];
  author_name: string;
  author_avatar?: string;
  city?: string;
  likes_count?: number;
  comments_count?: number;
}

interface Post {
  id: number;
  author: string;
  author_avatar?: string;
  time: string;
  city?: string;
  images?: string[];
  description?: string;
  status: Status;
  priority: Priority;
  category?: string;
  likes: number;
  comments: number;
}

const History: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [statusFilter, setStatusFilter] = useState<Status>('');
  const [priorityFilter, setPriorityFilter] = useState<Priority>('');

  const categoryLabels: Record<string, string> = {
    energy: 'Energetyka',
    water: 'Woda / kanalizacja',
    road: 'Infrastruktura drogowa',
    other: 'Inne',
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/reports/user/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
        });
        setReports(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReports();
  }, []);

  const filteredReports = reports.filter(
    (r) =>
      (statusFilter === '' || r.status === statusFilter) &&
      (priorityFilter === '' || r.priority === priorityFilter)
  );

  return (
    <div className="layout-layout">
      <Sidebar />
      <SidebarMobile />
      <div className="layout-main">
        <Navbar
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />
        <div className="layout-content">
          <section className="layout-feed history-feed">
            <h2>Moje zgłoszenia</h2>
            {filteredReports.length === 0 && <p>Brak zgłoszeń spełniających kryteria.</p>}
            {filteredReports.map((report) => {
              const post: Post = {
                id: report.id,
                author: report.author_name || 'Ty',
                author_avatar: report.author_avatar,
                time: new Date(report.created_at).toLocaleString(),
                city: report.city,
                images: report.images.map((img) => img.image),
                description: report.description,
                category: categoryLabels[report.category] || report.category,
                status: report.status,
                priority: report.priority,
                likes: report.likes_count ?? 0,
                comments: report.comments_count ?? 0,
              };
              return (
                <FeedItem
                  key={report.id}
                  post={post}
                  onClick={(p) => setSelectedPost(p)}
                />
              );
            })}
          </section>
          <div className="layout-info">
            <InfoBoard />
          </div>
        </div>
      </div>
      <Modal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)}>
        {selectedPost && <PostModal post={selectedPost} />}
      </Modal>
    </div>
  );
};

export default History;
