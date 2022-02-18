import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiAddToCart, apiGetCountInStock } from '../Api/nutritivApi'

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  return (
    <div
      key={product._id}
      onClick={() => navigate(`/product/${product.title}`)}
      style={{
        background: "lightgray",
      }}
    >
      {/* GENERAL INFO */}
      <h2>
        {product.title}
      </h2>
      <span>
        {product.desc}
      </span>
      {/* IMAGES */}
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
    </div>
  )
}
