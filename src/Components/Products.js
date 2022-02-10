import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../Api/nutritivApi';

export default function Products() {
  const [productsData, setProductsData] = useState({products: []})
  const [productsLoading, setproductsLoading] = useState(true)
  const [input, setInput] = useState("")
  

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
        console.log('# killme')
      }
    };
    getProducts();
    return () => { isSubscribed = false }
  }, [])
  
  // products[0] is always true because initial state is set to 
  // { products: [] }
  const columns = products[0] && Object.keys(products[0])
  
  function search(rows) {
    return rows.filter(row => (
      columns.some(column => (
        row[column].toString().toLowerCase().indexOf(input.toLowerCase()) > -1
      ))
    ))
  }
  
  return (
    <div>
      {
        productsLoading && (
          <h1 style={{fontSize: 62}}>
            Products are loading...
          </h1>
        )
      }
      <input 
        onChange={(e) => setInput(e.target.value)} 
        type="text"
        value={input}
      />
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
            search(products).map(row => (
              <tr key={row._id}>
                {
                  columns.map((column, i) => (
                    <React.Fragment key={i}>
                      {
                        column === 'productItems' ? (
                          <td style={{border: '1px solid black'}}>
                            <table>
                              <tbody>
                                <tr>
                                  {
                                    row[column].map((item, i) => (
                                      <td key={i}>
                                        {item.load}
                                      </td>
                                    ))
                                  }
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        ) : (
                          <td style={{border: '1px solid black'}}>
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
