import React, { useEffect, useState } from 'react'

import { apiGetProductsByLimit } from '../Api/nutritivApi';
import { ProductCard } from './ProductCard';
import './products.scss';
import { Pagination } from '@mui/material';

export const Products = () => {  
  console.log("######################")
  const [allProducts, setAllProducts] = useState([])
  const [productsToDisplay, setProductsToDisplay] = useState(0)
  
  const [page, setPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(10)
  const [productsPerPage, setProductsPerPage] = useState(5)
  
  const [loading, setLoading] = useState(false)
  const [errorApiGetProducts, setErrorApiGetProducts] = useState(false)
  
  const [filterInput, setFilterInput] = useState("")
  
  // API EFFECT
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
  }, []);
  
  // DISPLAY EFFECT
  useEffect(() => {
    setNumberOfPages(Math.ceil(allProducts.length / productsPerPage))
    
    const filteredProducts = filterInput ? (
      allProducts.filter((product) => {
        return product.title.toLowerCase().includes(filterInput.toLowerCase())
      })
    ) : allProducts

    setProductsToDisplay(
      filteredProducts.slice(
        productsPerPage * page - productsPerPage,
        productsPerPage * page
      )
    )
    console.log('# allProducts :', allProducts)
    console.log('# productsToDisplay :', productsToDisplay)
  }, [allProducts, page, productsPerPage, filterInput]);
  
  // HANDLERS
  const handleChangeProductsPerPage = (e) => {
    setProductsPerPage(e.target.value)
  }
  const handleProductsFilter = (e) => {
    setFilterInput(e.target.value)
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
            <input 
              onChange={handleProductsFilter}
              placeholder="Search a product..."
              type="text" 
            />
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
