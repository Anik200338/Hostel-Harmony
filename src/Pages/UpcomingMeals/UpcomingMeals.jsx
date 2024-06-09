import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import UpcomingCard from '../../Component/UpcomingCard/UpcomingCard';

const UpcomingMeals = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: UpcomingMeal = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['UpcomingMeal'],
    queryFn: async () => {
      const res = await axiosPublic.get('/UpcomingMeal');
      return res.data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  console.log(UpcomingMeal);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20 lg:p-20">
      {UpcomingMeal.map(UpcomingSingle => (
        <UpcomingCard
          key={UpcomingSingle.id}
          UpcomingSingle={UpcomingSingle}
          refetch={refetch}
        ></UpcomingCard>
      ))}
    </div>
  );
};

export default UpcomingMeals;
