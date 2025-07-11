import React from 'react';
import './MainSectionThird.scss';
import { FaUsers, FaUser, FaFileAlt, FaTools, FaStar } from 'react-icons/fa';

const stats = [
  {
    icon: <FaUsers size={32} />,
    label: 'Ponad 40 000 użytkowników'
  },
  {
    icon: <FaUser size={32} />,
    label: 'Ponad 6 500 służb terytorialnych'
  },
  {
    icon: <FaFileAlt size={32} />,
    label: '75 000+ zgłoszeń'
  },
  {
    icon: <FaTools size={32} />,
    label: '70 000+ rozwiązanych problemów'
  },
  {
    icon: <FaStar size={32} />,
    label: '4.9 - ocena użytkowników'
  }
];

const MainSectionThird: React.FC = () => {
  return (
    <section className="stats-section">
      <h2 className="stats-title">Skala działania systemu</h2>

      <div className="stats-wrapper">
        {stats.map((item, index) => (
          <div key={index} className="stat-item">
            <div className="stat-icon">{item.icon}</div>
            <p className="stat-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainSectionThird;
