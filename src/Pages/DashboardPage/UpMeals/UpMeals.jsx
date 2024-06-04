import { useContext } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { IoIosAdd } from 'react-icons/io';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const UpMeals = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    data: meals = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['meal'],
    queryFn: async () => {
      const res = await axiosPublic.get('/meal');
      return res.data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async mealItem => {
      const { data } = await axiosPublic.post(`/AddMealOfUpComing`, mealItem);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Meal is added to the menu.',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleSubmit = async meal => {
    try {
      const mealItem = {
        title: meal.title,
        category: meal.category,
        image: meal.image,
        ingredients: meal.ingredients,
        description: meal.description,
        price: meal.price,
        rating: meal.rating,
        postTime: new Date().toLocaleString(),
        like: 0,
        review: 0,
        cartId: meal._id,
        admin: {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        },
      };
      await mutateAsync(mealItem);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading meals</div>;

  return (
    <div>
      <div className="hero  bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] h-96 lg:h-72 rounded-lg p-2">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold">
              Empower Your Voice: AddQuery and Let Your Questions Spark Dialogue
            </h1>
            <Link
              to="addUpcomingMeal"
              className="relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-blue-500 rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
              </span>
              <span className="relative text-white">Add Queries</span>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt={item.title || 'Meal Image'}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      className="btn btn-ghost btn-lg"
                      onClick={() => handleSubmit(item)}
                    >
                      <IoIosAdd className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpMeals;
