import React, { useEffect, useState } from 'react'
import { apiAddToCart, apiGetCountInStock } from '../../Api/nutritivApi'

export const ProductCard = ({ product }) => {
  const [selectedItem, setSelectedItem] = useState({
    productId: "",
    load: 0,
    price: 0,
  })
  const [selectedQuantity, setSelectedQuantity] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [availableQuantity, setAvailableQuantity] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  console.log('# availableQuantity :', availableQuantity)

  useEffect(() => {
    if(selectedItem.productId) {
      async function fetchApi() {
        const { countInStock } = await apiGetCountInStock(selectedItem.productId);
        setCountInStock(countInStock)
      }
      fetchApi();
    }
  }, [selectedItem.productId, addedToCart]);
  
  useEffect(() => {
    console.log('# countInStock :', countInStock)
    console.log('# selectedItem.load :', selectedItem.load)
    if(selectedItem.load && countInStock){
      setAvailableQuantity(
        Math.floor(countInStock / selectedItem.load)
      )
    }
  }, [selectedItem.load, countInStock]);
  
  const handleSelectedItem = (itemValues) => {
    setSelectedItem(itemValues)
    setSelectedQuantity(1)
  }
  
  const handleSelectedQuantity = (quantity) => {
    setSelectedQuantity(quantity)
  }
  
  const handleAddToCart = async () => {
    selectedItem.quantity = selectedQuantity;
    await apiAddToCart(selectedItem);
    setAddedToCart(!addedToCart);
  }
  
  return (
    <div
      key={product._id}
      style={{
        background: "lightgray",
      }}
    >
      {/* GENERAL INFO */}
      <h2>
        {product.title}
      </h2>
      <span>
        {product.desc}
      </span>
      {/* IMAGES */}
      {
        product.imgs.map((img, i) => (
          <img
            style={{
              paddingLeft: "22px",
              maxWidth: "100px",
            }}
            key={i}
            src={`${process.env.REACT_APP_SERVER_ADDRESS}${img}`}
            alt={`${product.title} ${i+1}`}
          />
        ))
      }
      {/* ITEMS */}
      <div>
        {
          product.productItems.map((item, i) => (
            <>
              <input 
                type="radio" 
                id={`${product._id}${item.load}`} 
                name={product._id}
                onChange={() => handleSelectedItem({
                  productId: product._id,
                  load: item.load,
                  price: item.price.value,
                })}
                value={item.load}
              />
              <label for={i}>
                {item.load}
              </label>
            </>
          ))
        }
      </div>
      {/* QUANTITY */}
      {
        <select 
          disabled={!selectedItem.productId}
          id={product._id}
          name="quantity" 
          onChange={(e) => handleSelectedQuantity(e.target.value)}
          value={selectedQuantity}
        >
          {
            selectedItem.productId ? (
              [...Array(availableQuantity)].map((e, i) => (
                <option value={e}>
                  {i+1}
                </option>
              ))
            ) : null
          }
        </select>
      }
      {/* ADD TO CART */}
      <button onClick={handleAddToCart}>
        Add to cart
      </button>
      <h2>
        {JSON.stringify(selectedItem, null, 2) }
      </h2>
      <h2>
        {JSON.stringify(selectedQuantity, null, 2) }
      </h2>
    </div>
  )
}
