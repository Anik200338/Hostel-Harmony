import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const UpcomingMeals = () => {
  const axiosPublic = useAxiosPublic();
  const { data: meal = [] } = useQuery({
    queryKey: ['meal'],
    queryFn: async () => {
      const res = await axiosPublic.get('/meal');
      return res.data;
    },
  });
  console.log(meal);

  return <div>this is upcoming{meal.length}</div>;
};

export default UpcomingMeals;
