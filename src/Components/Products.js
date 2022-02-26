import React, { useEffect, useState } from 'react'

import { apiGetProductsByLimit } from '../Api/nutritivApi';
import { ProductCard } from './ProductCard';
import './products.scss';
import { Pagination } from '@mui/material';

export const Products = () => {  
  console.log("######################")
  const [allProducts, setAllProducts] = useState([])
  const [allFilteredProducts, setAllFilteredProducts] = useState([])
  const [productsToDisplay, setProductsToDisplay] = useState(0)
  
  const [page, setPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(10)
  const [productsPerPage, setProductsPerPage] = useState(5)
  
  const [loading, setLoading] = useState(false)
  const [errorApiGetProducts, setErrorApiGetProducts] = useState(false)
  
  const [filterByTitleInput, setFilterByTitleInput] = useState("")
  const [filterByShapeInput, setFilterByShapeInput] = useState("")
  

  // API EFFECT
  useEffect(() => {
    async function fetchApi() {
      try {
        setLoading(true)
        const data = await apiGetProductsByLimit();
        setAllProducts(data)
        setAllFilteredProducts(data)
        setLoading(false)
      } catch (err) {
        setErrorApiGetProducts(true)
        console.log('# apiGetProzducts() err :', err)
      }
    }
    fetchApi();
  }, []);

  
  // TOTAL PAGES EFFECT
  useEffect(() => {
    setNumberOfPages(Math.ceil(allFilteredProducts.length / productsPerPage))
  }, [
    productsPerPage,
    allProducts.length,
    allFilteredProducts
  ]);
  

  // DISPLAY EFFECT
  useEffect(() => {
    
    const filterByTitle = (array) => filterByTitleInput ? (
      array.filter((product) => {
        return (
          product.title.toLowerCase().includes(filterByTitleInput.toLowerCase())
        )
      })
    ) : array;

    const filterByShape = (array) => filterByShapeInput ? (
      array.filter((product) => {
        return (
          product.shape.toLowerCase() === filterByShapeInput.toLowerCase()
        )
      })
    ) : array;
    
    let result = allProducts;
    result = filterByTitle(result)    
    result = filterByShape(result)
    
    setAllFilteredProducts(result)
    setProductsToDisplay(
      result.slice(
        productsPerPage * page - productsPerPage,
        productsPerPage * page
      )
    )
  
  }, [
    allProducts, 
    page, 
    productsPerPage, 
    filterByTitleInput, 
    filterByShapeInput
  ]);
  

  // HANDLERS
  const handleProductsFilter = (e) => {
    setFilterByTitleInput(e.target.value)
  }
  const handleFilterByShapeInput = (e) => {
    setFilterByShapeInput(e.target.value)
  }
  const handleChangeActivePage = (e, val) => {
    setPage(val)
  }
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
            <br />
            <input 
              onChange={handleProductsFilter}
              placeholder="Search a product..."
              type="text" 
            />
            <form>
              <select 
                onChange={handleFilterByShapeInput}
                name="shapeFilter"
              >
                <option value="">Shape</option>
                <option value="capsules">Capsule</option>
                <option value="powder">Powder</option>
              </select>
            </form>
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
              onChange={handleChangeActivePage}
            />
            <form>
              <label for="productsPerPage">
                Products per page: 
              </label>
              <select 
                onChange={handleChangeProductsPerPage}
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
