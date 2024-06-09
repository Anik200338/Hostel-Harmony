import React from 'react';

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: 'url(https://i.ibb.co/1XHQRQr/17875580-5925630.jpg)',
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to Hostel Harmony</h1>
          <p className="mb-5">
            Streamlining Your University Hostel Experience - Manage meals,
            reviews, and student information with ease. Find your meals and
            leave feedback effortlessly.
          </p>
          <div className="flex justify-center mb-5">
            <input
              type="text"
              placeholder="Search for Meals or Reviews..."
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <button className="btn btn-primary ml-2">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
