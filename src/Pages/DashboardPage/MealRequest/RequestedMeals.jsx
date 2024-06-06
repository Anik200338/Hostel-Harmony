import React, { useContext } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import SingleRequested from './SingleRequested';

const RequestedMeals = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: Requested = {}, isLoading } = useQuery({
    queryKey: ['Requested', user],
    queryFn: async () => {
      const res = await axiosPublic.get(`/Requested/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  console.log(Requested);
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
        {Requested.map((Queries, index) => (
          <SingleRequested key={Queries.id} Queries={Queries} index={index} />
        ))}
      </table>
    </div>
  );
};

export default RequestedMeals;
