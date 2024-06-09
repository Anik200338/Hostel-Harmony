import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import SingleRequested from './SingleRequested';
import ReactPaginate from 'react-paginate';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const RequestedMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const mealsPerPage = 10;

  const { data: requestedMeals = [], isLoading } = useQuery({
    queryKey: ['requestedMeals', user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Requested/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const pageCount = Math.ceil(requestedMeals.length / mealsPerPage);
  const offset = currentPage * mealsPerPage;
  const currentMeals = requestedMeals.slice(offset, offset + mealsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Re Title</th>
            <th>Recommendedproduct Name</th>
            <th>Date&Time</th>
            <th>Recommendation Owner Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentMeals.map((Queries, index) => (
            <SingleRequested
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

export default RequestedMeals;
