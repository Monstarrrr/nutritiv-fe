import React from 'react'
import { apiAddToCart } from '../../Api/nutritivApi'

export const ProductCard = ({ product }) => {
  
  console.log('# product :', product)

  const handleAddToCart = async () => {
    await apiAddToCart(product);
  }
  
  return (
    <div
      key={product.id}
      style={{
        background: "lightgray",
      }}
    >
      <h2>
        {product.title}
      </h2>
      <span>
        {product.desc}
      </span>
      {
        product.imgs.map((img, i) => (
          <img
            style={{
              paddingLeft: "22px",
              maxWidth: "100px",
            }}
            key={i} 
            src={`${process.env.REACT_APP_SERVER_ADDRESS}${img}`}
            alt={`${product.title} ${i+1}`} 
          />
        ))
      }
      <button onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  )
}
