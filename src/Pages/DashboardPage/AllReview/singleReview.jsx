import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Tbody from './Tbody';
import Swal from 'sweetalert2';

const SingleReview = ({ Queries, index }) => {
  const axiosPublic = useAxiosPublic();
  const { review, id, _id } = Queries;

  const {
    data: ReviewTitle = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['ReviewTitle', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/ReviewTitle/${id}`);
      return res.data;
    },
  });

  const handleDelete = (pop, _id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-12-server-beige-tau.vercel.app/myDelete?pop=${pop}&_id=${_id}`,
          {
            method: 'DELETE',
          }
        )
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your card has been deleted.', 'success');
            }
          });
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <>
      {ReviewTitle.map(Tb => (
        <Tbody
          key={Tb.id}
          Tb={Tb}
          review2={review}
          index={index}
          handleDelete={handleDelete}
          pop={_id}
        />
      ))}
    </>
  );
};

export default SingleReview;
