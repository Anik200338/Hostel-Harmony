import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Tsingle = ({ Tmyb, status, index, cop, User }) => {
  const { title, _id, review } = Tmyb;
  const axiosPublic = useAxiosPublic();

  const handleServe = async () => {
    try {
      await axiosPublic.post(`/updateStatus/${cop}`, {
        status: 'delivered',
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (cop, _id) => {
    try {
      await axiosPublic.delete(`/deleteMeal/${cop}/${_id}`);
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  return (
    <tbody>
      <tr>
        <td>{index + 1}</td>
        <td>{status}</td>
        <td>{title}</td>
        <td>{User}</td>
        <td>{review}</td>
        <td>
          <button
            className="btn btn-accent"
            onClick={handleServe}
            disabled={status === 'delivered'}
          >
            {status === 'delivered' ? 'Delivered' : 'Serve'}
          </button>
        </td>
        <td>
          <button
            onClick={() => handleDelete(cop, _id)}
            className="btn btn-error"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default Tsingle;
