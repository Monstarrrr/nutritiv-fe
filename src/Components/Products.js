import React, { useEffect, useState } from 'react'

import { apiGetAllUniqueTags, apiGetProductsByLimit } from '../Api/nutritivApi';
import { ProductCard } from './ProductCard';
import './products.scss';
import { Pagination } from '@mui/material';

export const Products = () => {  
  console.log("###########-Products-###########")
  
  const [allProducts, setAllProducts] = useState([])
  const [allFilteredProducts, setAllFilteredProducts] = useState([])
  const [productsToDisplay, setProductsToDisplay] = useState(0)
  
  const [page, setPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(10)
  const [productsPerPage, setProductsPerPage] = useState(5)
  
  const [loading, setLoading] = useState(false)
  const [errorApiGetProducts, setErrorApiGetProducts] = useState(false)
  
  const [filterByTextInput, setFilterByTextInput] = useState("")
  const [filterByShapeInput, setFilterByShapeInput] = useState("")
  const [filterByTagsInput, setFilterByTagsInput] = useState([])
  const [filterByPriceMinInput, setFilterByPriceMinInput] = useState(0)
  const [filterByPriceMaxInput, setFilterByPriceMaxInput] = useState(0)
  
  const [allTags, setAllTags] = useState([])
  
  // API EFFECTS
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
        console.log('# apiGetProducts() err :', err)
      }
    }
    fetchApi();
  }, []);
  useEffect(() => {
    async function fetchApi() {
      try {
        setLoading(true)
        const data = await apiGetAllUniqueTags();
        setAllTags(data)
      } catch (err) {
        console.log('# apiGetAllUniqueTags() err :', err)
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
    
    const filterByText = (array) => filterByTextInput ? (
      array.filter((product) => {
        let titleFilter = product.title.toLowerCase().includes(filterByTextInput)
        let descFilter = product.desc.toLowerCase().includes(filterByTextInput)

        return titleFilter || descFilter;
      })
    ) : array;

    const filterByShape = (array) => filterByShapeInput ? (
      array.filter((product) => {
        return (
          product.shape.toLowerCase() === filterByShapeInput
        )
      })
    ) : array;
    
    const filterByTags = (array) => filterByTagsInput ? (
      array.filter((product) => {
        return filterByTagsInput.every(tag => product.tags.includes(tag))
      })
    ) : array;
    
    let result = allProducts;
    result = filterByText(result)    
    result = filterByShape(result)
    result = filterByTags(result)
    
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
    filterByTextInput, 
    filterByShapeInput,
    filterByTagsInput
  ]);

  // HANDLERS
  const handleProductsFilter = (e) => {
    setFilterByTextInput(
      e.target.value.toLowerCase()
    )
  }
  const handleFilterByShapeInput = (e) => {
    setFilterByShapeInput(
      e.target.value.toLowerCase()
    )
  }
  const handleChangeActivePage = (e, val) => {
    setPage(val)
  }
  const handleChangeProductsPerPage = (e) => {
    setProductsPerPage(e.target.value)
  }
  const handleFilterByTags = (e) => {
    e.target.checked ? (
      setFilterByTagsInput(() => [
        ...filterByTagsInput,
        e.target.name,
      ])
    ) : (
      setFilterByTagsInput(prevState => (
        prevState.filter(tag => tag !== e.target.name)
      )
    ))
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
                allTags && allTags.map((tag, i) => (
                  <div key={i}>
                    <input 
                      defaultChecked={false}
                      name={tag}
                      onClick={handleFilterByTags}
                      type="checkbox"
                    />
                    <label for={tag}>
                      {tag}
                    </label>
                  </div>
                ))
              }
            {
              productsToDisplay && productsToDisplay.map(product => (
                <ProductCard
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
