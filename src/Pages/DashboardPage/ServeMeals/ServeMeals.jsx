import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import SingleServeMeals from './SingleServeMeals';

import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Pagination from '../../../Component/common/Pagination';

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
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

  const handlePageChange = ({ selected }) => {
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
            <th>Title</th>
            <th>Email</th>
            <th>name</th>
            <th>Status</th>
            <th> serve button.</th>
          </tr>
        </thead>
        {currentItems.map((Queries, index) => (
          <SingleServeMeals
            key={Queries.id}
            Queries={Queries}
            index={index + 1 + startIndex}
            refetch={refetch}
          />
        ))}
      </table>
      <div className=" absolute inset-x-0 lg:left-1/4 bottom-0 mb-5">
        <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ServeMeals;
