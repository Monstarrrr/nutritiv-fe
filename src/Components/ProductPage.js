import React, { 
  useCallback,
  useEffect, 
  useState 
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import nutritivApi from '../Api/nutritivApi';
import { updateUserCartQuantity } from '../Redux/reducers/user';

export const ProductPage = () => {
  const loggedIn = useSelector(state => state.user.loggedIn)
  const dispatch = useDispatch();
  const { productTitle } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({
    productItems: []
  })
  const [cartSelection, setCartSelection] = useState({
    // productId: "", <- Added at apiGetProductByTitle()
    load: 0,
    price: 0,
    quantity: 0,
  })
  const [countInStock, setCountInStock] = useState(0)
  const [availableQuantity, setAvailableQuantity] = useState(0)
  const [errorOutOfStock, setErrorOutOfStock] = useState(false)
  const [updateStock, setUpdateStock] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  
  console.log('# cartSelection :', cartSelection)

  // HANDLE ADD TO CART
  const handleAddToCart = async () => {
    if(loggedIn){
      try {
        const { data } = await nutritivApi.post(
          `carts/addToCart`,
          cartSelection
        );
        dispatch(
          updateUserCartQuantity(data.cart.totalQuantity)
        )
        setUpdateStock(!updateStock);
        setAddedToCart(true);
        setCartSelection(prevState => ({
          productId: prevState.productId,
          load: 0,
          price: 0,
          quantity: 0,
        }))
        setAvailableQuantity(0)
      } catch (err) {
        console.log('# apiAddToCart err :', err)
      }
    } else {
      navigate(
        '/login',
        { state: 
          { 
            msg: "Login to add a product to your cart.",
            cartSelection,
            from: `/product/${productTitle}`
          }
        }
      );
    }
  }
  
  // GET PRODUCT (by title)
  useEffect(() => {
    try {
      async function fetchApi() {
        const { data } = await nutritivApi.get(
          `/products/findByTitle/${productTitle}`
        )
        
        const fetchedProduct = data.Product[0]
        setProduct(fetchedProduct);

        if(location.state?.productId){
          setCartSelection(location.state)
        } else {
          setCartSelection(prevState => ({
            ...prevState,
            productId: fetchedProduct._id
          }))
        }
      }
      fetchApi();
    } catch (err) {
      console.log('# /products/findByTitle err :', err)
    }
  }, [productTitle, location.state])
  
  // HANDLE SELECTED ITEM
  const handleSelectedItem = (item) => {
    if(countInStock >= item.load) { 
      item.quantity = 1
      setErrorOutOfStock(false)
    } else { 
      setErrorOutOfStock(true) 
    }
    const { load, price, quantity } = item;
    setCartSelection(prevState => ({
      ...prevState,
      load,
      price,
      quantity
    }))
  }

  // GET STOCK
  useEffect(() => {
    if(product._id) {
      try {
        async function fetchApi() {
          const { data } = await nutritivApi.get(
            `/products/countInStock/${product._id}`
          );
          setCountInStock(data.countInStock)
        }
        fetchApi();
      } catch (err) {
        console.log('# apiGetCountInStock err :', err)
      }
    }
  }, [updateStock, product._id]);
  
  // HANDLE QUANTITY
  const handleSelectedQuantity = (quantity) => {
    setCartSelection(prevState => ({...prevState, quantity}))
  }
  useEffect(() => {
    if(cartSelection.load && countInStock){
      setAvailableQuantity(Math.floor(countInStock / cartSelection.load))
    }
  }, [cartSelection.load, countInStock]);

  return (
    <>
      <h2>
        { product.title }
      </h2>
      <div>
        {/* RADIO BUTTON */}
        {
          product.productItems.map((item, i) => (
            <React.Fragment key={i}>
              <input 
                id={`${product._id}${item.load}`} 
                name={product._id}
                onChange={() => handleSelectedItem({
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
        errorOutOfStock && <p style={{color: "red"}}>Out of stock</p>
      }
      {/* DROPDOWN */}
      {
        <select 
          disabled={!availableQuantity}
          id={product._id}
          name="quantity" 
          onChange={(e) => handleSelectedQuantity(e.target.value)}
        >
          {
            (cartSelection.productId && availableQuantity) && (
              [...Array(availableQuantity)].map((e, i) => (
                <option 
                  key={i}
                  value={e}
                >
                  {i+1}
                </option>
              ))
            )
          }
        </select>
      }
      <button
        disabled={!cartSelection.quantity}
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
      {
        addedToCart && (
          <p style={{color: "green"}}>
            Successfully added {productTitle}!
          </p>
        ) 
      }
      {
        cartSelection && <p>Adding {productTitle} to cart...</p>
      }
    </>
  )
}
