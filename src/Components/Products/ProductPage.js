import React, {
  forwardRef,
  useEffect, 
  useState 
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import nutritivApi, { s3URL } from '../../Api/nutritivApi';
import { updateUserCartQuantity } from '../../Redux/reducers/user';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const GummyModel = styled.div`
  display: ${props => props.supermentName === props.title ? (props.gummy ? "inline-block" : "none") : ("none")};
  height: 300px;
  width: 270px;
  `
const CapsuleModel = styled.div`
  display: ${props => props.supermentName === props.title ? (props.capsule ? "inline-block" : "none") : ("none")}; 
  height: 300px;
  width: 270px;
`

const ProductPage = forwardRef((props, ref) => {
  const loggedIn = useSelector(state => state.user.loggedIn)
  const dispatch = useDispatch();
  const { productTitle } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [shapeQuery, setShapeQuery] = useState(searchParams.get('shape') || 'gummy');
  
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
  const [updateStock, setUpdateStock] = useState(false)
  
  const [loadingAdding, setLoadingAdding] = useState(false)
  const [successAddedToCart, setSuccessAddedToCart] = useState(false)
  const [errorOutOfStock, setErrorOutOfStock] = useState(false)
  
  // HANDLE ADD TO CART
  const handleAddToCart = async (loc) => {
    const selection = loc?.cartSelection ? loc.cartSelection : cartSelection
    
    if(loggedIn){
      setLoadingAdding(true)
      try {
        const { data } = await nutritivApi.post(
          `carts/addToCart`,
          selection
        );
        dispatch(
          updateUserCartQuantity(data.cart.totalQuantity)
        )
        setUpdateStock(!updateStock);
        setLoadingAdding(false)
        setSuccessAddedToCart(true);
        setCartSelection(prevState => ({
          productId: prevState.productId,
          load: 0,
          price: 0,
          quantity: 0,
        }))
        setAvailableQuantity(0)
      } catch (err) {
        setLoadingAdding(false)
        console.log('# apiAddToCart err :', err)
      }
    } else {
      navigate(
        '/login',
        { state: 
          { 
            msg: "Login to add a product to your cart.",
            cartSelection,
            from: `/${productTitle}?shape=${shapeQuery}`
          }
        }
      );
    }
  }
  
  useEffect(() => {
    let isMounted = true;
    if(isMounted) {
      if(location.state?.cartSelection?.productId) {
        setCartSelection(location.state.cartSelection);
        handleAddToCart({cartSelection: location.state.cartSelection});
      }
    }
    return () => { isMounted = false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // GET PRODUCT (by title)
  useEffect(() => {
    let isMounted = true;
    try {
      async function fetchApi() {
        const { data } = await nutritivApi.get(
          `/products/findByTitle/${productTitle}`
        )
        if(isMounted){
          const fetchedProduct = data.Product.find(e => e.shape === shapeQuery) || data.Product[1];
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
      }
      fetchApi();
    } catch (err) {
      console.log('# /products/findByTitle err :', err)
    }
    return () => { isMounted = false }
  }, [productTitle, location.state, shapeQuery])
  
  // HANDLE SELECTED ITEM
  const handleSelectedItem = (item) => {
    setSuccessAddedToCart(false)
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
    let isMounted = true;
    if(product._id) {
      try {
        async function fetchApi() {
          const { data } = await nutritivApi.get(
            `/products/countInStock/${product._id}`
          );
          if(isMounted){
            setCountInStock(data.countInStock)
          }
        }
        fetchApi();
      } catch (err) {
        console.log('# apiGetCountInStock err :', err)
      }
    }
    return () => { isMounted = false }
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
  
  const handleSwitchShape = (newShape) => {
    setShapeQuery(newShape)
    setSearchParams({ shape: newShape })
  }

  return (
    <div>
      <h2>
        { product.title }
      </h2>
      {/* {
        product.imgs?.map((img, i) => (
          <img
            key={i}
            src={
              `${s3URL}${img}`
            } 
            alt={`product ${i}`} 
          />
        ))
      } */}
      {/* GUMMIES */}
      <>
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyAmethystExtractView} 
          supermentName="Amethyst Extract"
          title={product.title}
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyAbsoriteView} 
          supermentName="Absorite"
          title={product.title}
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyBaguettoidsView} 
          supermentName="Baguettoids"
          title={product.title}
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyBicepstineView}
          supermentName="Bicepstine"
          title={product.title} 
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyJumpamineView}
          supermentName="Jumpamine"
          title={product.title} 
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyLumositeView}
          supermentName="Lumosite"
          title={product.title} 
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyMagmaliteView}
          supermentName="Magmalite"
          title={product.title} 
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyNodemodulesView}
          supermentName="node_modules"
          title={product.title} 
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyNotavirusiteView}
          supermentName="Notavirusite"
          title={product.title} 
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyNucleateView}
          supermentName="Nucleate"
          title={product.title} 
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummySerylView}
          supermentName="Serylanyponytailanyserine"
          title={product.title} 
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummySolvalitisView} 
          supermentName="Solvalitis"
          title={product.title}
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyTricepstineView}
          supermentName="Tricepstine"
          title={product.title} 
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyTitaniumView}
          supermentName="Titanium"
          title={product.title} 
        />
        <GummyModel 
          gummy={product.shape === "gummy" ? 1 : undefined}
          ref={ref.gummyWolveriteView}
          supermentName="Wolverite"
          title={product.title} 
        />
      </>
      {/* CAPSULES */}
      <>
        <CapsuleModel 
          ref={ref.capsuleWaterView} 
          capsule={product.shape === "capsule" ? 1 : undefined}
        />
      </>
      
      {/* <pre>
        {product && JSON.stringify(product, null, 2)}
      </pre> */}
      <button 
        disabled={location.pathname === '/Magmalite' || location.pathname === '/Liquate'}
        onClick={() => handleSwitchShape("gummy")}
      >
        gummy
      </button>
      <button onClick={() => handleSwitchShape("capsule")}>
        capsule
      </button>
      <div>
        {/* RADIO BUTTON */}
        <b>
          Load:
        </b>
        <br />
        {
          product.productItems.map((item, i) => (
            <React.Fragment key={i}>
              <input
                checked={cartSelection.load === item.load}
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
        errorOutOfStock && <p style={{color: "red"}}>Not enough stock</p>
      }
      <br />
      {/* DROPDOWN */}
      <b>
        Quantity:
      </b>
      <br />
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
      <br />
      <br />
      {/* BUTTON */}
      <button
        disabled={!cartSelection.quantity}
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
      {/* SUCCESS */}
      {
        successAddedToCart && (
          <p style={{color: "green"}}>
            Successfully added {productTitle}!
          </p>
        ) 
      }
      {/* LOADING */}
      {
        loadingAdding && <p>Adding {productTitle} to cart...</p>
      }
    </div>
  )
});

export default ProductPage;