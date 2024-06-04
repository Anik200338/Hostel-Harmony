import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Mealdetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState('');

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
    try {
      await axiosPublic.post(`/likeMeal/${id}`);
      refetch(); // Refetch the data after liking the meal
    } catch (error) {
      console.error('Error liking the meal:', error);
    }
  };
  const handleReviewSubmit = async e => {
    e.preventDefault();
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
              like
            </button>
            <button className="btn btn-primary">meal request</button>
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
