import React, { useEffect, useMemo, useState } from 'react';
import { apiGetProducts } from '../Api/nutritivApi';
import { useSortBy, useTable } from 'react-table';
import { GROUPED_COLUMNS } from './Table/Columns';
import './Table/table.css'

export default function Products() {
  const [productsData, setProductsData] = useState({products: []})
  const [productsLoading, setproductsLoading] = useState(true)
  
  const [input, setInput] = useState("")
  
  const { products } = productsData;

  const removeLoadPrice = () => {
    delete products.productItems
  }

  useEffect(() => {
    let isSubscribed = true;
    const getProducts = async () => {
      try {
        const data = await apiGetProducts(3);
        if(isSubscribed) {
          console.log('# /products/?limit res :', data)
          removeLoadPrice(data)
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
  
  const columns = useMemo(() => GROUPED_COLUMNS, [])
  const data = useMemo(() => products, [products])

  const tableInstance = useTable({
    columns,
    data,
  })
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
  
  return (
    <div>
      {
        productsLoading && (
          <h1 style={{fontSize: 62}}>
            Products are loading...
          </h1>
        )
      }
      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps}>
                {
                  headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                      { column.render('Header') }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps}>
                          { cell.render('Cell') }
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>    
    </div>
  )
}
