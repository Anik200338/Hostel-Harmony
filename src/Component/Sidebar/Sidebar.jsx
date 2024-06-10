import { useContext, useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { BsFingerprint, BsFillHouseAddFill } from 'react-icons/bs';
import { GrUserAdmin } from 'react-icons/gr';
import { MdHomeWork, MdOutlinePayment, MdOutlineReviews } from 'react-icons/md';
import { AiOutlineBars } from 'react-icons/ai';
import { BsGraphUp } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import { FaHome, FaUser } from 'react-icons/fa';
import { FaCodePullRequest } from 'react-icons/fa6';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const [isAdmin] = useAdmin();
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <div>
                <h2>Hostel Harmony</h2>
              </div>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-yellow-500"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-yellow-200 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-yellow-500 mx-auto">
              <Link to="/">
                <div>
                  <h2 className="font-bold">Hostel Harmony</h2>
                </div>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {isAdmin ? (
                <>
                  {/* Admin */}
                  <NavLink
                    to="adminProfile"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-yellow-400   hover:text-gray-700 ${
                        isActive
                          ? 'bg-yellow-400  text-gray-700'
                          : 'text-gray-600'
                      }`
                    }
                  >
                    <BsGraphUp className="w-5 h-5" />

                    <span className="mx-4 font-medium">Admin Profile</span>
                  </NavLink>
                  <NavLink
                    to="ManageUsers"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-yellow-400   hover:text-gray-700 ${
                        isActive
                          ? 'bg-yellow-400  text-gray-700'
                          : 'text-gray-600'
                      }`
                    }
                  >
                    <BsGraphUp className="w-5 h-5" />

                    <span className="mx-4 font-medium">Manage Users</span>
                  </NavLink>
                  {/* Statistics */}
                  <NavLink
                    to="AllReview"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-yellow-400   hover:text-gray-700 ${
                        isActive
                          ? 'bg-yellow-400  text-gray-700'
                          : 'text-gray-600'
                      }`
                    }
                  >
                    <BsGraphUp className="w-5 h-5" />

                    <span className="mx-4 font-medium">AllReview</span>
                  </NavLink>
                  {/* Add Room */}
                  <NavLink
                    to="addMeal"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-yellow-400   hover:text-gray-700 ${
                        isActive
                          ? 'bg-yellow-400  text-gray-700'
                          : 'text-gray-600'
                      }`
                    }
                  >
                    <BsFillHouseAddFill className="w-5 h-5" />

                    <span className="mx-4 font-medium">Add Meal</span>
                  </NavLink>
                  <NavLink
                    to="allMeals"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-yellow-400   hover:text-gray-700 ${
                        isActive
                          ? 'bg-yellow-400  text-gray-700'
                          : 'text-gray-600'
                      }`
                    }
                  >
                    <BsFillHouseAddFill className="w-5 h-5" />

                    <span className="mx-4 font-medium">All Meals</span>
                  </NavLink>
                  {/* Upcoming Meals */}
                  <NavLink
                    to="upmeals"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-yellow-400   hover:text-gray-700 ${
                        isActive
                          ? 'bg-yellow-400  text-gray-700'
                          : 'text-gray-600'
                      }`
                    }
                  >
                    <MdHomeWork className="w-5 h-5" />

                    <span className="mx-4 font-medium">Upcoming Meals</span>
                  </NavLink>
                  {/* Serve Meals */}
                  <NavLink
                    to="ServeMeals"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-yellow-400   hover:text-gray-700 ${
                        isActive
                          ? 'bg-yellow-400  text-gray-700'
                          : 'text-gray-600'
                      }`
                    }
                  >
                    <MdHomeWork className="w-5 h-5" />

                    <span className="mx-4 font-medium">Serve Meals</span>
                  </NavLink>
                </>
              ) : (
                <>
                  {/* user */}
                  <NavLink
                    to="userProfile"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-yellow-400   hover:text-gray-700 ${
                        isActive
                          ? 'bg-yellow-400  text-gray-700'
                          : 'text-gray-600'
                      }`
                    }
                  >
                    <FaUser className="w-5 h-5" />

                    <span className="mx-4 font-medium">User Profile</span>
                  </NavLink>
                  <NavLink
                    to="RequestedMeals"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-yellow-400   hover:text-gray-700 ${
                        isActive
                          ? 'bg-yellow-400  text-gray-700'
                          : 'text-gray-600'
                      }`
                    }
                  >
                    <FaCodePullRequest className="w-5 h-5" />

                    <span className="mx-4 font-medium">Requested Meals</span>
                  </NavLink>
                  <NavLink
                    to="MyReview"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-yellow-400   hover:text-gray-700 ${
                        isActive
                          ? 'bg-yellow-400  text-gray-700'
                          : 'text-gray-600'
                      }`
                    }
                  >
                    <MdOutlineReviews className="w-5 h-5" />

                    <span className="mx-4 font-medium">MyReview</span>
                  </NavLink>
                  <NavLink
                    to="paymentHistory"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-yellow-400   hover:text-gray-700 ${
                        isActive
                          ? 'bg-yellow-400  text-gray-700'
                          : 'text-gray-600'
                      }`
                    }
                  >
                    <MdOutlinePayment className="w-5 h-5" />

                    <span className="mx-4 font-medium">Payment History</span>
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-yellow-400   hover:text-gray-700 ${
                isActive ? 'bg-yellow-400  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FaHome className="w-5 h-5" />

            <span className="mx-4 font-medium">Home</span>
          </NavLink>
          <button
            onClick={logout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-yellow-400   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
