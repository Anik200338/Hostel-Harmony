import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AllMealsUpdate = () => {
  const { id } = useParams();
  const [craft, setCraft] = useState({});
  const { register, handleSubmit, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_HOSTING_KEY
  }`;

  useEffect(() => {
    fetch(
      `https://assignment-12-server-beige-tau.vercel.app/UpdateDetailsMeal/${id}`
    )
      .then(res => res.json())
      .then(data => {
        setCraft(data);
      });
  }, [id, setValue]);

  const onSubmit = async data => {
    setIsLoading(true); // Set loading state to true when the form is submitted
    const imageFile = new FormData();
    imageFile.append('image', data.image[0]);

    try {
      const res = await axios.post(image_hosting_api, imageFile, {
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
        };

        const result = await fetch(
          `https://assignment-12-server-beige-tau.vercel.app/updateMeal/${id}`,
          {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(mealItem),
          }
        ).then(res => res.json());

        if (result.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Updated Successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update the meal.',
            icon: 'error',
            confirmButtonText: 'Okay',
          });
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while uploading the image.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    } finally {
      setIsLoading(false); // Set loading state to false after the process is completed
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
          defaultValue={craft.title || ''}
          className="input input-bordered w-full"
        />
      </div>
      <div className="flex gap-6">
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Category*</span>
          </label>
          <select
            {...register('category', { required: true })}
            defaultValue={craft.category || 'default'}
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

        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Price*</span>
          </label>
          <input
            type="number"
            placeholder="Price"
            {...register('price', { required: true })}
            defaultValue={craft.price || ''}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Ingredients</span>
          </label>
          <input
            type="text"
            placeholder="Ingredients"
            {...register('ingredients', { required: true })}
            defaultValue={craft.ingredients || ''}
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          {...register('description')}
          className="textarea textarea-bordered h-24"
          placeholder="Description"
          defaultValue={craft.description || ''}
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
          defaultValue={craft.rating || ''}
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
      <button
        className="btn btn-warning w-full"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Updating...' : 'Update Meal'}
      </button>
    </form>
  );
};

export default AllMealsUpdate;
