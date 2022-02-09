import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../Api/nutritivApi';

export default function Products() {
  const [productsData, setProductsData] = useState({products: []})
  const [productsLoading, setproductsLoading] = useState(true)
  
  const { products } = productsData;
  
  const removeProductItems = data => {
    let products = data.products;
    products.map(product => (
      delete product.productItems
    ))
  }
  
  useEffect(() => {
    let isSubscribed = true;
    const getProducts = async () => {
      try {
        const data = await apiGetProducts(3);
        if(isSubscribed) {
          console.log('# /products/?limit res :', data)
          // removeProductItems(data);
          setProductsData(data);
          setproductsLoading(false);
        }
      } catch(err) {
        console.error('# err', err)
        console.log('# killme')
      }
    };
    getProducts();
    return () => { isSubscribed = false }
  }, [])
  
  // products[0] is always true because initial state is set to 
  // { products: [] }
  const columns = products[0] && Object.keys(products[0])

  return (
    <div>
      {
        productsLoading && (
          <h1 style={{fontSize: 62}}>
            Products are loading...
          </h1>
        )
      }
      <table cellSpacing={5} cellPadding={5}>
        <thead>
          <tr>
            {
              products[0] && (
                columns.map((headerValue, i) => (
                  <th key={i}>
                    {headerValue}
                  </th>
                ))
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            products.map(row => (
              <tr key={row._id}>
                {
                  columns.map((column, i) => (
                    <React.Fragment key={i}>
                      {
                        column === 'productItems' ? (
                          <table>
                            <tr>
                              {
                                row[column].map(item => (
                                  <td>
                                    {item.load}
                                  </td>
                                ))
                              }
                            </tr>
                          </table>
                        ) : (
                          <td>
                            {row[column]}
                          </td>
                        )
                      }
                    </React.Fragment>
                  ))
                }
              </tr>
            ))
          }
          <tr>
            <td>
            
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
