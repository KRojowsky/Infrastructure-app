import React from 'react';
import Navbar from '../components/Home/Navbar/Navbar';
import MainSectionFirst from '../components/Home/MainSectionFirst/MainSectionFirst';
import MainSectionSecond from '../components/Home/MainSectionSecond/MainSectionSecond';
import MainSectionThird from '../components/Home/MainSectionThird/MainSectionThird';
import MainSectionFourth from '../components/Home/MainSectionFourth/MainSectionFourth';
import MainSectionFifth from '../components/Home/MainSectionFifth/MainSectionFifth';
import MainSectionSixth from '../components/Home/MainSectionSixth/MainSectionSixth';

const HomePage: React.FC = () => (
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

export default HomePage;
