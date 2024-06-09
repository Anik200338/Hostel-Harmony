import React from 'react';
import { Link } from 'react-router-dom';

const Tbody = ({ Tb, review2, index, handleDelete, pop }) => {
  const { title, _id, review } = Tb;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{review}</td>
      <td>{title}</td>
      <td>{pop}</td>
      <td>
        <div className="card-actions justify-between">
          <Link to={`/mealDetails/${_id}`}>
            <button className="btn btn-accent">View Details</button>
          </Link>
        </div>
      </td>
      <td>
        <button
          onClick={() => handleDelete(pop, _id)}
          className="btn btn-error"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Tbody;
