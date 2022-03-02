import React, { useEffect, useState } from 'react'
import { apiDeleteCartItem, apiGetSelfCart } from '../Api/nutritivApi';
import { PaymentContainer } from './PaymentContainer';

export const Cart = () => {
  const [cart, setCart] = useState(null)
  const [deletedItem, setDeletedItem] = useState(false)

  useEffect(() => {
    async function fetchApi() {
      try {
        const data = await apiGetSelfCart()
        setCart(data)
      } catch(err) {
        console.log('apiGetSelfCart() err :', err)
      }
    }
    fetchApi();
  }, [deletedItem]);
  
  const handleRemoveCartItem = async (productId, id) => {
    try {
      await apiDeleteCartItem(cart.userId, productId, id)
      setDeletedItem(!deletedItem);
    } catch (err) {
      console.log('# apiDeleteCartItem err :', err)
    }
  }
  
  return (
    <div>
      {
        cart ? (
          cart.products.map(product => (
            <div key={product.productId}>
              <hr/>
              <h3>
                Product id: {product.productId}
              </h3>
              {
                product.productItems.map(item => (
                  <React.Fragment key={item.id}>
                    <h4>Item id: {item.id}</h4>
                    <h4>Quantity: {item.quantity}</h4>
                    <button 
                      onClick={() => handleRemoveCartItem(
                        product.productId, 
                        item.id
                      )}
                    >
                      X
                    </button>
                  </React.Fragment>
                ))
              }
            </div>
          ))
        ) : (
          <h2>Cart is empty!</h2>
        )
      }
      <br />
      <PaymentContainer />
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  )
}
