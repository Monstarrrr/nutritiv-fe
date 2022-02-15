import React from 'react';
import { apiStripePayment } from '../../Api/nutritivApi';

export const PaymentContainer = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const data = apiStripePayment();
      console.log('# apiStripePayment data :', data)
    } catch (err) {
      console.log('# err :', err)
    }
  }
  
  return (
    <form 
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <div id="payment-element">
        {/* Displays payment form */}
      </div>
      <button 
        id="submit"
        type="submit"
      >
        <div className="spinner hidden" id="spinner"></div>
        <span 
          id="button-text"
        >
          Pay now
        </span>
      </button>
      <div id="payment-message" className="hidden"></div>
    </form>
  )
}
