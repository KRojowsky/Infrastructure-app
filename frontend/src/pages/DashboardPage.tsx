import React, { useState } from 'react';
import Sidebar from '../components/Common/Sidebar/Sidebar';
import SidebarMobile from '../components/Common/SidebarMobile/SidebarMobile';
import Navbar from '../components/Common/Navbar/Navbar';
import Feed from '../components/Dashboard/Feed/Feed';
import InfoBoard from '../components/Common/InfoBoard/InfoBoard';

import '../styles/LayoutPage.scss';

const DashboardPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');

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
          <section className="layout-feed">
            <Feed
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
            />
          </section>

          <div className="layout-info">
            <InfoBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
