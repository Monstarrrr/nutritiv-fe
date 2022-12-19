/** @jsxImportSource @emotion/react */
import React, {
  forwardRef,
  useEffect, 
  useRef, 
  useState 
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import nutritivApi from '../../Api/nutritivApi';
import { css } from '@emotion/react'
import { updateUserCartQuantity } from '../../Redux/reducers/user';
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { mediaQuery, selectStyles, tokens } from '../../Helpers/styleTokens';
import { ShapeContainer } from '../Homepage/ShapesSection';
import { Tag, Tags } from './ProductCard';
import { Icon } from '../Icons/Icon';
import Select from 'react-select';
import { NutriButton } from '../NutriButton';

const Container = styled.div`
  background: ${tokens.color.primary};
  border-top-left-radius: 42px;
  border-top-right-radius: 42px;
  padding: ${tokens.spacing.xl};
  position: relative;
  z-index: 9999;
  ${mediaQuery[2]} {
    padding: 0;
    margin-bottom: ${tokens.spacing.xl};
    margin-top: ${tokens.spacing.xl};
  }
`

const Title = styled.h1`
  grid-column: 1 / span 3;
  grid-row: 1 / 1;
  font-size: 54px;
  justify-self: start;
  margin: 0;
  padding: ${tokens.spacing.sm} 0 ${tokens.spacing.xl};
  ${mediaQuery[2]} {
    padding-top: 0;
  }
`

const SectionContainer = styled.span`
  box-sizing: border-box;
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

const SupermentContainer = styled.div`
  background: radial-gradient(circle at 50% 100%, rgba(16, 109, 228, 0.54) 0%, rgba(17, 16, 228, 0) 80%);
  top: 35px;
  display: flex;
  grid-column: 2 / 3;
  grid-row: 2 / 5;
  height: 40vh;
  justify-content: center;
  position: relative;
  width: 100%;
  > div {
    align-self: center;
    bottom: 35px;
    position: relative;
    height: 80%;
    width: 100%;
  }
  ${mediaQuery[2]} {
    background: radial-gradient(circle at 50% 50%, rgba(16, 109, 228, 0.54) 0%, rgba(17, 16, 228, 0) 50%);
    height: 60vh;
    order: 2;
  }
`
const GummyModel = styled.div`
  display: ${props => props.supermentName === props.title ? (props.gummy ? "inline-block" : "none") : ("none")};
`
const CapsuleModel = styled.div`
  display: ${props => props.supermentName === props.title ? (props.capsule ? "inline-block" : "none") : ("none")}; 
`

const SwitchWrapper = styled.div`
  background-color: ${tokens.color.accentWeak};
  border-radius: ${tokens.borderRadius.lg};
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: -18px;
  right: 0;
  padding: 4px;
  z-index: 2;
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

const LdWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  /* margin-right: 8px; */
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
  z-index: 1;
`
const LoadLabel = styled.label`
  background: ${props => props.isactive ? tokens.color.accentStrong : tokens.color.accentWeak};
  color: ${props => props.isactive ? tokens.color.contrastDark : tokens.color.contrastLight};
  opacity: ${props => props.ishovered ? (props.isactive ? 1 : 0.8) : 1};
  padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  transition: all ease .2s;
`
const SelectWrapper = styled.div`
  display: inline-block;
  font-size: ${tokens.font.fontSize.md};
  position: relative;
`
const Price = styled.h4`
  margin: ${tokens.spacing.md} 0;
  font-size: ${tokens.font.fontSize.md};
`
const Currency = styled.span`

`

const shapes = ["gummy", "capsule"];

const ProductPage = forwardRef((props, ref) => {
  const loggedIn = useSelector(state => state.user.loggedIn)
  const dispatch = useDispatch();
  const { productTitle } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const quantityRef = useRef();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [shapeQuery, setShapeQuery] = useState(searchParams.get('shape') || 'gummy');
  const [focusedShape, setFocusedShape] = useState(null);
  const [hoveredLoad, setHoveredLoad] = useState("");
  
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
  const [loadOptions, setLoadOptions] = useState([{value: 0, label: 0}])
  const [selectedQuantity, setSelectedQuantity] = useState({value: 1, label: "1"})
  
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
        handleSelectedItem({
          load: product.productItems[0].load, 
          price: product.productItems[0].price.value,
        })
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
          const fetchedProduct = data.Product.find(e => e.shape === shapeQuery) || data.Product[0];
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
              productId: fetchedProduct._id,
              load: fetchedProduct.productItems[0].load,
              price: fetchedProduct.productItems[0].price.value,
              quantity: 1,
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
      item.quantity = 1;
      setSelectedQuantity({value: 1, label: "1"})
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
  const handleSelectedQuantity = (e) => {
    let quantity = e.value
    setSelectedQuantity(e)
    setCartSelection(prevState => ({...prevState, quantity}))
  }
  useEffect(() => {
    if(cartSelection.load && countInStock){
      setAvailableQuantity(Math.floor(countInStock / cartSelection.load))
    }
  }, [cartSelection.load, countInStock]);
  useEffect(() => {
    let quantityArr = Array.from({length: availableQuantity}, (_, i) => i + 1)
    let reactSelectOptions = quantityArr.map(el => (
      { value: el, label: el }
    ));
    setLoadOptions(reactSelectOptions);
  }, [availableQuantity]);

  const handleSwitchShape = (newShape) => {
    setShapeQuery(newShape)
    setSearchParams({ shape: newShape })
    setSelectedQuantity({ value: 1, label: "1" })
  }
  
  return (
    <div css={css`display: flex;`}>
      <SupermentContainer>
        <SectionContainer
          css={css`
            position: absolute;
            right: 14px;
            text-align: right;
            top: 0;
          `}
        >
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
      </SupermentContainer>
      <Container>
        <Title>
          {product.title}
        </Title>
        <SectionContainer>
          <Description>
            {product.desc}
          </Description>
        </SectionContainer>
        <SectionContainer
          css={css`
            margin-top: ${tokens.spacing.xl};
          `}
        >
          <Tags
            css={css`padding: ${tokens.spacing.md} 0;`}
          >
            {tags.map((tag, i) => (
              <Tag key={i}>
                {tag}
              </Tag>
            ))}
          </Tags>
        </SectionContainer>
        
        <SectionContainer>
          <Price>
            {(cartSelection.price * cartSelection.quantity).toFixed(2)} <Currency>€</Currency>
          </Price>
        </SectionContainer>

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
        
        <SectionContainer
          css={css`
            margin-top: ${tokens.spacing.xxl};
          `}
        >
          {/* LOAD (radio button) */}
          <Subtitle
            css={css`
              border-top: 2px solid ${tokens.color.semiTransparentLight};
              padding-top: ${tokens.spacing.xl};
            `}
          >
            Load
          </Subtitle>
          <LdWrapper>
            {product.productItems.map((item, i) => (
              <div 
                key={i}
                onMouseEnter={() => setHoveredLoad(item.load)}
                onMouseLeave={() => setHoveredLoad("")}
                style={{
                  padding: `${tokens.spacing.md} 0`,
                  position: "relative"
                }}
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
                  ishovered={item.load === hoveredLoad}
                >
                  {item.load}
                </LoadLabel>
              </div>
            ))}
          </LdWrapper>
          {
            errorOutOfStock && <p style={{color: tokens.color.error}}>Out of stock</p>
          }
        </SectionContainer>
        
        {/* QUANTITY (dropdown) */}
        <SectionContainer
          css={css`
            margin-bottom: ${tokens.spacing.xl};
            margin-top: ${tokens.spacing.xl};
          `}
        >
          <Subtitle
            css={css`margin-top: ${tokens.spacing.xxl};`}
          >
            Quantity
          </Subtitle>
          <SelectWrapper>
            {(cartSelection.productId && availableQuantity) ? (
              <Select 
                // components={{ IndicatorSeparator }}
                defaultValue={{value: 1, label: 1}}
                id={product._id}
                name="quantity"
                isDisabled={!availableQuantity}
                isSearchable={false}
                options={loadOptions}
                onChange={(e) => handleSelectedQuantity(e)}
                menuPlacement="auto"
                ref={quantityRef}
                styles={selectStyles}
                value={selectedQuantity}
              />
            ) : null}
          </SelectWrapper>
        </SectionContainer>

        {/* ADD TO CART (button) */}
        <SectionContainer
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-top: ${tokens.spacing.xl};
          `}
        >
          <div onClick={handleAddToCart}>
            <NutriButton 
              disabled={!cartSelection.quantity}
              label={loadingAdding ? "Adding to cart..." : "Add to cart"}
              style={{
                borderRadius: "8px",
                width: "100%",
              }}
              type="filled"
            />
            {/* SUCCESS */}
            {successAddedToCart ? (
              <p style={{color: "green"}}>
                Successfully added {productTitle}!
              </p>
            ) : null}
          </div>
        </SectionContainer>
      </Container>
    </div>
  )
});

export default ProductPage;