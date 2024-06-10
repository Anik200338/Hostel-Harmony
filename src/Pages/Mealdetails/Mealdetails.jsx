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
    <div>
      <div className="hero-content flex-col lg:flex lg:flex-row">
        <div className="text-center lg:text-left">
          <div className="card lg:h-[500px] lg:card-side bg-base-100 shadow-xl">
            <figure className="">
              <img src={singleMeal.image} alt="Album" />
            </figure>
            <div className="card-body text-start">
              <h2 className="card-title">{singleMeal.title}</h2>
              <p>{singleMeal.category}</p>
              <p>Ingredients : {singleMeal.ingredients}</p>
              <p>{singleMeal.description}</p>
              <p> Price : {singleMeal.price}</p>
              <p> Rating : {singleMeal.rating}</p>
              <div className="flex items-center gap-5">
                <h2 className="font-bold text-xl">
                  {' '}
                  Like :{' '}
                  <span className="text-yellow-500">{singleMeal.like}</span>
                </h2>
                <h2 className="font-bold text-xl">
                  Review :{' '}
                  <span className="text-yellow-500">{singleMeal.review}</span>
                </h2>
              </div>
              <div className="flex">
                <button className="btn btn-warning mr-4" onClick={handleLike}>
                  {hasLiked ? 'Liked' : 'Like'}
                </button>
                {subscriptionPackage ? (
                  <button
                    className="btn btn-warning"
                    onClick={handleMealRequest}
                  >
                    Meal Request
                  </button>
                ) : (
                  <p>Please wait...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {AllReview &&
          AllReview?.map((rev, index) => (
            <div key={rev.id}>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-16 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={rev.User.photo}
                    />
                  </div>
                </div>
                <div className="chat-bubble  chat-bubble-warning">
                  <div className="hero-content flex-col lg:flex-row">
                    <div>
                      <h1 className="text-lg font-bold">{rev.User.Name}</h1>
                      <p className="">{rev.User.email}</p>
                      <p className="">{rev.currentDateAndTime}</p>
                      <p className="text-xl font-bold pt-2 ">{rev.review}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={review}
          onChange={e => setReview(e.target.value)}
          className="input input-bordered input-warning w-full "
          placeholder="Write your review..."
        ></textarea>
        <button className="btn btn-warning mt-2 " type="submit">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Mealdetails;
