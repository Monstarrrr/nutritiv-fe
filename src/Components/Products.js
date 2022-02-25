import React, { useEffect, useState } from 'react'
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';

import { apiGetProductsByLimit, apiGetProductsBySlice } from '../Api/nutritivApi';
import UsePagination from './UsePagination';
import { ProductCard } from './ProductCard';
import './products.scss';
import { List, Pagination } from '@mui/material';
import { ProductsPagination } from './ProductsPagination';

export const Products = () => {  
  console.log("######################")
  const [errorApiGetProducts, setErrorApiGetProducts] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const [productsToDisplay, setProductsToDisplay] = useState(0)

  const [page, setPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(10)
  const [productsPerPage, setProductsPerPage] = useState(5)
  
  
  useEffect(() => {
    async function fetchApi() {
      try {
        setLoading(true)
        const data = await apiGetProductsByLimit();
        console.log('# data.products :', data)
        setAllProducts(data)
        setLoading(false)
      } catch (err) {
        setErrorApiGetProducts(true)
        console.log('# apiGetProzducts() err :', err)
      }
    }
    fetchApi();
  }, [page]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(allProducts.length / productsPerPage))
    console.log("calculating productsToDisplay")
    setProductsToDisplay(
      allProducts.slice(
        productsPerPage * page - productsPerPage,
        productsPerPage * page
      )
    )
  }, [allProducts, page, productsPerPage]);
  
  const handleChangeProductsPerPage = (e) => {
    setProductsPerPage(e.target.value)
  }

  return (
    <div id="products">
      {
        loading ? (
          <h2>
            Loading products...
          </h2>
        ) : (
          <>
            {
              productsToDisplay && productsToDisplay.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                />
              ))
            }
            <Pagination
              count={numberOfPages}
              page={page}
              onChange={(e, val) => setPage(val)}
            />
            <form onSubmit={handleChangeProductsPerPage}>
              <label for="productsPerPage">Products per page: </label>
              <select 
                onChange={(e) => setProductsPerPage(e.target.value)}
                id="selectProductsPerPage"
                name="productsPerPage" 
              >
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="30">30</option>
              </select>
            </form>
          </>
        )
      }
    </div>
  )
}
