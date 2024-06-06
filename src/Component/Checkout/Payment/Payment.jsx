import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

const Payment = ({ singlePack }) => {
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm singlePack={singlePack}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
