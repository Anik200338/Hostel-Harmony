import React, { useState } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Tabcard from '../TabCard/Tabcard';

const MealTab = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const axiosPublic = useAxiosPublic();
  const { data: mealTab = [], isLoading } = useQuery({
    queryKey: ['mealTab'],
    queryFn: async () => {
      const res = await axiosPublic.get('/mealTab');
      return res.data;
    },
  });
  console.log(mealTab);
  if (isLoading) return <div>Loading...</div>;
  const Breakfast = mealTab?.filter(item => item.category === 'Breakfast');
  const Lunch = mealTab?.filter(item => item.category === 'Lunch');
  const Dinner = mealTab?.filter(item => item.category === 'Dinner');
  return (
    <div>
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList>
          <Tab>Breakfast</Tab>
          <Tab> Lunch</Tab>
          <Tab>Dinner</Tab>
          <Tab> All</Tab>
        </TabList>

        <TabPanel>
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20 lg:p-20"
            // data-aos="fade-down-right"
          >
            {Breakfast.map(item => (
              <Tabcard key={item.id} item={item} />
            ))}
          </div>
          <h2>{Breakfast.length}</h2>
        </TabPanel>
        <TabPanel>
          <h2>{Lunch.length}</h2>
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20 lg:p-20"
            // data-aos="fade-down-right"
          >
            {Lunch.map(item => (
              <Tabcard key={item.id} item={item} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <h2>{Dinner.length}</h2>
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20 lg:p-20"
            // data-aos="fade-down-right"
          >
            {Dinner.map(item => (
              <Tabcard key={item.id} item={item} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <h2>{mealTab.length}</h2>
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20 lg:p-20"
            // data-aos="fade-down-right"
          >
            {mealTab.map(item => (
              <Tabcard key={item.id} item={item} />
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MealTab;
