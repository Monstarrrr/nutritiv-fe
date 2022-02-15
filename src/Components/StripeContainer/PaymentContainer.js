import React, { useState } from 'react';
import { 
  CardElement, 
  PaymentElement, 
  useElements, 
  useStripe 
} from '@stripe/react-stripe-js';
import { apiGetStripeSecret } from '../../Api/nutritivApi';

export const PaymentContainer = () => {
  const [clientSecret, setClientSecret] = useState("")
  const [errorMessage, setErrorMessage] = useState(null);
  // const stripe = useStripe();
  // const elements = useElements();
  
  const handleGetClientSecret = async () => {
      const data = await apiGetStripeSecret();
      setClientSecret(data);
  }
  
  return (
    <>
      <button onClick={handleGetClientSecret}>
        Get client_secret
      </button>
      <div style={{maxWidth: "600px"}}>
        <h1>Stripe form</h1>
        <form onSubmit={handleGetClientSecret}>
          <PaymentElement options={clientSecret}/>
          <button>
            Buy
          </button>  
        </form>        
      </div>
    </>
  )
}
