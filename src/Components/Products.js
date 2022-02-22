import React, { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate";
import { apiGetProductsBySlice } from '../Api/nutritivApi';
import { ProductCard } from './ProductCard';

export const Products = () => {  
  console.log("######################")
  const [products, setProducts] = useState([])
  const [productsToDisplay, setProductsToDisplay] = useState([])
  const [totalProductsCount, setTotalProductsCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  
  const productsPerPage = 4
  const pagesVisited = pageNumber * productsPerPage
  const productsLoadedStart = pagesVisited - productsPerPage
  const productsLoadedEnd = pagesVisited + (productsPerPage * 2)
  const pageCount = Math.ceil(totalProductsCount / productsPerPage)
  
  useEffect(() => {
    pageNumber > 0 ? (
      setProductsToDisplay(products.slice(
        productsPerPage,
        productsPerPage * 2    
      ))
    ) : (
      setProductsToDisplay(products.slice(
        0,
        productsPerPage    
      ))
    )
  }, [pageNumber, products])
  
  console.log(
    '# productsToDisplay :', 
    pageNumber > 0 ? (
      productsPerPage,
      productsPerPage * 2
    ) : (
      0, 
      productsPerPage
    )
  )
  
  const changePage = ({ selected })  => {
    console.log('# page :', selected)
    setPageNumber(selected)
  }

  useEffect(() => {
    async function fetchApi() {
      try {
        setLoading(true)
        
        const data = await apiGetProductsBySlice(
          productsLoadedStart < 0 ? 0 : productsLoadedStart,
          productsLoadedEnd
        );
        console.log('# data.products :', data.products)
        setProducts(data.products)
        setTotalProductsCount(data.length)
        setLoading(false)
      } catch (err) {
        console.log('# apiGetProducts() err :', err)
      }
    }
    fetchApi();
  }, [pageNumber, productsLoadedEnd, productsLoadedStart]);
  
  return (
    <div>
      {/* {
        loading ? (
          <h2>
            Loading products...
          </h2>
        ) : (
          <> */}
            {
              productsToDisplay.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                />
              ))
            }
            <ReactPaginate 
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
            />
          {/* </>
        )
      } */}
    </div>
  )
}
