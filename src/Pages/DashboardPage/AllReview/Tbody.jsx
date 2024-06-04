import React from 'react';
import { Link } from 'react-router-dom';

const Tbody = ({ Tb, review2, index, handleDelete, pop }) => {
  const { title, _id, review } = Tb;
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
              <div className="font-bold">{review2}</div>
            </div>
          </div>
        </td>
        <td>{title}</td>
        <td>{pop}</td>
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
            onClick={() => handleDelete(pop, _id)}
            className="btn btn-error"
          >
            Delete
          </button>
        </th>
      </tr>
    </tbody>
  );
};

export default Tbody;
