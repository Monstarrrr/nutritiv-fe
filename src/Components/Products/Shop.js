/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import nutritivApi from '../../Api/nutritivApi';
import { ProductCard } from './ProductCard';
import { Pagination } from '@mui/material';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { forwardRef } from 'react';
import { css } from '@emotion/react'
import styled from '@emotion/styled';
import { tokens } from '../../Helpers/styleTokens';
import { Icon } from '../Icons/Icon';
import Select from 'react-select';

const Container = styled(motion.div)`
  padding: 0 ${tokens.spacing.lg};
  width: auto;
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
  width: 100%;
`

const Header = styled.div`

`
const HeaderTitle = styled.h1`
  margin-top: 0;
`

const FilterShapeContainer = styled.div`
  width: 100%;
`
const FilterBy = styled.p`
  display: inline-block;
  font-size: ${tokens.font.fontSize.md};
  margin-right: ${tokens.spacing.sm};
  margin-bottom: 0;
  width: max-content;
`
const ShapeDropdown = styled.form`
  display: inline-block;
`

const SortByContainer = styled.div`
  position: relative;
`
const SortByText = styled.p`
  display: inline-block;
  font-size: ${tokens.font.fontSize.md};
  margin-right: ${tokens.spacing.sm};
  width: max-content;
`
const SortByButton = styled.button`

`

const TagsContainer = styled.div`
  display: flex;
  margin-bottom: -6px;
  margin-top: ${tokens.spacing.lg};
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 6px 0;
  scrollbar-color: #15f1ff80 transparent;
  > div {
    
  }
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

// const IndicatorSeparator = ({innerProps}) => {
//   return <span style={{width: 0}} {...innerProps} />
// }

const Shop = forwardRef((props, ref) => {
  const selectStyles = {
    singleValue: styles => ({
      ...styles,
      color: tokens.color.contrastLight,
      fontSize: tokens.font.fontSize.md,
    }),
    menu: styles => ({
      ...styles,
      backgroundColor: tokens.color.contrastLight,
      width: "max-content",
    }),
    control: (styles, {data, isDisabled, isFocused, isSelected}) => ({ 
      ...styles, 
      backgroundColor: isFocused ? tokens.color.accentWeak : tokens.color.transparent,
      border: 0,
      borderBottom: `2px solid ${tokens.color.accentStrong}`,
      borderRadius: isFocused ? tokens.borderRadius.md : 0,
      boxShadow: "none",
      cursor: "pointer",
      "&:hover": {
        opacity: 0.8
      }
    }),
    option: (styles, {data, isDisabled, isFocused, isSelected}) => ({
      ...styles,
      backgroundColor: isSelected ? tokens.color.contrastLightWeak : tokens.color.contrastLight,
      color: tokens.color.contrastDark,
      cursor: "pointer",
      fontStyle: data.defaultValue ? "italic" : "initial",
      padding: tokens.spacing.sm,
      paddingLeft: tokens.spacing.lg,
      paddingRight: tokens.spacing.xl,
      "&:hover": {
        backgroundColor: tokens.color.secondaryTransparent,
      }
    }),
    indicatorSeparator: styles => ({
      ...styles,
      width: 0,
    }),
    dropdownIndicator: styles => ({
      ...styles,
      color: tokens.color.accentStrong,
      "&:hover": {
        color: tokens.color.accentStrong,
        opacity: 0.8
      }
    }),
  }
  const [allProducts, setAllProducts] = useState([])
  const [allFilteredProducts, setAllFilteredProducts] = useState([])
  const [productsToDisplay, setProductsToDisplay] = useState(null)
  
  const [page, setPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(10)
  const [productsPerPage, setProductsPerPage] = useState(5)
  
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
        console.log('# data :', data)
        let category = data.uniqueCategory;
        // Capitalize first letter
        let newArr = category.map(e => {
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
        return filterByTagsInput.every(tag => product.category.includes(tag))
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
    setProductsPerPage(e.target.value)
  }
  const handleFilterByTags = (e) => {
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
  }
  const handleOrderByPrice = () => {
    sortedByPrice ? (
      sortedByPrice === "asc" ? setSortedByPrice("desc") : setSortedByPrice("")
    ) : setSortedByPrice("asc")
    setPage(1);
  }
  
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Header>
        <HeaderTitle><span css={css`font-weight: initial;`}>Explore</span> Nutritiv Products</HeaderTitle>
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
                type="checkbox"
              />
              <label htmlFor={tag}>
                {tag}
              </label>
            </TagWrapper>
          ))
        )}
      </TagsContainer>
      {/* SHAPE FILTER - DROPDOWN */}
      <FilterShapeContainer>
        <FilterBy>
          Filter by
        </FilterBy>
        <div 
          css={css`
            display: inline-block;
            position: relative;
            top: 5px;
          `}
        >
          <Select 
            // components={{ IndicatorSeparator }}
            defaultValue={{value: "", label: "All", defaultValue: true}}
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

        {/* <ShapeDropdown>
          <select 
            onChange={handleFilterByShapeInput}
            name="shapeFilter"
          >
            <option value="">All</option>
            <option value="capsule">Capsule</option>
            <option value="gummy">Gummy</option>
          </select>
        </ShapeDropdown> */}
        
        <FilterBy style={{ marginLeft: tokens.spacing.sm }}>
          shapes.
        </FilterBy>
      </FilterShapeContainer>
      {/* PRICE SORTER - BUTTON */}
      <SortByContainer>
        <SortByText>
          Sort by
        </SortByText>
        <SortByButton onClick={handleOrderByPrice}>
          {sortedByPrice ? (<>Price</>) : (<>Name</>)}
          {
            sortedByPrice && (sortedByPrice === "asc" ? (
              <span> ▲ </span>
            ) : (
              <span> ▼ </span>
            ))
          }
        </SortByButton>
        .
      </SortByContainer>
      {/* PRODUCTS - CARDS */}
      {loading ? (
        <h2>
          Loading products...
        </h2>
      ) : (
        <motion.div
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
        </motion.div>
      )}
      
      <motion.div layout>
        <Pagination
          count={numberOfPages}
          page={page}
          onChange={handleChangeActivePage}
          sx={{
            '& .MuiButtonBase-root': {
              color: "white",
            },
            '& .MuiPaginationItem-root': {
              color: "white",
            }
          }}
        />
        {/* PRODUCTS PER PAGE - DROPDOWN */}
        <form>
          <label htmlFor="productsPerPage">
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
      </motion.div>
    </Container>
  )
});

export default Shop;