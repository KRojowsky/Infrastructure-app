import React from 'react';
import Navbar from './components/Navbar/Navbar';
import MainSectionFirst from './components/MainSectionFirst/MainSectionFirst';
import MainSectionSecond from './components/MainSectionSecond/MainSectionSecond';
import MainSectionThird from './components/MainSectionThird/MainSectionThird';
import MainSectionFourth from './components/MainSectionFourth/MainSectionFourth';
import MainSectionFifth from './components/MainSectionFifth/MainSectionFifth';
import MainSectionSixth from './components/MainSectionSixth/MainSectionSixth';


const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <MainSectionFirst />
      <MainSectionSecond />
      <MainSectionThird />
      <MainSectionFourth />
      <MainSectionFifth />
      <MainSectionSixth />
    </>
  );
};

export default App;
