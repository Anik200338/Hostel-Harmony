import React, { useContext } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Provider/AuthProvider';
import SingleMyReview from './SingleMyReview';

const Myreview = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: ForMe = {}, isLoading } = useQuery({
    queryKey: ['ForMe', user],
    queryFn: async () => {
      const res = await axiosPublic.get(`/MyReviewForMe/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  console.log(ForMe);
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
        {ForMe?.map((myrev, index) => (
          <SingleMyReview key={myrev.id} myrev={myrev} index={index} />
        ))}
      </table>
    </div>
  );
};

export default Myreview;
