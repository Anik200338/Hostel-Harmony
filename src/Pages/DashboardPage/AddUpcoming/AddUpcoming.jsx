import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMAGE_HOSTING_KEY
}`;

const AddUpcoming = () => {
  const { user, setLoading } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading button

  const { mutateAsync } = useMutation({
    mutationFn: async mealItem => {
      const { data } = await axiosSecure.post(`/AddUpcomingMeal`, mealItem);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Upcoming meal added to the menu.',
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      setIsSubmitting(false); // Reset loading state after success
    },
    onError: error => {
      Swal.fire({
        icon: 'error',
        title: 'Error adding upcoming meal',
        text: error.message,
      });
      setLoading(false);
      setIsSubmitting(false); // Reset loading state after error
    },
  });

  const onSubmit = async data => {
    setIsSubmitting(true); // Set loading state to true on form submission
    try {
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        const mealItem = {
          title: data.title,
          category: data.category,
          image: res.data.data.display_url,
          ingredients: data.ingredients,
          description: data.description,
          price: parseFloat(data.price),
          rating: parseFloat(data.rating),
          postTime: new Date().toLocaleString(),
          like: 0,
          review: 0,
          admin: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
        };
        await mutateAsync(mealItem);
      } else {
        throw new Error('Image upload failed');
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error uploading image',
        text: err.message,
      });
      setLoading(false);
      setIsSubmitting(false); // Reset loading state after error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full my-6">
        <label className="label">
          <span className="label-text">Meal title*</span>
        </label>
        <input
          type="text"
          placeholder="Meal title"
          {...register('title', { required: true })}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div className="flex gap-6">
        {/* category */}
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Category*</span>
          </label>
          <select
            defaultValue="default"
            {...register('category', { required: true })}
            className="select select-bordered w-full"
          >
            <option disabled value="default">
              Select a category
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        {/* price */}
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Price*</span>
          </label>
          <input
            type="number"
            placeholder="Price"
            {...register('price', { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Ingredients</span>
          </label>
          <input
            type="text"
            placeholder="ingredients"
            {...register('ingredients', { required: true })}
            className="input input-bordered w-full"
          />
        </div>
      </div>
      {/* recipe details */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          {...register('description')}
          className="textarea textarea-bordered h-24"
          placeholder="Bio"
        ></textarea>
      </div>
      <div className="form-control w-full my-6">
        <label className="label">
          <span className="label-text">Rating</span>
        </label>
        <input
          type="number"
          placeholder="Rating"
          {...register('rating', { required: true })}
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control w-full my-6">
        <input
          {...register('image', { required: true })}
          type="file"
          className="file-input w-full max-w-xs"
        />
      </div>
      <button className="btn btn-warning w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add upcoming Meal'}{' '}
        <FaUtensils className="ml-4"></FaUtensils>
      </button>
    </form>
  );
};

export default AddUpcoming;
