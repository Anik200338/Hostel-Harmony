// import React from 'react';

import Banner from '../../Component/Banner/Banner';
import Memberprices from '../../Component/Member/Memberprices';

import MealTab from '../../Component/Tab/MealTab';
// import Tab from '../../Component/Tab/Tab';
// import Tab from '../../Component/Tab/Tab';

// import Slider from '../component/slider/slider';
// import Banner from '../component/Banner/Banner';
// import Section from '../component/Section';
// import RecentQurey from '../component/Recent/RecentQurey';
// import Members from '../component/Members';
// import Coustomers from '../component/Coustomers';
// import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div>
      <h2>this Home</h2>
      <Banner></Banner>
      <MealTab></MealTab>
      <Memberprices></Memberprices>
      {/* <Slider></Slider>
      <div className="w-full mt-20">
        <Banner></Banner>
        <Section></Section>
        <RecentQurey></RecentQurey>
        <Coustomers></Coustomers>
        <Members></Members>
      </div> */}
    </div>
  );
};

export default Home;