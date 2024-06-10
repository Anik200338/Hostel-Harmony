import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Pagination from '../../../Component/common/Pagination';

const AllMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [sortField, setSortField] = useState('like');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const {
    data: AllMealsData = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['AllMeals', sortField, sortOrder, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/AllMeals?sortBy=${sortField}&order=${sortOrder}&page=${currentPage}&limit=${itemsPerPage}`
      );
      console.log('API Response:', res.data);
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
        fetch(
          `https://assignment-12-server-beige-tau.vercel.app/myDeleteMeal/${id}`,
          {
            method: 'DELETE',
          }
        )
          .then(res => res.json())
          .then(data => {
            console.log('Delete Response:', data);

            if (data.deletedCount > 0 || data.acknowledged) {
              Swal.fire('Deleted!', 'Your meal has been deleted.', 'success');
              refetch();
            } else {
              Swal.fire('Error!', 'Failed to delete the meal.', 'error');
            }
          })
          .catch(error => {
            console.error('Error deleting meal:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the meal.',
              'error'
            );
          });
      }
    });
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const pageCount = Math.ceil(AllMealsData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentMeals = AllMealsData.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <div className="flex justify-between my-4">
        <h2 className="text-3xl">All Meals</h2>
        <h2 className="text-3xl">Total Meals: {AllMealsData.length}</h2>
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
              <th>update</th>
              <th>Delete</th>
              <th>view meal</th>
            </tr>
          </thead>
          <tbody>
            {currentMeals.length > 0 ? (
              currentMeals.map((meal, index) => (
                <tr key={meal._id}>
                  <th>{index + 1 + offset}</th>
                  <td>{meal.title}</td>
                  <td>{meal.like}</td>
                  <td>{meal.review}</td>
                  <td>{meal.admin?.name || 'Unknown Admin'}</td>
                  <td>
                    <Link to={`allMealsUpdate/${meal._id}`}>
                      <button className="btn btn-accent">Update</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(meal._id)}
                      className="btn btn-error ml-2"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={`/mealDetails/${meal._id}`}>
                      <button className="btn btn-accent ml-2">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No meals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="absolute inset-x-0 lg:left-1/4 bottom-0 mb-5">
        <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default AllMeals;
