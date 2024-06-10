import React, { useState } from 'react';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });
  const handleMakeAdmin = user => {
    axiosSecure.patch(`/users/admin/${user._id}`).then(res => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
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
        <button className="btn btn-warning" type="submit">
          Search
        </button>
      </form>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Email</th>
              <th>make admin</th>
              <th> subscription status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'admin' ? (
                    'Admin'
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-lg bg-orange-500"
                    >
                      <FaUsers
                        className="text-white 
                                        text-2xl"
                      ></FaUsers>
                    </button>
                  )}
                </td>
                <td>{user.badge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
