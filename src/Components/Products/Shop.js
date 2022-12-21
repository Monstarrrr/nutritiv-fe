/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from 'react'
import nutritivApi from '../../Api/nutritivApi';
import { ProductCard } from './ProductCard';
import { Pagination } from '@mui/material';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { forwardRef } from 'react';
import { css } from '@emotion/react'
import styled from '@emotion/styled';
import { mediaQueries, mediaQuery, selectStyles, tokens } from '../../Helpers/styleTokens';
import { Icon } from '../Icons/Icon';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';

const Container = styled(motion.div)`
  padding: 0 ${tokens.spacing.xl};
  width: auto;
  ${mediaQuery[1]} {
    padding: 0 ${tokens.spacing.xxl};
  }
  ${mediaQuery[3]} {
    padding: 0;
  }
`

const SearchContainer = styled.div`
  position: relative;
`
const SearchBox = styled.input`
  background: ${tokens.color.secondaryTransparent};
  border-radius: ${tokens.borderRadius.md};
  border: none;
  box-sizing: border-box;
  color: ${tokens.color.contrastLight};
  outline: none;
  padding: ${tokens.spacing.sm} ${tokens.spacing.md};
  padding-left: 46px;
  transition: all ease .2s;
  width: 100%;
  &:focus {
    padding-left: 50px;
    transition: all ease .2s;
  }
`

const Header = styled.div`

`
const HeaderTitle = styled.h1`
  ${mediaQueries({
    marginTop: [0, 0, tokens.spacing.xl, tokens.spacing.xxl]
  })}
`

const FilterShapeContainer = styled.div`
  width: 100%;
`
const FilterBy = styled.p`
  display: inline-block;
  font-style: italic;
  font-size: ${tokens.font.fontSize.md};
  margin-right: ${tokens.spacing.sm};
  margin-bottom: 0;
  width: max-content;
`

const SortingContainer = styled.div`
  align-items: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  display: flex;
  font-size: ${tokens.font.fontSize.md};
  justify-content: space-between;
  position: relative;
  top: 4px;
`
const SortByContainer = styled.div``
const SortCounter = styled.div`
  color: ${tokens.color.contrastLightWeak};
  font-style: italic;
`
const SortByText = styled.p`
  display: inline-block;
  margin-right: ${tokens.spacing.sm};
  width: max-content;
  font-style: italic;
`
const SortByButton = styled.button`
  background-color: ${tokens.color.semiTransparentLight};
  border: none;
  border-radius: ${tokens.borderRadius.sm};
  border: 2px solid ${tokens.color.transparent};
  box-shadow: 0 0 0px ${tokens.color.accentTransparent};
  cursor: pointer;
  color: ${tokens.color.contrastLight};
  font-size: ${tokens.font.fontSize.md};
  font-weight: ${tokens.font.fontWeight.regular};
  outline: none;
  padding: 2px ${tokens.spacing.sm};
  transition: all .2s ease;
  &:hover {
    opacity: 0.8;
    transition: all .2s ease;
  }
`

const TagsContainer = styled.div`
  display: flex;
  margin-bottom: -6px;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 24px 0;
  scrollbar-color: #15f1ff80 transparent;
  input {
    cursor: pointer;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }
`
const TagWrapper = styled.div`
  background-color: ${props => props.checked ? tokens.color.accentStrong : tokens.color.transparent};
  border-radius: ${tokens.borderRadius.max};
  border: 2px solid ${tokens.color.semiTransparentLight};
  color: ${props => props.checked ? tokens.color.contrastDark : tokens.color.contrastLight};
  margin-right: 8px;
  padding: ${tokens.spacing.xs} ${tokens.spacing.md};
  position: relative;
  transition: all ease .2s;
  &:hover {
    background-color: ${tokens.color.semiTransparentLight};
    border: 2px solid ${tokens.color.transparent};
    transition: all ease .2s;
  }
`

const ProductsContainer = styled(motion.div)`
  ${mediaQuery[1]} {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 24px;
  }
  ${mediaQuery[3]} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const PaginationContainer = styled(motion.div)`
  align-items: center;
  display: flex;
  margin: ${tokens.spacing.lg} 0 ${tokens.spacing.xxl};
  justify-content: space-between;
`
const PaginationLeftDiv = styled.div`
  flex: 2 1 0%;
