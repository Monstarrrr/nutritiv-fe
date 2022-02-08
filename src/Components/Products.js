import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../Api/nutritivApi';

export default function Products() {
  const [productsData, setProductsData] = useState({products: []})
  const [productsLoading, setproductsLoading] = useState(true)
  
  const { products } = productsData;
  
  useEffect(() => {
    let isSubscribed = true;
    const getProducts = async () => {
      try {
        const data = await apiGetProducts(3);
        if(isSubscribed) {
          console.log('# /products/?limit res :', data)
          setProductsData(data);
          setproductsLoading(false);
        }
      } catch(err) {
        console.error('# err', err)
      }
    };
    getProducts();
    return () => { isSubscribed = false }
  }, [])
  
  // products[0] is always true because initial state is set to 
  // { products: [] }
  const productsKeys = products[0] && Object.keys(products[0])
  
  return (
    <div>
      {
        productsLoading && (
          <h1 style={{fontSize: 62}}>Products are loading...</h1>
        )
      }
      <table cellSpacing={5} cellPadding={5}>
        <thead>
          <tr>
            {
              products[0] && (
                productsKeys.map((headerValue) => (
                  <th>{headerValue}</th>
                ))
              )
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>

            </td>
            <td>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
