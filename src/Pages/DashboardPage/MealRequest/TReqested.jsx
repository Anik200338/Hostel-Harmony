import React from 'react';
import { Link } from 'react-router-dom';

const TReqested = ({ Tmyb, status, index, handleDelete, cop }) => {
  const { title, _id, review } = Tmyb;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{status}</td>
      <td>{title}</td>
      <td>{cop}</td>
      <td>{review}</td>
      <td>
        <div className="card-actions justify-between">
          <Link to={`/mealDetails/${_id}`}>
            <button className="btn btn-accent">View Details</button>
          </Link>
        </div>
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
  );
};

export default TReqested;
