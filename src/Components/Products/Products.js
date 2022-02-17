import React, { useEffect, useState } from 'react'
import { apiGetProducts } from '../../Api/nutritivApi';
import { ProductCard } from '../ProductCard/ProductCard';

export const Products = () => {  
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    async function fetchApi() {
      const data = await apiGetProducts(4);
      setProducts(data)
    }
    fetchApi();
  }, []);
  
  return (
    <div>
      {
        products.map(product => (
          <ProductCard product={product}/>
        ))
      }
    </div>
  )
}
