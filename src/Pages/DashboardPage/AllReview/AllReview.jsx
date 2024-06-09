import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import SingleReview from './singleReview';
import ReactPaginate from 'react-paginate';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AllReview = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 10;

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/AllReview');
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const pageCount = Math.ceil(reviews.length / reviewsPerPage);
  const offset = currentPage * reviewsPerPage;
  const currentReviews = reviews.slice(offset, offset + reviewsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Re Title</th>
            <th>Recommended Product Name</th>
            <th>Date & Time</th>
            <th>Recommendation Owner Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentReviews.map((Queries, index) => (
            <SingleReview
              key={Queries.id}
              Queries={Queries}
              index={index + offset}
            />
          ))}
        </tbody>
      </table>
      <ReactPaginate
        onPageChange={handlePageChange}
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName={
          'pagination flex justify-center items-center space-x-2'
        }
        previousLinkClassName={'btn btn-primary'}
        nextLinkClassName={'btn btn-primary'}
        disabledClassName={'btn-disabled'}
        activeClassName={'bg-blue-500 text-white rounded-full'}
        pageClassName={'btn btn-secondary'}
        pageLinkClassName={'btn btn-secondary'}
      />
    </div>
  );
};

export default AllReview;
