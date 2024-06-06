import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Tsingle from './Tsingle';

const SingleServeMeals = ({ Queries, index }) => {
  const axiosPublic = useAxiosPublic();
  const { status, id, _id } = Queries;
  const { data: singlereq = {}, isLoading } = useQuery({
    queryKey: ['singlereq', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/singlereq/${id}`);
      return res.data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  console.log(singlereq);
  return (
    <>
      {singlereq.map(Tmyb => (
        <Tsingle
          key={Tmyb.id}
          Tmyb={Tmyb}
          status={status}
          index={index}
          // handleDelete={handleDelete}
          cop={_id}
        />
      ))}
    </>
  );
};

export default SingleServeMeals;
