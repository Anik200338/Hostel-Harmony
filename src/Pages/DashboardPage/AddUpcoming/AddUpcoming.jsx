import React from 'react';
import { useForm } from 'react-hook-form';

import { FaUtensils } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useContext } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

import useAxiosSecure from '../../../Hooks/useAxiosSecure';

import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
// import Swal from 'sweetalert2';

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMAGE_HOSTING_KEY
}`;
console.log(image_hosting_api);

const AddUpcoming = () => {
  const { user, setLoading } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async mealItem => {
      const { data } = await axiosSecure.post(`/AddUpcomingMeal`, mealItem);
      return data;
    },
    onSuccess: () => {
      console.log('Data Saved Successfully');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `is added to the menu.`,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    },
  });
  const onSubmit = async data => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    console.log(res.data);
    // if (res.data.success) {
    // now send the menu item data to the server with the image url
    try {
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
      console.log(mealItem);
      await mutateAsync(mealItem);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    // const menuRes = await axiosSecure.post('/menu', menuItem);
    // console.log(menuRes.data);
    // if (menuRes.data.insertedId) {
    //   // show success popup
    //   reset();
    //   Swal.fire({
    //     position: 'top-end',
    //     icon: 'success',
    //     title: `${data.name} is added to the menu.`,
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // }
    // }
    // console.log('with image url', res.data);
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
      <button className="btn">
        Add Meal <FaUtensils className="ml-4"></FaUtensils>
      </button>
    </form>
  );
};

export default AddUpcoming;
