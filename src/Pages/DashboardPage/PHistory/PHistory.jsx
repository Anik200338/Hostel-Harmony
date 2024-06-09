import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Payment from './../../../Component/Checkout/Payment/Payment';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ['paymentHistory', user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  console.log(paymentHistory);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>email</th>
            <th>transactionId</th>
            <th>date</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.length > 0 ? (
            paymentHistory.map((meal, index) => (
              <tr key={meal._id}>
                <th>{index + 1}</th>
                <td>{meal.email}</td>
                <td>{meal.transactionId}</td>
                <td>{meal.date}</td>
                <td>{meal.price}</td>
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
  );
};

export default PHistory;
