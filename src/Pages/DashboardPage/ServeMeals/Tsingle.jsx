import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Tsingle = ({ Tmyb, status, index, handleDelete, cop }) => {
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
  return (
    <tbody>
      {/* row 1 */}
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <th>{index + 1}</th>
            </div>
            <div>
              <div className="font-bold">{status}</div>
            </div>
          </div>
        </td>
        <td>{title}</td>
        <td>{cop}</td>
        <td>{review}</td>
        <th>
          <button
            className="btn btn-accent"
            onClick={handleServe}
            disabled={status === 'delivered'}
          >
            {status === 'delivered' ? 'Delivered' : 'Serve'}
          </button>
        </th>
        <th>
          <button
            onClick={() => handleDelete(cop, _id)}
            className="btn btn-error"
          >
            Delete
          </button>
        </th>
        {/* <th>
          <Link to={`UpdateReview/${cop}`}>
            <button className="btn btn-warning">Update</button>
          </Link>
        </th> */}
      </tr>
    </tbody>
  );
};

export default Tsingle;
