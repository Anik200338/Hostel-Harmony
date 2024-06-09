import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import TmyBody from './TmyBody';
import Swal from 'sweetalert2';

const SingleMyReview = ({ myrev, index }) => {
  const axiosPublic = useAxiosPublic();
  const { review, id, _id } = myrev;

  // Fetching MyReviewTitle
  const { data: MyReviewTitle = [], isLoading } = useQuery({
    queryKey: ['MyReviewTitle', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/MyReviewTitleFor/${id}`);
      return res.data;
    },
  });

  // Function to handle review deletion
  const handleDelete = (cop, _id) => {
    console.log(cop, _id);
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
          `https://assignment-12-server-beige-tau.vercel.app/myDelete?pop=${cop}&_id=${_id}`,
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

  return (
    <>
      {MyReviewTitle.map(Tmyb => (
        <TmyBody
          key={Tmyb.id}
          Tmyb={Tmyb}
          reviewmy={review}
          index={index}
          handleDelete={handleDelete}
          cop={_id}
        />
      ))}
    </>
  );
};

export default SingleMyReview;
