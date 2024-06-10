import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Tsingle = ({ Tmyb, status, index, cop, User, refetch, Name }) => {
  const { title } = Tmyb;
  const axiosPublic = useAxiosPublic();

  const handleServe = async () => {
    try {
      await axiosPublic.post(`/updateStatus/${cop}`, {
        status: 'delivered',
      });
      refetch();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <tbody>
      <tr>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{User}</td>
        <td>{Name}</td>
        <td>{status}</td>
        <td>
          <button
            className="btn btn-accent"
            onClick={handleServe}
            disabled={status === 'delivered'}
          >
            {status === 'delivered' ? 'Delivered' : 'Serve'}
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default Tsingle;
