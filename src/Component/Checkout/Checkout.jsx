import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Payment from './Payment/Payment';

const Checkout = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: singlePack = [], isLoading } = useQuery({
    queryKey: ['singlePack', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/singlePack/${id}`);
      return res.data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  console.log(singlePack);
  return (
    <div className=" border border-gray-950">
      <div
        key={singlePack.packageName}
        className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 container mx-auto"
      >
        <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50">
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">{singlePack.packageName}</h4>
            <span className="text-6xl font-bold">${singlePack.price}</span>
          </div>
          <ul className="flex-1 mb-6 dark:text-gray-600">
            {singlePack.features.map((feature, index) => (
              <li key={index} className="flex mb-2 space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="flex-shrink-0 w-6 h-6 dark:text-violet-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Payment singlePack={singlePack}></Payment>
    </div>
  );
};

export default Checkout;
