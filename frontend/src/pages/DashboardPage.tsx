import React from 'react';
import Sidebar from '../components/common/Sidebar/Sidebar';
import SidebarMobile from '../components/common/SidebarMobile/SidebarMobile';
import Navbar from '../components/common/Navbar/Navbar';
import Feed from '../components/Dashboard/Feed/Feed';
import InfoBoard from '../components/common/InfoBoard/InfoBoard';

import '../styles/DashboardPage.scss';

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <SidebarMobile />

      <div className="dashboard-main">
        <Navbar />

        <div className="dashboard-content">
          <section className="dashboard-feed">
            <Feed />
          </section>

          <aside className="dashboard-info">
            <InfoBoard />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
