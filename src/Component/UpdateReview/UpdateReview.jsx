import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateReview = () => {
  const { id } = useParams();
  id;
  const [craft, setCraft] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/UpdateDetails/${id}`)
      .then(res => res.json())
      .then(data => {
        setCraft(data);
        data;
      });
  }, [id]);
  const handleUpdate = () => {
    event.preventDefault();
    const form = event.target;
    const review = form.review.value;
    const UpdateCraft = {
      review,
    };
    fetch(`http://localhost:5000/update/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(UpdateCraft),
    })
      .then(res => res.json())
      .then(data => {
        setCraft(data);
        // Set loading to false when data is fetched
        data;
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Updated Successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
        }
      });
    form.reset();
  };
  return (
    <div>
      <form onSubmit={handleUpdate}>
        {/* form name and quantity row */}
        <div className="md:flex mb-8">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text font-bold">Review</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="review"
                placeholder="review"
                className="input input-bordered w-full"
                defaultValue={craft.review}
              />
            </label>
          </div>
        </div>
        <input type="submit" value="Update Query" className="btn btn-block" />
      </form>
    </div>
  );
};

export default UpdateReview;
