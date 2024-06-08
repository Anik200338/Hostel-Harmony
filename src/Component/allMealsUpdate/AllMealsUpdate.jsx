import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AllMealsUpdate = () => {
  const { id } = useParams();
  const [craft, setCraft] = useState({});
  const { register, handleSubmit, setValue } = useForm();
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_HOSTING_KEY
  }`;

  useEffect(() => {
    fetch(`http://localhost:5000/UpdateDetailsMeal/${id}`)
      .then(res => res.json())
      .then(data => {
        setCraft(data);
      });
  }, [id, setValue]);

  const onSubmit = async data => {
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

        const result = await fetch(`http://localhost:5000/updateMeal/${id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(mealItem),
        }).then(res => res.json());

        if (result.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Updated Successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
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
      <button className="btn" type="submit">
        Update Meal
      </button>
    </form>
  );
};

export default AllMealsUpdate;