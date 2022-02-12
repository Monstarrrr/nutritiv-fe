import React, { useEffect, useMemo, useState } from 'react';
import { apiGetProducts } from '../../Api/nutritivApi';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import { GROUPED_COLUMNS } from './Columns';
import './table.css';
import { GlobalFilter } from './GlobalFilter';

export default function Products() {
  const [productsData, setProductsData] = useState({products: []})
  const [productsLoading, setproductsLoading] = useState(true)
  
  const [input, setInput] = useState("")
  
  const { products } = productsData;

  
  useEffect(() => {
    let isSubscribed = true;
    const removeLoadPrice = () => {
      delete products.productItems
    }
    const getProducts = async () => {
      try {
        const data = await apiGetProducts(4);
        if(isSubscribed) {
          console.log('# /products/?limit res :', data)
          removeLoadPrice(data)
          setProductsData(data);
          setproductsLoading(false);
        }
      } catch(err) {
        console.error('# err', err)
      }
    };
    getProducts();
    return () => { isSubscribed = false }
  }, [products.productItems])
  
  const columns = useMemo(() => GROUPED_COLUMNS, [])
  const data = useMemo(() => products, [products])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
  }, useGlobalFilter, useSortBy)
  
  const { globalFilter } = state;
  
  return (
    <>
      <GlobalFilter 
        filter={globalFilter}
        setFilter={setGlobalFilter}
      />
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
              headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps}>
                  {
                    headerGroup.headers.map((column, i) => (
                      <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}>
                        { column.render('Header') }
                        <span>
                          {
                            column.isSorted ? (
                              column.isSortedDesc ? ' ⬇️' : ' ⬆️'
                            ) : ''
                          }
                        </span>
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
                  <tr key={row.id} {...row.getRowProps()}>
                    {
                      row.cells.map((cell, i) => {
                        return (
                          <td key={i} {...cell.getCellProps}>
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
    </>
  )
}
