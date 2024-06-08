import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Mealdetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState('');
  const [hasLiked, setHasLiked] = useState(false);

  const [subscriptionPackage, setSubscriptionPackage] = useState(null); // State to hold user's subscription package

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
  console.log(subscriptionPackage);

  useEffect(() => {
    const checkUserLike = async () => {
      try {
        const res = await axiosPublic.get(`/checkLike/${id}/${user?.email}`);
        setHasLiked(res.data.hasLiked);
      } catch (error) {
        console.error('Error checking user like:', error);
      }
    };

    if (user?.email && id) {
      checkUserLike();
    }
  }, [user?.email, id, axiosPublic]);

  const {
    data: singleMeal = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['singleMeal', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/singleMeal/${id}`);
      return res.data;
    },
  });
  const {
    data: AllReview = {},
    refetch: AllReviewrefetch,
    isLoading: allisLoading,
  } = useQuery({
    queryKey: ['AllReview', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/review/${id}`);
      return res.data;
    },
  });
  const handleLike = async () => {
    if (
      subscriptionPackage === 'Bronze' ||
      subscriptionPackage === 'default-badge'
    ) {
      toast.error('Please buy a subscription first!');
      return;
    }
    if (hasLiked) {
      toast.error('You have already liked this meal!');
      return;
    }

    try {
      await axiosPublic.post(`/likeMeal/${id}`, { email: user?.email });
      setHasLiked(true);
      refetch();
      toast.success('Meal liked successfully!');
    } catch (error) {
      console.error('Error liking the meal:', error);
    }
  };
  const handleReviewSubmit = async e => {
    e.preventDefault();
    if (
      subscriptionPackage === 'Bronze' ||
      subscriptionPackage === 'default-badge'
    ) {
      toast.error('Please buy a subscription first!'); // Show toast notification
      return;
    }

    const currentDateAndTime = new Date().toLocaleString();
    const Addreview = {
      review,
      currentDateAndTime,
      id,
      User: {
        email: user?.email,
        Name: user?.displayName,
        photo: user?.photoURL,
      },
    };
    try {
      await axiosPublic.post(`/addReview/${id}`, Addreview);
      setReview('');
      refetch(); // Refetch the data after submitting a review
      AllReviewrefetch(); // Refetch the data after submitting a review
    } catch (error) {
      console.error('Error submitting the review:', error);
    }
  };
  const handleMealRequest = async () => {
    if (
      subscriptionPackage === 'Bronze' ||
      subscriptionPackage === 'default-badge'
    ) {
      toast.error('Please buy a subscription first!'); // Show toast notification
      return;
    }

    try {
      const requestPayload = {
        User: {
          email: user?.email,
          Name: user?.displayName,
          photo: user?.photoURL,
        },
      };
      await axiosPublic.post(`/requestMeal/${id}`, requestPayload);
      alert('Meal request submitted successfully!');
    } catch (error) {
      console.error('Error requesting the meal:', error);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  console.log(singleMeal);
  if (allisLoading) return <div>Loading...</div>;
  console.log(AllReview);
  return (
    <div className="hero h-[500px] bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={singleMeal.image}
          className="w-[300px] h-[300px] rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">{singleMeal.title}</h1>
          <p className="py-2">{singleMeal.ingredients}</p>
          <p className="py-2">{singleMeal.category}</p>
          <p className="py-2">{singleMeal.price}</p>
          <p className="py-2">{singleMeal.rating}</p>
          <p className="py-2">{singleMeal.postTime}</p>
          <div className="flex justify-around">
            <p className="py-2">like {singleMeal.like}</p>
            <p className="py-2">reviews {singleMeal.review}</p>
          </div>
          <div className="flex">
            <button className="btn btn-primary mr-4" onClick={handleLike}>
              {hasLiked ? 'Liked' : 'Like'}
            </button>
            {subscriptionPackage ? (
              <button className="btn btn-primary" onClick={handleMealRequest}>
                Meal Request
              </button>
            ) : (
              <p>Please wait...</p>
            )}
          </div>
          <div>
            <h2 className="text-3xl mt-4">Reviews</h2>
            <form onSubmit={handleReviewSubmit}>
              <textarea
                value={review}
                onChange={e => setReview(e.target.value)}
                className="textarea textarea-bordered w-full mt-2"
                placeholder="Write your review..."
              ></textarea>
              <button className="btn btn-primary mt-2" type="submit">
                Submit Review
              </button>
            </form>
            <div className="mt-4">
              {AllReview &&
                AllReview?.map((rev, index) => (
                  <div key={index} className="border p-2 my-2 rounded">
                    <p>{rev.review}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mealdetails;
