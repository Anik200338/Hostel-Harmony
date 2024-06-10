import { Helmet } from 'react-helmet-async';
import Banner from '../../Component/Banner/Banner';
import Coustomers from '../../Component/Coustomers/Coustomers';
import Memberprices from '../../Component/Member/Memberprices';

import MealTab from '../../Component/Tab/MealTab';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner></Banner>
      <MealTab></MealTab>
      <Coustomers></Coustomers>
      <Memberprices></Memberprices>
    </div>
  );
};

export default Home;
