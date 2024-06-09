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

  if (isLoading) return <div>Loading...</div>;

  const Breakfast = mealTab
    ?.filter(item => item.category === 'Breakfast')
    .slice(0, 6);
  const Lunch = mealTab?.filter(item => item.category === 'Lunch').slice(0, 6);
  const Dinner = mealTab
    ?.filter(item => item.category === 'Dinner')
    .slice(0, 6);
  const AllMeals = mealTab.slice(0, 6);

  return (
    <div>
      <div className="my-20 text-center font-bold text-4xl">
        <h2>Meals by Category</h2>
      </div>
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList className="flex justify-center space-x-4 bg-yellow-200 font-bold">
          <Tab>Breakfast</Tab>
          <Tab>Lunch</Tab>
          <Tab>Dinner</Tab>
          <Tab>All</Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20 lg:p-20">
            {Breakfast.map(item => (
              <Tabcard key={item.id} item={item} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20 lg:p-20">
            {Lunch.map(item => (
              <Tabcard key={item.id} item={item} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20 lg:p-20">
            {Dinner.map(item => (
              <Tabcard key={item.id} item={item} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20 lg:p-20">
            {AllMeals.map(item => (
              <Tabcard key={item.id} item={item} />
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MealTab;
