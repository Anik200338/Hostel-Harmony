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
        element: <Mealdetails></Mealdetails>,
      },
      {
        path: '/checkout/:id',
        element: <Checkout></Checkout>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/singlePack/${params.id}`),
      },
    ],
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/register',
    element: <Register></Register>,
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'ManageUsers',
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: 'addMeal',
        element: <AddMeal></AddMeal>,
      },
      {
        path: '/dashboard/upmeals/addUpcomingMeal',
        element: <AddUpcoming></AddUpcoming>,
      },
      {
        path: 'upmeals',
        element: <UpMeals></UpMeals>,
      },
      {
        path: 'AllReview',
        element: <AllReview></AllReview>,
      },
      {
        path: 'MyReview',
        element: <Myreview></Myreview>,
      },
      {
        path: '/dashboard/MyReview/UpdateReview/:id',
        element: <UpdateReview></UpdateReview>,
      },
      {
        path: 'ServeMeals',
        element: <ServeMeals></ServeMeals>,
      },
      {
        path: 'RequestedMeals',
        element: <RequestedMeals></RequestedMeals>,
      },
      {
        path: 'allMeals',
        element: <AllMeals></AllMeals>,
      },
      {
        path: '/dashboard/allMeals/allMealsUpdate/:id',
        element: <AllMealsUpdate></AllMealsUpdate>,
      },
    ],
  },
]);

export default router;
