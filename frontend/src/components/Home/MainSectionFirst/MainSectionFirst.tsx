import React from 'react';
import './MainSectionFirst.scss';
import bgVideo from '../../../assets/images/Home/main-section-1/bg-video.mp4'; // <== import video

const MainSectionFirst: React.FC = () => {
  return (
    <section className='main-section'>
      <video
        className="background-video"
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="main-section-content">
        <h1>System zgłaszania i zarządzania problemami infrastruktury publicznej</h1>
        <h2>Zgłoś awarię, monitoruj stan infrastruktury, ulepszaj swoją okolicę!</h2>
        <button className="report-button">Zgłoś awarię</button>
      </div>
    </section>
  );
};

export default MainSectionFirst;
