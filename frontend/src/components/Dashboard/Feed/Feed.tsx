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
}

const Feed: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedPost, setSelectedPost] = useState<Report | null>(null);

  // Mapa kategorii po polsku
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

  return (
    <>
      <div className="feed">
        {reports.map((report) => (
          <FeedItem
            key={report.id}
            post={{
              id: report.id,
              author: report.author_name || 'Anonim',
              author_avatar: report.author_avatar || 'http://localhost:8000/media/avatars/avatar.svg',
              time: new Date(report.created_at).toLocaleString(),
              images: report.images.map((img) => img.image),
              description: report.description,
              category: categoryLabels[report.category] || report.category,
              status: report.status,
              priority: report.priority,
              likes: report.likes_count,        // <- pobierz z backendu
              comments: report.comments_count,  // <- pobierz z backendu
              is_liked_by_me: report.is_liked,  // <- pobierz z backendu
            }}
            onClick={setSelectedPost}
          />
        ))}
      </div>

      <Modal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)}>
        {selectedPost && <PostModal post={selectedPost} />}
      </Modal>
    </>
  );
};

export default Feed;
