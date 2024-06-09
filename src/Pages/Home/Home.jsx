import Banner from '../../Component/Banner/Banner';
import Coustomers from '../../Component/Coustomers/Coustomers';
import Memberprices from '../../Component/Member/Memberprices';

import MealTab from '../../Component/Tab/MealTab';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <MealTab></MealTab>
      <Coustomers></Coustomers>
      <Memberprices></Memberprices>
      <div className="w-full mt-20"></div>
    </div>
  );
};

export default Home;
