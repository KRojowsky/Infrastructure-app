import React, { useState } from 'react';
import Sidebar from '../components/Common/Sidebar/Sidebar';
import SidebarMobile from '../components/Common/SidebarMobile/SidebarMobile';
import Navbar from '../components/Common/Navbar/Navbar';
import Profile from '../components/Profile/Profile';
import InfoBoard from '../components/Common/InfoBoard/InfoBoard';
import '../styles/LayoutPage.scss';

type Status = 'pending' | 'in-progress' | 'done' | '';
type Priority = 'low' | 'medium' | 'high' | '';

const ProfilePage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<Status>('');
  const [priorityFilter, setPriorityFilter] = useState<Priority>('');

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
            <Profile />
          </section>
          <div className="layout-info">
            <InfoBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
