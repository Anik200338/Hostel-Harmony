import React, { useContext } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import SingleServeMeals from './SingleServeMeals';

const ServeMeals = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: ServeMeals = {}, isLoading } = useQuery({
    queryKey: ['ServeMeals'],
    queryFn: async () => {
      const res = await axiosPublic.get('/ServeMeals');
      return res.data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  console.log(ServeMeals);
  return (
    <div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Re Title</th>
            <th>Recommendedproduct Name</th>
            <th>Date&Time</th>
            <th>Recommendation Owner Name</th>
            <th>Details </th>
          </tr>
        </thead>
        {ServeMeals.map((Queries, index) => (
          <SingleServeMeals key={Queries.id} Queries={Queries} index={index} />
        ))}
      </table>
    </div>
  );
};

export default ServeMeals;