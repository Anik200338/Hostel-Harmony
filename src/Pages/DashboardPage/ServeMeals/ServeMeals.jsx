import React, { useContext, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import SingleServeMeals from './SingleServeMeals';

const ServeMeals = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const { data: ServeMeals = {}, isLoading } = useQuery({
    queryKey: ['ServeMeals', search],
    queryFn: async () => {
      const res = await axiosPublic.get(`/ServeMeals?search=${search}`);
      return res.data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  console.log(ServeMeals);

  const handleSearch = e => {
    e.preventDefault();
    const searchText = e.target.search.value;
    console.log(e.target.search.value);
    setSearch(searchText);
  };
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
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Re Title</th>
            <th>Recommendedproduct Name</th>
            <th>Date&Time</th>
            <th>Recommendation Owner Name</th>
            <th>Details </th>
          </tr>
        </thead>
        {ServeMeals.map((Queries, index) => (
          <SingleServeMeals key={Queries.id} Queries={Queries} index={index} />
        ))}
      </table>
    </div>
  );
};

export default ServeMeals;
