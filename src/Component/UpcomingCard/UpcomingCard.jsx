import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';

const UpcomingCard = ({ UpcomingSingle, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const [hasLiked, setHasLiked] = useState(false);
  const [subscriptionPackage, setSubscriptionPackage] = useState(null); // State to hold user's subscription package
  const { user } = useContext(AuthContext);

  const {
    image,
    title,
    category,
    rating,
    like,
    price,
    _id,
    postTime,
    description,
    ingredients,
  } = UpcomingSingle;

  // Fetch user's subscription package
  useEffect(() => {
    const fetchUserSubscription = async () => {
      try {
        const res = await axiosPublic.get(`/users/${user?.email}`);
        setSubscriptionPackage(res.data.subscriptionPackage);
      } catch (error) {
        console.error('Error fetching user subscription:', error);
      }
    };

    if (user?.email) {
      fetchUserSubscription();
    }
  }, [user?.email, axiosPublic]);

  // Check if the user has liked this upcoming meal
  useEffect(() => {
    const checkUserLike = async () => {
      try {
        const res = await axiosPublic.get(
          `/checkUpComingLike/${_id}/${user?.email}`
        );
        setHasLiked(res.data.hasLiked);
      } catch (error) {
        console.error('Error checking user like:', error);
      }
    };

    if (user?.email && _id) {
      checkUserLike();
    }
  }, [user?.email, _id, axiosPublic]);

  const handleLike = async () => {
    if (subscriptionPackage === 'Bronze') {
      toast.error('Please buy a subscription first!');
      return;
    }
    if (hasLiked) {
      toast.error('You have already liked this meal!');
      return;
    }

    try {
      const response = await axiosPublic.post(`/likeUpcomingMeal/${_id}`, {
        email: user?.email,
      });
      setHasLiked(true);

      if (response.data.message === 'Meal added to the regular menu') {
        toast.success('Meal liked successfully and added to the regular menu!');
      } else {
        toast.success('Meal liked successfully!');
      }

      refetch(); // Refetch the data after liking the meal
    } catch (error) {
      console.error('Error liking the meal:', error);
      toast.error('Error liking the meal');
    }
  };

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
          <button className="btn btn-primary mr-4" onClick={handleLike}>
            {hasLiked ? 'Liked' : 'Like'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCard;
