import React, { useState } from 'react';
import { 
  CardElement, 
  PaymentElement, 
  useElements, 
  useStripe 
} from '@stripe/react-stripe-js';
import './PaymentContainer.scss';
import { apiCreateCheckoutSession } from '../../Api/nutritivApi';

export const PaymentContainer = () => {
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await apiCreateCheckoutSession();
      console.log('# stripe/create-checkout-session data :', data)
    } catch (err) {
      console.log('# stripe/create-checkout-session err :', err)
    }
  }

  return (
    <div id="paymentContainer">
      <form>
        <button onClick={handleSubmit}>
          Checkout
        </button>
      </form>
    </div>
  )
}
