import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Pagination from '../../../Component/common/Pagination';

const PHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const paymentsPerPage = 10;

  const {
    data: paymentHistory = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['paymentHistory', user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching payment history...</div>;

  const pageCount = Math.ceil(paymentHistory.length / paymentsPerPage);
  const offset = currentPage * paymentsPerPage;
  const currentPayments = paymentHistory.slice(
    offset,
    offset + paymentsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="">
      <div className="overflow-x-auto mb-10 relative">
        <table className="table table-zebra w-full ">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.length > 0 ? (
              currentPayments.map((meal, index) => (
                <tr key={meal._id}>
                  <th>{index + 1 + offset}</th>
                  <td>{meal.email}</td>
                  <td>{meal.transactionId}</td>
                  <td>{meal.date}</td>
                  <td>{meal.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="absolute inset-x-0 lg:left-1/2 bottom-0 mb-5">
        <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default PHistory;
