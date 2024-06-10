import React, { useContext } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const UserProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: adminProfiles = [], isLoading } = useQuery({
    queryKey: ['AdminProfile'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/AdminProfile/${user?.email}`);
      const data = res.data;

      // Check if the array has at least one element and set default role if necessary
      if (data.length > 0) {
        if (!data[0].role) {
          data[0].role = 'user';
        }
      }
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  // Assuming we only care about the first profile for now
  const adminProfile = adminProfiles.length > 0 ? adminProfiles[0] : {};

  console.log(adminProfile);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl w-3/5">
        <img
          alt="profile"
          src="https://i.ibb.co/w0L2yxt/2147951284.jpg"
          className="w-full mb-4 rounded-t-lg h-36"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />
          </a>

          <p className="p-2 uppercase px-4 text-xs text-white bg-yellow-500 rounded-full">
            {adminProfile.role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black">
                  {adminProfile.name || user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black">
                  {adminProfile.email || user?.email}
                </span>
              </p>
              <p className="flex flex-col">
                Badge
                <span className="font-bold text-black">
                  {adminProfile.badge}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
