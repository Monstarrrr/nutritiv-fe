import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiAddToCart, apiGetCountInStock, apiGetProductByTitle } from '../Api/nutritivApi';

export const ProductPage = () => {
  const { productTitle } = useParams();
  const [countInStock, setCountInStock] = useState(0)
  const [availableQuantity, setAvailableQuantity] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const [selectedItem, setSelectedItem] = useState({
    productId: "",
    load: 0,
    price: 0,
    quantity: 0,
  })
  const [product, setProduct] = useState({
    productItems: []
  })
  
  // GET PRODUCT
  useEffect(() => {
    try {
      async function fetchApi() {
        const data = await apiGetProductByTitle(productTitle)
        setProduct(data);
      }
      fetchApi();
    } catch (err) {
      console.log('# apiGetProductByTitle err :', err)
    }
  }, [productTitle])

  // GET STOCK
  useEffect(() => {
    if(selectedItem.productId) {
      try {
        async function fetchApi() {
          const data = await apiGetCountInStock(selectedItem.productId);
          setCountInStock(data)
        }
        fetchApi();
      } catch (err) {
        console.log('# apiGetCountInStock err :', err)
      }
    }
  }, [selectedItem.productId, addedToCart]);
  
  // HANDLE QUANTITY
  const handleSelectedQuantity = (quantity) => {
    setSelectedItem({
      ...selectedItem,
      quantity
    })
  }
  useEffect(() => {
    if(selectedItem.load && countInStock){
      setAvailableQuantity(Math.floor(countInStock / selectedItem.load))
    }
  }, [selectedItem.load, countInStock]);
  
  // HANDLE ITEM
  const handleSelectedItem = (item) => {
    setSelectedItem({...item, quantity: 1})
  }
  
  // HANDLE ADD TO CART
  const handleAddToCart = async () => {
    await apiAddToCart(selectedItem);
    setAddedToCart(!addedToCart);
  }

  return (
    <>
      <h2>
        { product.title }
      </h2>
      <div>
        {
          product.productItems.map((item, i) => (
            <React.Fragment key={i}>
              <input 
                id={`${product._id}${item.load}`} 
                name={product._id}
                onChange={() => handleSelectedItem({
                  productId: product._id,
                  load: item.load,
                  price: item.price.value,
                })}
                type="radio" 
                value={item.load}
              />
              <label htmlFor={i}>
                {item.load}
              </label>
            </React.Fragment>
          ))
        }
      </div>
      {
        <select 
          disabled={!availableQuantity}
          id={product._id}
          name="quantity" 
          onChange={(e) => handleSelectedQuantity(e.target.value)}
          value={selectedItem.quantity}
        >
          {
            (selectedItem.productId && availableQuantity) ? (
              [...Array(availableQuantity)].map((e, i) => (
                <option 
                  key={i}
                  value={e}
                >
                  {i+1}
                </option>
              ))
            ) : null
          }
        </select>
      }
      <button 
        disabled={!selectedItem.productId}
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </>
  )
}
