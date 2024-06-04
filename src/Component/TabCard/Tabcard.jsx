import React from 'react';
import { Link } from 'react-router-dom';

const Tabcard = ({ item }) => {
  const {
    title,
    _id,
    category,

    image,

    ingredients,
    description,

    price,

    rating,
  } = item;
  return (
    <div className="card card-compact rounded-none border-2 border-info  h-[450px] bg-base-100 shadow-2xl">
      <figure className="h-40">
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-sm">{title}</h2>
        <h1 className="text-lg font-semibold">
          <span className="font-bold">ProductName:</span> {category}
        </h1>
        <h1 className="text-lg font-se ">
          <span className="font-bold">Date&Time:</span>
          {ingredients}
        </h1>
        <h1 className="text-lg font-se ">
          <span className="font-bold">description</span>
          {description}
        </h1>
        <h1 className="text-lg font-se ">
          <span className="font-bold">price</span>
          {price}
        </h1>
        <h1 className="text-lg font-se ">
          <span className="font-bold">rating</span>
          {rating}
        </h1>
        <div className="absolute bottom-1">
          <div className="card-actions justify-between">
            <Link to={`/mealDetails/${_id}`}>
              <button className="btn btn-accent">View Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabcard;
