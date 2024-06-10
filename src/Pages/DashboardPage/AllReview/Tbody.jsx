import React from 'react';
import { Link } from 'react-router-dom';

const Tbody = ({ Tb, review2, index, handleDelete, pop }) => {
  const { title, _id, review, like } = Tb;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{review2}</td>
      <td>{like}</td>
      <td>{review}</td>

      <td>
        <button
          onClick={() => handleDelete(pop, _id)}
          className="btn btn-error"
        >
          Delete
        </button>
      </td>
      <td>
        <div className="card-actions justify-between">
          <Link to={`/mealDetails/${_id}`}>
            <button className="btn btn-accent">View Details</button>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default Tbody;
