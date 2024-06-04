import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import SingleReview from './singleReview';

const AllReview = () => {
  const axiosPublic = useAxiosPublic();
  const { data: Review = {}, isLoading } = useQuery({
    queryKey: ['Review '],
    queryFn: async () => {
      const res = await axiosPublic.get('/AllReview');
      return res.data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  console.log(Review);
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
        {Review.map((Queries, index) => (
          <SingleReview key={Queries.id} Queries={Queries} index={index} />
        ))}
      </table>
    </div>
  );
};

export default AllReview;
