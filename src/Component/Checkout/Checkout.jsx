import { useLoaderData } from 'react-router-dom';

import Payment from './Payment/Payment';

const Checkout = () => {
  const singlePack = useLoaderData();

  return (
    <div className="  flex justify-center">
      <div className="flex flex-col max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800 border rounded-2xl shadow-xl shadow-yellow-500">
        <h2 className="text-2xl font-bold">Checkout Now</h2>
        <div>
          <h2 className="font-bold">Package Name : {singlePack.name}</h2>
          <h2 className="font-bold">Package Price : {singlePack.price}</h2>
          <h2 className="font-bold">Package Currency: {singlePack.currency}</h2>
          <h2 className="font-bold">
            Package Details : {singlePack.description}
          </h2>
        </div>
        <Payment singlePack={singlePack}></Payment>
      </div>
    </div>
  );
};

export default Checkout;
