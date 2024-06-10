import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Provider/AuthProvider';
import SingleMyReview from './SingleMyReview';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Pagination from '../../../Component/common/Pagination';

const MyReview = () => {
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
      <div className="mb-10 h-full relative">
        {ForMe.length === 0 ? (
          <div>No reviews found.</div>
        ) : (
          <>
            <table className="table w-full ">
              {/* Table Header */}
              <thead>
                <tr>
                  <th></th>
                  <th>Meal title</th>
                  <th>User reviews</th>
                  <th>Likes</th>
                  <th>Reviews</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>View meal</th>
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
          </>
        )}
      </div>
      {/* Pagination at the footer */}
      <div className=" absolute left-1/2 bottom-0 mb-5">
        <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MyReview;
