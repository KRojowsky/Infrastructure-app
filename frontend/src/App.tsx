import React from 'react';
import Navbar from './components/Navbar/Navbar';
import MainSectionFirst from './components/MainSectionFirst/MainSectionFirst';
import MainSectionSecond from './components/MainSectionSecond/MainSectionSecond';


const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <MainSectionFirst />
      <MainSectionSecond />
    </>
  );
};

export default App;
