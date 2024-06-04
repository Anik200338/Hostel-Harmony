import React, { useContext } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Provider/AuthProvider';

const Myreview = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: MyReview = {}, isLoading } = useQuery({
    queryKey: ['MyReview '],
    queryFn: async () => {
      const res = await axiosPublic.get(`/MyReview/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  console.log(MyReview);
  return (
    <div>
      <h2>this is my review</h2>
    </div>
  );
};

export default Myreview;
