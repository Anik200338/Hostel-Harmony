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
    ],
  },
]);

export default router;
