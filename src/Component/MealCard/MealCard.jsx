import React from 'react';
import { Link } from 'react-router-dom';

const MealCard = ({ UpcomingSingle }) => {
  const {
    image,
    title,
    category,
    rating,
    like,
    price,
    _id,
    postTime,
    ingredients,
  } = UpcomingSingle;
  return (
    <div className="card card-compact rounded-md h-[400px] w-[350px] bg-base-100 shadow-gray-500 shadow-2xl">
      <figure className="h-[200px]">
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{category}</p>
        <p>{ingredients}</p>
        <div className="flex justify-evenly">
          <p>Rating: {rating}</p>
          <p>Like: {like}</p>
          <p>Price: {price}</p>
        </div>
        <p>{postTime}</p>
        <div className="card-actions justify-end">
          <Link to={`/mealDetails/${_id}`}>
            <button className="btn btn-accent">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
