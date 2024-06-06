import React from 'react';
import { Link } from 'react-router-dom';

const TReqested = ({ Tmyb, status, index, handleDelete, cop }) => {
  const { title, _id, review } = Tmyb;
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
          <div className="card-actions justify-between">
            <Link to={`/mealDetails/${_id}`}>
              <button className="btn btn-accent">View Details</button>
            </Link>
          </div>
        </th>
        <th>
          <button
            onClick={() => handleDelete(cop, _id)}
            className="btn btn-error"
          >
            Delete
          </button>
        </th>
      </tr>
    </tbody>
  );
};

export default TReqested;
