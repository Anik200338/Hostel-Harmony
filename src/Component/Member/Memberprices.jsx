import { Link } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Memberprices = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: packages = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const res = await axiosPublic.get('/packages');
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(packages);

  return (
    <section className="py-20 dark:bg-gray-100 dark:text-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <span className="font-bold tracking-wider uppercase text-yellow-500">
            Membership
          </span>
          <h2 className="text-4xl font-bold lg:text-5xl">
            Choose your best plan
          </h2>
        </div>
        <div className="flex flex-wrap items-stretch -mx-4   justify-evenly">
          {packages.map(pkg => (
            <Link
              to={`/checkout/${pkg.name}`}
              key={pkg.packageName}
              className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-80 lg:mb-0 shadow-2xl border border-yellow-400  rounded-3xl shadow-yellow-300"
            >
              <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50">
                <div className="space-y-2">
                  <h4 className="text-4xl font-extrabold text-center mb-5 uppercase">
                    {pkg.name}
                  </h4>
                  <span className="text-6xl font-bold">${pkg.price}</span>
                </div>
                <ul className="flex-1 mb-6 dark:text-yellow-600">
                  <li className="flex mb-2 space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6 dark:text-yellow-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{pkg.description}</span>
                  </li>
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memberprices;
