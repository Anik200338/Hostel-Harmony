import React, { useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllMeals = () => {
  const axiosPublic = useAxiosPublic();
  const [sortField, setSortField] = useState('like');
  const [sortOrder, setSortOrder] = useState('asc');

  const {
    data: AllMeals = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['AllMeals', sortField, sortOrder],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/AllMeals?sortBy=${sortField}&order=${sortOrder}`
      );
      return res.data;
    },
  });

  const handleDelete = id => {
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
        fetch(`http://localhost:5000/myDeleteMeal/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your meal has been deleted.', 'success');
              refetch();
            }
          });
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <div className="flex justify-between my-4">
        <h2 className="text-3xl">All Meals</h2>
        <h2 className="text-3xl">Total Meals: {AllMeals.length}</h2>
      </div>
      <div className="flex justify-end my-4">
        <select
          className="select select-bordered"
          value={sortField}
          onChange={e => setSortField(e.target.value)}
        >
          <option value="like">Sort by Likes</option>
          <option value="review">Sort by Reviews</option>
        </select>
        <select
          className="select select-bordered ml-2"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Reviews</th>
              <th>Admin Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {AllMeals.map((meal, index) => (
              <tr key={meal._id}>
                <th>{index + 1}</th>
                <td>{meal.title}</td>
                <td>{meal.like}</td>
                <td>{meal.review}</td>
                <td>{meal.admin?.name || 'Unknown Admin'}</td>
                <td>
                  <Link to={`allMealsUpdate/${meal._id}`}>
                    <button className="btn btn-accent">Update</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="btn btn-error ml-2"
                  >
                    Delete
                  </button>
                  <Link to={`/mealDetails/${meal._id}`}>
                    <button className="btn btn-accent ml-2">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMeals;
