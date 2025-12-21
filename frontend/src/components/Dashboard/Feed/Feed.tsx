import React, { useState, useEffect } from 'react';
import FeedItem from '../FeedItem/FeedItem';
import Modal from '../../Common/Modal/Modal';
import PostModal from '../../Common/PostModal/PostModal';
import './Feed.scss';
import axios from 'axios';

interface ReportImage {
  id: number;
  image: string;
}

interface Report {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  created_at: string;
  latitude: number;
  longitude: number;
  images: ReportImage[];
  author_name: string;
  author_avatar?: string;
  city?: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
}

interface FeedProps {
  statusFilter: string;
  priorityFilter: string;
}

const Feed: React.FC<FeedProps> = ({
  statusFilter,
  priorityFilter,
}) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedPost, setSelectedPost] = useState<Report | null>(null);

  const categoryLabels: Record<string, string> = {
    energy: 'Energetyka',
    water: 'Woda / kanalizacja',
    road: 'Infrastruktura drogowa',
    other: 'Inne',
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/reports/');
        setReports(res.data);
      } catch (error) {
        console.error('Błąd podczas pobierania raportów:', error);
      }
    };
    fetchReports();
  }, []);

  const filteredReports = reports.filter((report) => {
    const statusMatch =
      !statusFilter || report.status === statusFilter;

    const priorityMatch =
      !priorityFilter || report.priority === priorityFilter;

    return statusMatch && priorityMatch;
  });

  return (
    <>
      <div className="feed">
        {filteredReports.map((report) => (
          <FeedItem
            key={report.id}
            post={{
              id: report.id,
              author: report.author_name || 'Anonim',
              author_avatar: report.author_avatar,
              time: new Date(report.created_at).toLocaleString(),
              city: report.city || '',
              images: report.images.map((img) => img.image),
              description: report.description,
              category: categoryLabels[report.category] || report.category,
              status: report.status,
              priority: report.priority,
              likes: report.likes_count,
              comments: report.comments_count,
              is_liked_by_me: report.is_liked,
            }}
            onClick={setSelectedPost}
          />
        ))}

        {filteredReports.length === 0 && (
          <div className="feed-empty">
            Brak zgłoszeń dla wybranych filtrów
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)}>
        {selectedPost && <PostModal post={selectedPost} />}
      </Modal>
    </>
  );
};

export default Feed;
