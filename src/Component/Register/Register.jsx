import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../SocialLogin/SocialLogin';
const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const from = location?.state || '/';

  const onSubmit = data => {
    // Password verification
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    if (!uppercaseRegex.test(data.password)) {
      toast.error('Password must contain at least one uppercase letter');
      return;
    }
    if (!lowercaseRegex.test(data.password)) {
      toast.error('Password must contain at least one lowercase letter');
      return;
    }
    if (data.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    createUser(data.email, data.password, data.Photo, data.fullname)
      .then(() => {
        updateUserProfile(data.fullname, data.Photo).then(() => {
          toast.success('Registration successful! You have been logged in.');
          navigate(from);
        });
      })
      .catch(error => {
        toast.error(error.message); // Display error message from Firebase or any other backend
      });
  };

  return (
    <div className="pt-24">
      <div className="hero min-h-screen bg-[url('https://i.ibb.co/b60WJLZ/data-security-threat-1.png')] rounded-3xl  w-full mb-20">
        <div className="hero-content flex-col lg:flex w-3/4">
          <div
            className="card shrink-0 w-full max-w-sm shadow-2xl bg-transparent border-2 border-blue-200 rounded-none"
            data-aos="flip-left"
          >
            <div className="text-center lg:text-left">
              <h1 className="text-center pt-5 text-5xl font-bold">
                Register Now
              </h1>
            </div>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="FUll name"
                  className="input input-bordered border-info "
                  {...register('fullname', { required: true })}
                />
                {errors.fullname && <span>This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URl</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URl"
                  className="input input-bordered border-info "
                  {...register('Photo', { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered border-info "
                  {...register('email', { required: true })}
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text ">Password</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  className="input input-bordered border-info "
                  {...register('password', { required: true })}
                />
                <span
                  className="absolute top-[50px] left-36 lg:left-72"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </span>
                {errors.password && <span>This field is required</span>}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-info">Register</button>
              </div>
              <p className="text-center">
                you have an account{' '}
                <Link to="/login" className="text-info">
                  Login
                </Link>{' '}
              </p>
              <div className="mb-5">
                <SocialLogin></SocialLogin>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
