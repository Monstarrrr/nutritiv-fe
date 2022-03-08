import React from 'react';
import './PaymentContainer.scss';
import nutritivApi, { apiCreateCheckoutSession } from '../Api/nutritivApi';

export const PaymentContainer = () => {
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const { data } = await nutritivApi.post(
        '/stripe/create-checkout-session',
      );
      console.log('# stripe/create-checkout-session data :', data)
    } catch (err) {
      console.log('# stripe/create-checkout-session :', err)
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
