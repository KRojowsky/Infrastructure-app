import React from 'react';
import Navbar from './components/Navbar/Navbar';
import MainSectionFirst from './components/MainSectionFirst/MainSectionFirst';
import MainSectionSecond from './components/MainSectionSecond/MainSectionSecond';
import MainSectionThird from './components/MainSectionThird/MainSectionThird';
import MainSectionFourth from './components/MainSectionFourth/MainSectionFourth';


const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <MainSectionFirst />
      <MainSectionSecond />
      <MainSectionThird />
      <MainSectionFourth />
    </>
  );
};

export default App;
