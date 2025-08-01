import React from 'react';
import Sidebar from '../components/Common/Sidebar/Sidebar';
import SidebarMobile from '../components/Common/SidebarMobile/SidebarMobile';
import Navbar from '../components/Common/Navbar/Navbar';
import Feed from '../components/Dashboard/Feed/Feed';
import InfoBoard from '../components/Common/InfoBoard/InfoBoard';

import '../styles/LayoutPage.scss';

const LayoutPage: React.FC = () => {
  return (
    <div className="layout-layout">
      <Sidebar />
      <SidebarMobile />

      <div className="layout-main">
        <Navbar />

        <div className="layout-content">
          <section className="layout-feed">
            <Feed />
          </section>

          <div className="layout-info">
            <InfoBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
