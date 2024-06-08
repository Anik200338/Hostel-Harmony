import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Tsingle from './Tsingle';

const SingleServeMeals = ({ Queries, index }) => {
  const axiosPublic = useAxiosPublic();
  const { status, id, _id, User } = Queries; // Correctly destructure User object
  const { email } = User; // Destructure email from User object

  const { data: singlereq = [], isLoading } = useQuery({
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
          cop={_id}
          User={email} // Pass the email to the Tsingle component
        />
      ))}
    </>
  );
};

export default SingleServeMeals;
