import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
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
    <div className="card card-compact rounded-md h-[400px] w-[350px] bg-base-100 shadow-yellow-200 shadow-2xl">
      <figure className="h-[200px]">
        <img src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="font-bold">{category}</p>
        <div className="flex justify-evenly">
          <p className="font-bold">Rating: {rating}</p>
          <p className="font-bold">Like: {like}</p>
          <p className="font-bold">Price: {price}</p>
        </div>
        <div className="card-actions justify-end">
          <Link to={`/mealDetails/${_id}`}>
            <AwesomeButton type="primary">View Details</AwesomeButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