`

// const IndicatorSeparator = ({innerProps}) => {
//   return <span style={{width: 0}} {...innerProps} />
// }

const Shop = forwardRef((props, ref) => {
  const location = useLocation();
  const [allProducts, setAllProducts] = useState([])
  const [allFilteredProducts, setAllFilteredProducts] = useState([])
  const [productsToDisplay, setProductsToDisplay] = useState(null)
  
  const [page, setPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(10)
  const [productsPerPage, setProductsPerPage] = useState(4)
  
  const [loading, setLoading] = useState(false)
  const [errorApiGetProducts, setErrorApiGetProducts] = useState(false)
  
  const [filterByTextInput, setFilterByTextInput] = useState("")
  const [filterByShapeInput, setFilterByShapeInput] = useState("")
  const [filterByTagsInput, setFilterByTagsInput] = useState([])
  // const [filterByPriceMinInput, setFilterByPriceMinInput] = useState(0)
  // const [filterByPriceMaxInput, setFilterByPriceMaxInput] = useState(0)
  const [sortedByPrice, setSortedByPrice] = useState("")
  const [sortedByPriceStatus, setSortedByPriceStatus] = useState("")
  
  const [checkedBox, setCheckedBox] = useState([])
  const [focusedBox, setFocusedBox] = useState([])
  
  const [allTags, setAllTags] = useState([])

  // API EFFECTS
  useEffect(() => {
    async function fetchApi() {
      try {
        setLoading(true)
        const { data } = await nutritivApi.get(
          `/products/`,
        );
        setAllProducts(data.products)
        setAllFilteredProducts(data.products)
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
        const { data } = await nutritivApi.get(
          `/products/categories`
        );
        console.log('# categories :', data)
        let categories = data.uniqueCategory;
        // Capitalize first letter
        let newArr = categories.map(e => {
          return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
        })
        setAllTags(newArr);
      } catch (err) {
        console.log('# /products/categories err :', err)
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
        return filterByTagsInput.every(tag => product.categories.includes(tag))
      })
    ) : array;

    const filterByPrice = (array) => {
      if(sortedByPrice === "asc") {
        setSortedByPriceStatus("asc")
        const filteredArray = array.sort((a, b) => {
          if(a.productItems[0].price.value < b.productItems[0].price.value) return -1;
          if(a.productItems[0].price.value > b.productItems[0].price.value) return 1;
          return 0;
        })
        return filteredArray;
      }
      if(sortedByPrice === "desc") {
        setSortedByPriceStatus("asc")
        const filteredArray = array.sort((a, b) => {
          if(a.productItems[0].price.value > b.productItems[0].price.value) return -1;
          if(a.productItems[0].price.value < b.productItems[0].price.value) return 1;
          return 0;
        })
        return filteredArray;
      } 
      return !sortedByPrice && array;
    }

    let result = allProducts;
    result = filterByText(result)    
    result = filterByShape(result)
    result = filterByTags(result)
    result = filterByPrice(result)
    
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
    filterByTagsInput,
    sortedByPrice
  ]);
  
  // HANDLERS
  const handleProductsFilter = (e) => {
    setFilterByTextInput(
      e.target.value.toLowerCase()
    )
    setPage(1);
  }
  // const handleFilterByShapeInput = (e) => {
  //   setFilterByShapeInput(
  //     e.target.value.toLowerCase()
  //   )
  //   setPage(1);
  // }
  const handleFilterByShapeInput = (selectedOption) => {
    setFilterByShapeInput(selectedOption.value)
    setPage(1);
  }
  const handleChangeActivePage = (e, val) => {
    setPage(val)
  }
  const handleChangeProductsPerPage = (e) => {
    setProductsPerPage(e.value)
    setPage(1);
  }
  const handleFilterByTags = useCallback((e) => {
    if(e.target.checked) {
      setFilterByTagsInput(() => [
        ...filterByTagsInput,
        e.target.name,
      ])
      setCheckedBox({
        ...checkedBox,
        [e.target.name]: true
      })
    } else {
      setFilterByTagsInput(prevState => (
        prevState.filter(tag => tag !== e.target.name)
      ))
      setCheckedBox({
        ...checkedBox,
        [e.target.name]: false
      })
    }
    setPage(1);
  }, [checkedBox, filterByTagsInput]);
  const handleOrderByPrice = () => {
    sortedByPrice ? (
      sortedByPrice === "asc" ? setSortedByPrice("desc") : setSortedByPrice("")
    ) : setSortedByPrice("asc")
    setPage(1);
  }
  
  console.log('# checkedBox :', checkedBox)
  console.log('# filterByTagsInput :', filterByTagsInput)
  
  // LOCATION STATE
  useEffect(() => {
    if(location.state?.category) {
      handleFilterByTags({ target: { 
        name: location.state.category,
        checked: true
      }})
    } else if (location.state?.shape) {
      handleFilterByShapeInput({ value: location.state.shape })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.category, location.state?.shape]);
  
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Header>
        <HeaderTitle><span css={css`font-weight: initial;`}>Explore</span> Nutritiv Superments</HeaderTitle>
      </Header>
      
      {/* TITLE FILTER - TEXTBOX */}
      <SearchContainer>
        <SearchBox
          onChange={handleProductsFilter}
          placeholder="Search a product..."
          type="text" 
        />
        <Icon 
          color={tokens.color.contrastLightWeak}
          name="search"
          resizeDefault="-5 -3 30 30"
          strokeWidth={2}
          width={tokens.spacing.xxl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            marginLeft: tokens.spacing.md,
            transform: "scale(-1, 1)"
          }}
        />
      </SearchContainer>
      {/* SHAPE FILTER - DROPDOWN */}
      <FilterShapeContainer>
        <FilterBy>
          Filtered by
        </FilterBy>
        <div 
          css={css`
            display: inline-block;
            font-size: ${tokens.font.fontSize.md};
            position: relative;
            top: 5px;
          `}
        >
          <Select 
            // components={{ IndicatorSeparator }}
            defaultValue={
              location.state?.shape ? (
                {
                  value: location.state.shape, 
                  label: location.state.shape.charAt(0).toUpperCase() + location.state.shape.slice(1).toLowerCase(),
                  defaultValue: true
                }
              ) : (
                {value: "", label: "All", defaultValue: true}
              )
            }
            isSearchable={false}
            options={[
              {value: "", label: "All", defaultValue: true},
              {value: "capsule", label: "Capsule"},
              {value: "gummy", label: "Gummy"},
            ]}
            onChange={handleFilterByShapeInput}
            styles={selectStyles}
          />
        </div>
        
        <FilterBy style={{ marginLeft: tokens.spacing.sm }}>
          shapes.
        </FilterBy>
      </FilterShapeContainer>
      {/* TAGS FILTER - CHECKBOXES */}
      <TagsContainer>
        {loading ? (
          <p>Loading tags...</p>
        ) : (
          allTags && allTags.map((tag, i) => (
            <TagWrapper 
              key={i}
              checked={checkedBox[tag.toLowerCase()]}
            >
              <input 
                defaultChecked={false}
                index={i}
                name={tag.toLowerCase()}
                onClick={handleFilterByTags}
                // onFocus={() => set}
                type="checkbox"
              />
              <label htmlFor={tag}>
                {tag}
              </label>
            </TagWrapper>
          ))
        )}
      </TagsContainer>
      {/* PRICE SORTER - BUTTON */}
      <SortingContainer>
        <SortCounter>
          {allFilteredProducts.length}/{allProducts.length}
          <span>
            &nbsp;superments
          </span>
        </SortCounter>
        <SortByContainer>
          <SortByText>
            Sort by
          </SortByText>
          <SortByButton onClick={handleOrderByPrice}>
            {sortedByPrice ? (<>price</>) : (<>name</>)}
            <div css={css`max-width: 20px; display: inline-block;`}>
              {sortedByPrice && (sortedByPrice === "asc" ? (
                <Icon 
                  name="chevronLeft"
                  color={tokens.color.contrastLight}
                  resizeDefault={"-3 3 23 23"}
                  strokeWidth={3}
                  style={{ 
                    display: "inline-block",
                    transform: "rotate(90deg)",
                    height: "18px",
                    marginLeft: "2px"
                  }}
                />
              ) : (
                <Icon 
                  name="chevronRight"
                  color={tokens.color.contrastLight}
                  resizeDefault={"-3 3 23 23"}
                  strokeWidth={3}
                  style={{ 
                    display: "inline-block",
                    transform: "rotate(90deg)",
                    height: "18px",
                    marginLeft: "2px"
                  }}
                />
              ))}
            </div>
          </SortByButton>
        </SortByContainer>
      </SortingContainer>
      {/* PRODUCTS - CARDS */}
      {loading ? (
        <h2>
          Loading products...
        </h2>
      ) : (
        <ProductsContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <LayoutGroup>
            <AnimatePresence>
              {
                productsToDisplay?.length > 0 ? (
                  productsToDisplay.map((product, i) => (
                    <ProductCard
                      index={i}
                      key={product._id}
                      product={product}
                    />
                  ))
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    No product(s) found.
                  </motion.p>
                )
              }
            </AnimatePresence>
          </LayoutGroup>
        </ProductsContainer>
      )}
      
      <PaginationContainer 
        layout
      >
        <PaginationLeftDiv />
        <Pagination
          count={numberOfPages}
          page={page}
          onChange={handleChangeActivePage}
          sx={{
            display: "flex",
            justifyContent: "center",
            flex: "3 1 0%",
            '& .MuiPaginationItem-root': {
              color: tokens.color.contrastLight,
              fontFamily: "inherit",
              fontWeight: 500,
              transition: "all ease .2s",
              '&:hover': {
                backgroundColor: tokens.color.accentWeak,
                opacity: 0.8,
                transition: "all ease .2s",
              }
            },
            '& .MuiPaginationItem-icon': {
              color: tokens.color.accentStrong,
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: tokens.color.accentWeak,
              color: tokens.color.semiTransparentLight,
            }
          }}
        />
        {/* PRODUCTS PER PAGE - DROPDOWN */}
        <form css={css`
          align-items: center;
          display: flex;
          flex: 2 1 0%;
          justify-content: end;
        `}>
          <label htmlFor="productsPerPage" css={css`margin-right: 4px;`}>
            Products per page:  
          </label>
          <div 
            css={css`
              display: inline-block;
              font-size: ${tokens.font.fontSize.sm};
              position: relative;
              top: 3px;
            `}
          >
            <Select 
              defaultValue={{value: 4, label: "4", defaultValue: true}}
              isSearchable={false}
              options={[
                {value: 4, label: "4", defaultValue: true},
                {value: 12, label: "12"},
                {value: 30, label: "30"},
              ]}
              onChange={handleChangeProductsPerPage}
              styles={selectStyles}
            />
          </div>
        </form>
      </PaginationContainer>
    </Container>
  )
});

export default Shop;