import React, {
  forwardRef,
  useEffect, 
  useState 
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import nutritivApi, { s3URL } from '../../Api/nutritivApi';
import { updateUserCartQuantity } from '../../Redux/reducers/user';
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { mediaQueries, mediaQuery, tokens } from '../../Helpers/styleTokens';
import { ShapeContainer, ShapeLabel } from '../Homepage/ShapesSection';
import { Tag, Tags } from './ProductCard';
import { Icon } from '../Icons/Icon';

const Container = styled.div`
  padding: 0 ${tokens.spacing.xl};
  ${mediaQuery[3]} {
    padding: 0;
  }
`

const Title = styled.h1`
  font-size: 54px;
`

const SectionContainer = styled.div`
  box-sizing: border-box;
  margin: ${tokens.spacing.max} auto;
`

const Subtitle = styled.h3`
  color: ${tokens.color.contrastLightWeak};
  font-size: ${tokens.font.fontSize.sm};
  text-transform: uppercase;
`

const Description = styled.span`
  color: ${tokens.color.contrastLightWeak};
  font-size: ${tokens.font.fontSize.md};
`

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
const SwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  ${mediaQuery[2]} {
    align-items: center;
    background: ${tokens.color.accentWeak};
    border-radius: ${tokens.borderRadius.lg};
    box-shadow: 0px 0px 10px 1px ${tokens.color.contrastDark};
    justify-content: initial;
    margin: 0;
    padding: 4px;
    width: fit-content;
  }
`
const FocusedShape = styled(motion.div)`
  background: ${tokens.color.primaryTransparent};
  border-radius: ${tokens.borderRadius.lg};
  height: 100%;
  width: 100%;
  z-index: 0;
`
const ShapeIcon = styled.span`
  bottom: 0;
  color: ${props => props.active ? tokens.color.contrastDark : tokens.color.contrastLight};
  font-size: ${tokens.font.fontSize.xs};
  font-weight: ${tokens.font.fontWeight.medium};
  opacity: ${props => props.active ? 1 : 0.5};
  right: 0;
  z-index: 2;
`

const LoadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-right: 8px;
  position: relative;
  transition: all ease .2s;
`
const LoadInput = styled.input`
  cursor: pointer;
  display: inline-block;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`
const LoadLabel = styled.label`
  background: ${props => props.isactive ? tokens.color.accentStrong : tokens.color.accentWeak};
  color: ${props => props.isactive ? tokens.color.contrastDark : tokens.color.contrastLight};
  padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  transition: all ease .2s;
`

const shapes = ["capsule", "gummy"];

const ProductPage = forwardRef((props, ref) => {
  const loggedIn = useSelector(state => state.user.loggedIn)
  const dispatch = useDispatch();
  const { productTitle } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [shapeQuery, setShapeQuery] = useState(searchParams.get('shape') || 'gummy');
  const [focusedShape, setFocusedShape] = useState(null);
  
  const [product, setProduct] = useState({
    productItems: []
  })
  const [tags, setTags] = useState([])
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
          let newArr = fetchedProduct.categories.map(e => {
            return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
          })
          setTags(newArr);
          
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
    <Container>
      <Title>
        {product.title}
      </Title>
      <SectionContainer>
        <Subtitle>
          Description
        </Subtitle>
        <Description>
          {product.desc}
        </Description>
      </SectionContainer>
      <SectionContainer>
        <Subtitle>
          Categories
        </Subtitle>
        <Tags>
          {tags.map(tag => (
            <Tag>
              {tag}
            </Tag>
          ))}
        </Tags>
      </SectionContainer>
      <SectionContainer>
        <Subtitle>
          Shape
        </Subtitle>
          {/* <button 
            disabled={location.pathname === '/Magmalite' || location.pathname === '/Liquate'}
            onClick={() => handleSwitchShape("gummy")}
          >
            Gummy
          </button>
          <button onClick={() => handleSwitchShape("capsule")}>
            Capsule
          </button> */}
          <SwitchWrapper>
            {shapes && shapes.map(shape => (
              <ShapeContainer
                style={{
                  maxHeight: "100px",
                  padding: `${tokens.spacing.xs} ${tokens.spacing.lg}`,
                }}
                key={shape}
                onClick={() => handleSwitchShape(shape)}
                onMouseEnter={() => setFocusedShape(shape)}
                onMouseLeave={() => setFocusedShape("")}
              >
                <ShapeIcon active={shape === shapeQuery ? 1 : undefined}>
                  <Icon 
                    name={shape}
                    color={shapeQuery === shape ? tokens.color.contrastDark : tokens.color.contrastLight}
                    strokeWidth={2}
                    filled
                    height={"24px"}
                    width={"24px"}
                  />
                </ShapeIcon>
                {focusedShape === shape ? (
                  <AnimatePresence>
                    <FocusedShape
                      style={{
                        bottom: 0,
                        left: 0,
                        position: "absolute",
                        right: 0,
                      }}
                      transition={{
                        layout: {
                          duration: 0.2,
                          ease: "easeOut",
                        },
                      }}
                      layoutId="shape-focus"
                    />
                  </AnimatePresence>) : null
                }
                {shapeQuery === shape ? (
                  <AnimatePresence>
                    <motion.div
                      style={{
                        background: tokens.color.accentStrong,
                        borderRadius: tokens.borderRadius.lg,
                        bottom: 0,
                        height: "100%",
                        left: 0,
                        position: "absolute",
                        right: 0,
                        width: "100%",
                        zIndex: 1,
                      }}
                      layoutId="shape-select"
                    />
                  </AnimatePresence>) : null
                }
              </ShapeContainer>
            ))}
          </SwitchWrapper>
      </SectionContainer>
      <br />
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
      <SectionContainer>
        {/* RADIO BUTTON */}
        <Subtitle>
          Load
        </Subtitle>
        <LoadWrapper>
          {product.productItems.map((item, i) => (
            <div 
              style={{
                padding: `${tokens.spacing.md} 0`,
                position: "relative"
              }}
              key={i}
            >
              <LoadInput
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
              <LoadLabel 
                htmlFor={i}
                style={{
                  borderBottomRightRadius: i === product.productItems.length-1 ? tokens.borderRadius.md : 0,
                  borderTopRightRadius: i === product.productItems.length-1 ? tokens.borderRadius.md : 0,
                  borderBottomLeftRadius: i === 0 ? tokens.borderRadius.md : 0,
                  borderTopLeftRadius: i === 0 ? tokens.borderRadius.md : 0,
                }}
                isactive={item.load === cartSelection.load}
              >
                {item.load}
              </LoadLabel>
            </div>
          ))}
        </LoadWrapper>
      </SectionContainer>
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
    </Container>
  )
});

export default ProductPage;