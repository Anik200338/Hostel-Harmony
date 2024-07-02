import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '../Pages/ErrorPage/ErrorPage';

import AddMeal from '../Pages/DashboardPage/AddMeal/AddMeal';

import UpcomingMeals from '../Pages/UpcomingMeals/UpcomingMeals';
import UpMeals from '../Pages/DashboardPage/UpMeals/UpMeals';
import Home from '../Pages/Home/Home';
import Login from '../Component/Login/Login';
import Register from '../Component/Register/Register';
import Main from '../Layout/Main/Main';
import Dashboard from '../Layout/Dashboard/Dashbord';
import Meals from '../Pages/Meals/Meals';
import AddUpcoming from '../Pages/DashboardPage/AddUpcoming/AddUpcoming';
import Mealdetails from '../Pages/Mealdetails/Mealdetails';
import AllReview from '../Pages/DashboardPage/AllReview/AllReview';
import Myreview from '../Pages/DashboardPage/Myreview/Myreview';
import UpdateReview from '../Component/UpdateReview/UpdateReview';
import ServeMeals from '../Pages/DashboardPage/ServeMeals/ServeMeals';
import RequestedMeals from '../Pages/DashboardPage/MealRequest/RequestedMeals';
import ManageUsers from '../Pages/DashboardPage/UpMeals/ManageUsers/ManageUsers';
import Checkout from '../Component/Checkout/Checkout';
import AllMeals from '../Pages/DashboardPage/AllMeals/AllMeals';
import AllMealsUpdate from '../Component/allMealsUpdate/AllMealsUpdate';
import AdminProfile from '../Pages/DashboardPage/AdminProfile/AdminProfile';
import UserProfile from '../Pages/DashboardPage/UserProfile/UserProfile';
import PHistory from '../Pages/DashboardPage/PHistory/PHistory';

import AdminRoute from './AdminRoute/AdminRoute';
import PrivateRoute from './Private/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/meals',
        element: <Meals></Meals>,
      },
      {
        path: '/upcoming',
        element: <UpcomingMeals></UpcomingMeals>,
      },
      {
        path: '/mealDetails/:id',
        element: (
          <PrivateRoute>
            <Mealdetails></Mealdetails>
          </PrivateRoute>
        ),
      },
      {
        path: '/checkout/:id',
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-beige-tau.vercel.app/singlePack/${params.id}`
          ),
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
    ],
  },

  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'ManageUsers',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'addMeal',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddMeal></AddMeal>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/upmeals/addUpcomingMeal',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddUpcoming></AddUpcoming>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'upmeals',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpMeals></UpMeals>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'AllReview',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllReview></AllReview>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'MyReview',
        element: (
          <PrivateRoute>
            <Myreview></Myreview>
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/MyReview/UpdateReview/:id',
        element: (
          <PrivateRoute>
            <UpdateReview></UpdateReview>
          </PrivateRoute>
        ),
      },
      {
        path: 'ServeMeals',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ServeMeals></ServeMeals>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'RequestedMeals',
        element: (
          <PrivateRoute>
            <RequestedMeals></RequestedMeals>
          </PrivateRoute>
        ),
      },
      {
        path: 'allMeals',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllMeals></AllMeals>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'adminProfile',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminProfile></AdminProfile>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'userProfile',
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/allMeals/allMealsUpdate/:id',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllMealsUpdate></AllMealsUpdate>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'paymentHistory',
        element: (
          <PrivateRoute>
            <PHistory></PHistory>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
