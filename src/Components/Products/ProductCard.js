import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { mediaQuery, tokens } from '../../Helpers/styleTokens';
import { Icon } from '../Icons/Icon';

const Button = styled.div`
  background-color: ${tokens.color.accentStrong};
  border-radius: 999px;
  cursor: pointer;
  padding: 8px;
  padding-bottom: 4px;
  transition: all ease .2s;
  > svg {
    transform: rotate(-90deg);
  }
`
const WaveContainer = styled.div`
  border-radius: 22px;
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  z-index: 0;
  > img {
    bottom: -4px;
    left: -58px;
    max-height: 188px;
    position: relative;
    transition: all ease .4s;
    width: 150%;
  }
`
const Container = styled(motion.div)`
  background-color: ${tokens.color.secondaryTransparent};
  background: radial-gradient(circle at 50% 15%, ${tokens.color.accentWeak} 0%, ${tokens.color.primary} 132%);
  border-radius: ${tokens.borderRadius.xl};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 100px;
  margin-bottom: ${tokens.spacing.lg};
  padding: ${tokens.spacing.xxl};
  position: relative;
  width: 100%;
  &:hover {
    ${WaveContainer} {
     > img {
      transform: translateX(58px);
      transition: all ease .4s;
     }
    }
    ${Button} {
      ${mediaQuery[2]} {
        box-shadow: 0 0 10px -1px ${tokens.color.accentStrong};
      }
    }
  }
`
const Image = styled.img`
  display: block;
  max-width: 200px;
  margin: -100px auto 14px;
  width: 100%;
`
const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  > svg {
    padding-right: 4px;
    height: 32px;
    min-width: 32px;
  }
`
const Title = styled.h2`
  font-size: ${tokens.font.fontSize.lg};
  margin-bottom: ${tokens.spacing.md};
  margin-top: ${tokens.spacing.md};
  overflow: hidden;
  padding-right: ${tokens.spacing.sm};
  text-overflow: ellipsis;
`
const Description = styled.span`
  color: ${tokens.color.contrastLightWeak};
  display: -webkit-box;
  overflow: hidden;
  line-clamp: 2; 
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
`

const Tags = styled.div`
  padding: ${tokens.spacing.md} 0 0;
  margin-top: ${tokens.spacing.md};
`
const Tag = styled.span`
  padding: ${tokens.spacing.xs} ${tokens.spacing.md};
  background: ${tokens.color.semiTransparentLight};
  border-radius: ${tokens.borderRadius.max};
`

const BottomSide = styled.div`
  align-items: center;
  display: flex;
  margin-top: ${tokens.spacing.xl};
  padding-top: ${tokens.spacing.lg};
  position: relative;
  justify-content: space-between;
  z-index: 1;
`
const Price = styled.span`
  display: block;
  font-size: ${tokens.font.fontSize.lg};
  font-weight: bold;
`
const PriceUnit = styled.span`
  color: ${tokens.color.accentStrong};
  font-size: ${tokens.font.fontSize.sm};
  font-weight: ${tokens.font.fontWeight.regular};
  margin-left: 2px;
`

export const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([])
  
  const lowestItemPrice = product.productItems[0].price.value;
  
  // Animation
  const productCard = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
    },
    exit: { opacity: 0 }
  }
  
  useEffect(() => {
    let newArr = product.categories.map(e => {
      return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
    })
    setTags(newArr);
  }, [product.categories]);

  const handleClickProduct = () => {
    navigate({
      pathname: `/${product.title}`,
      search: `?shape=${product.shape}`
    });
  }

  return (
    <Container
      layout
      key={product._id}
      onClick={() => handleClickProduct()}
      variants={productCard}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ 
        duration: 0.32,
        delay: index * 0.05
      }}
    >
      {/* IMAGES */}
      {product.imgs.map((img, i) => (
        <Image
          key={i}
          src={`${process.env.REACT_APP_S3_ADDRESS}${process.env.REACT_APP_S3_PRODUCTS}${img}`}
          alt={`${product.title} ${i+1}`}
        />
      ))}
      <TitleContainer>
        <Title>
          {product.title} 
        </Title>
        <Icon 
          color={tokens.color.contrastLightWeak} 
          name={product.shape === "gummy" ? "gummy" : "capsule"} 
          filled
          height="30px"
          width="30px"
        />
      </TitleContainer>
      <Description>
        {product.desc}
      </Description>
      <Tags>
        {tags && tags.map((tag, i) => (
          <Tag key={i}>
            {tag}
          </Tag>
        ))}
      </Tags>
      <BottomSide>
        <Price>
          {lowestItemPrice}<PriceUnit>€</PriceUnit>
        </Price>
        <Button>
          <Icon 
            color={tokens.color.contrastDark}
            name="arrowDown" 
            strokeWidth={2}
            resizeDefault="0 1 24 24"
            height={25}
            width={25}
          />
        </Button>
      </BottomSide>
      <WaveContainer>
        <img alt="wave" src="/wave.png" />
      </WaveContainer>
    </Container>
  )
}
