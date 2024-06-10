import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import TRequested from './TReqested';
import Swal from 'sweetalert2';

const SingleRequested = ({ Queries, index, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const { status, id, _id } = Queries;

  const {
    data: singlereq = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['singlereq', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/singlereq/${id}`);
      return res.data;
    },
  });

  const handleDelete = (cop, _id) => {
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
          `https://assignment-12-server-beige-tau.vercel.app/myDeleteReq?pop=${cop}&_id=${_id}`,
          {
            method: 'DELETE',
          }
        )
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your meal request has been deleted.',
                'success'
              );
              refetch(); // Refetch the data after deletion
            }
          })
          .catch(error => {
            Swal.fire('Error!', 'An error occurred while deleting.', 'error');
          });
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data...</div>;

  return (
    <>
      {singlereq.map(Tmyb => (
        <TRequested
          key={Tmyb.id}
          Tmyb={Tmyb}
          status={status}
          index={index}
          handleDelete={handleDelete}
          cop={_id}
        />
      ))}
    </>
  );
};

export default SingleRequested;
