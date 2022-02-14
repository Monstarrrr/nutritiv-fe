import React from 'react';
import { apiStripePayment } from '../../Api/nutritivApi';

export const PaymentContainer = () => {
  
  const handlePay = () => {
    try {
      const data = apiStripePayment();
      console.log('# apiStripePayment data :', data)
    } catch (err) {
      console.log('# err :', err)
    }
  }
  
  return (
    <form id="payment-form">
      <div id="payment-element">
        {/* Displays payment form */}
      </div>
      <button id="submit">
        <div className="spinner hidden" id="spinner"></div>
        <span 
          onClick={handlePay} 
          id="button-text"
        >
          Pay now
        </span>
      </button>
      <div id="payment-message" className="hidden"></div>
    </form>
  )
}
