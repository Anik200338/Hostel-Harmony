import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import SingleRequested from './SingleRequested';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Pagination from '../../../Component/common/Pagination';

const RequestedMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const mealsPerPage = 10;

  const {
    data: requestedMeals = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['requestedMeals', user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Requested/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data...</div>;

  const pageCount = Math.ceil(requestedMeals.length / mealsPerPage);
  const offset = currentPage * mealsPerPage;
  const currentMeals = requestedMeals.slice(offset, offset + mealsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div className="mb-10 h-full relative overflow-x-auto">
        {requestedMeals.length === 0 ? (
          <div>No requested meals found.</div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Meal title</th>
                <th>Likes</th>
                <th>Reviews</th>
                <th>status</th>
                <th> cancel </th>
              </tr>
            </thead>
            <tbody>
              {currentMeals.map((Queries, index) => (
                <SingleRequested
                  key={Queries.id}
                  Queries={Queries}
                  index={index + offset}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="absolute inset-x-0 lg:left-1/2 bottom-0 mb-5">
        <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default RequestedMeals;
