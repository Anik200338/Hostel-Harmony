import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import SingleServeMeals from './SingleServeMeals';
import ReactPaginate from 'react-paginate';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const {
    data: ServeMeals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['ServeMeals', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ServeMeals?search=${search}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const handleSearch = e => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
    setCurrentPage(0); // Reset to first page on new search
    refetch();
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const currentItems = ServeMeals.slice(startIndex, startIndex + itemsPerPage);
  const pageCount = Math.ceil(ServeMeals.length / itemsPerPage);

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Type here"
          name="search"
          className="input input-bordered w-full max-w-xs mr-2"
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Title</th>
            <th>User</th>
            <th>Review</th>
            <th>Actions</th>
            <th>Delete</th>
          </tr>
        </thead>
        {currentItems.map((Queries, index) => (
          <SingleServeMeals
            key={Queries.id}
            Queries={Queries}
            index={index + startIndex} // Adjust the index to match the current page
          />
        ))}
      </table>
      <div className="flex justify-center my-4">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
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
    </div>
  );
};

export default ServeMeals;
