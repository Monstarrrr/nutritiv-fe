import React, { useEffect, useState } from 'react'
import { apiGetProducts } from '../Api/nutritivApi';
import { ProductCard } from './ProductCard';

export const Products = () => {  
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    async function fetchApi() {
      try {
        const data = await apiGetProducts(4);
        setProducts(data)
      } catch (err) {
        console.log('# apiGetProducts() err :', err)
      }
    }
    fetchApi();
  }, []);
  
  return (
    <div>
      {
        products.map(product => (
          <ProductCard key={product._id} product={product}/>
        ))
      }
    </div>
  )
}
