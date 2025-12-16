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
  images: ReportImage[];
  author_name: string;
  author_avatar?: string;
}

const History: React.FC = () => {
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
        const res = await axios.get(
          'http://localhost:8000/api/reports/user/',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
          }
        );
        setReports(res.data);
      } catch (error) {
        console.error('Błąd przy pobieraniu historii:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="layout-layout">
      <Sidebar />
      <SidebarMobile />

      <div className="layout-main">
        <Navbar />

        <div className="layout-content">
          {/* ŚRODEK – HISTORIA */}
          <section className="layout-feed history-feed">
            <h2>Moje zgłoszenia</h2>

            {reports.length === 0 && (
              <p className="history-empty">
                Nie dodałeś jeszcze żadnych zgłoszeń.
              </p>
            )}

            {reports.map((report) => (
              <FeedItem
                key={report.id}
                post={{
                  id: report.id,
                  author: report.author_name || 'Ty',
                  author_avatar:
                    report.author_avatar ||
                    'http://localhost:8000/media/avatars/avatar.svg',
                  time: new Date(report.created_at).toLocaleString(),
                  images: report.images.map((img) => img.image),
                  description: report.description,
                  category:
                    categoryLabels[report.category] || report.category,
                  status: report.status,
                  priority: report.priority,
                  likes: 0,
                  comments: 0,
                }}
                onClick={setSelectedPost}
              />
            ))}
          </section>

          {/* PRAWA KOLUMNA – INFOBOARD */}
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
