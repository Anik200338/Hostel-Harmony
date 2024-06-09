import React, { useContext, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Provider/AuthProvider';
import SingleMyReview from './SingleMyReview';
import ReactPaginate from 'react-paginate';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Myreview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 10; // Number of reviews to display per page

  const {
    data: ForMe = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['ForMe', user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/MyReviewForMe/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data...</div>;

  // Calculate pagination variables
  const offset = currentPage * reviewsPerPage;
  const pageCount = Math.ceil(ForMe.length / reviewsPerPage);
  const currentReviews = ForMe.slice(offset, offset + reviewsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      {ForMe.length === 0 ? (
        <div>No reviews found.</div>
      ) : (
        <table className="table">
          {/* Table Header */}
          <thead>
            <tr>
              <th>Re Title</th>
              <th>Recommended Product Name</th>
              <th>Date & Time</th>
              <th>Recommendation Owner Name</th>
              <th>Details</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {currentReviews.map((myrev, index) => (
              <SingleMyReview
                key={myrev.id}
                myrev={myrev}
                index={index + offset}
              />
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
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

export default Myreview;
