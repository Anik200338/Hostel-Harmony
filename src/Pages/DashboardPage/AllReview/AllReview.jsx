import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SingleReview from './singleReview';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Pagination from '../../../Component/common/Pagination';

const AllReview = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 10;

  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/AllReview');
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching reviews...</div>;

  const pageCount = Math.ceil(reviews.length / reviewsPerPage);
  const offset = currentPage * reviewsPerPage;
  const currentReviews = reviews.slice(offset, offset + reviewsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="">
      <div className="mb-10  overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>reviews</th>
              <th>likes</th>
              <th>reviews count</th>
              <th>Delete</th>
              <th>meal Details</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.map((Queries, index) => (
              <SingleReview
                key={Queries.id}
                Queries={Queries}
                index={index + offset}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute inset-x-0 lg:left-1/4 bottom-0 mb-5">
        <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default AllReview;
