import React from 'react';
import { Link } from 'react-router-dom';

const TReqested = ({ Tmyb, status, index, handleDelete, cop }) => {
  const { title, _id, review, like } = Tmyb;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{like}</td>
      <td>{review}</td>
      <td>{status}</td>
      <td>
        <button
          onClick={() => handleDelete(cop, _id)}
          className="btn btn-error"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default TReqested;
