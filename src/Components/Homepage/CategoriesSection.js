/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { css } from '@emotion/react';
import { tokens } from '../../Helpers/styleTokens';
import { AnimatePresence, motion } from 'framer-motion';
import { NutriButton } from '../NutriButton';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { SectionTitle } from './Homepage';
import { Icon } from '../Icons/Icon';

const categories = [
  {
    icon: "brain",
    title: "Mental",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Quis nostrud exercitation ullamco"
  },
  {
    icon: "arrowsUp",
    title: "Growth",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Quis nostrud exercitation ullamco"
  },
  {
    icon: "armor",
    title: "Resistance",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Quis nostrud exercitation ullamco"
  },
  {
    icon: "plusSign",
    title: "Unique",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Quis nostrud exercitation ullamco"
  },
]

const firstBorders = css`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`
const lastBorders = css`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`

const HoveredCard = styled(motion.div)`
  align-items: center;
  background: ${tokens.color.primary};
  border-radius: 20px; // temp
  cursor: pointer;
  display: flex;
  flex-direction: column;
  inset: 0;
  justify-content: center;
  overflow: hidden;
  position: absolute;
`
const HoveredIconContainer = styled(motion.div)`
  align-items: center;
  background: linear-gradient(0deg, ${tokens.color.accentWeak} 20%, rgb(16, 228, 183) 50%, ${tokens.color.accentWeak} 90%);
  background-size: 400% 400%;
  clip-path: ${props => props.iconName && `url(#svg-path-${props.iconName})`};
  display: flex;
  justify-content: center;
  height: 230%;
  inset: 0;
  overflow: hidden;
  position: absolute;
  left: -259px;
  top: -217px;
  transform: rotate(25deg);
  width: 230%;
  z-index: 0;
  ${props => props.first && firstBorders}
  ${props => props.last && lastBorders}
  
  path {
    transform: scale(3.75);
  }
`

export const CategoriesSection = () => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState("")
  const variants = {
    default: { borderRadius: "10px" },
    hoveredAnimation: { borderRadius: "25px" }
  }
  
  return (
    <div 
      css={css`
        display: flex; 
        flex-direction: column;
      `}
    >
      <SectionTitle>
          Categories
      </SectionTitle>
      <div
        css={css`
          background: ${tokens.color.accentWeak};
          border-radius: ${tokens.borderRadius.max};
          display: flex;
          height: 390px;
          margin: ${tokens.spacing.lg} auto;
          margin-bottom: 300px; // temp
          width: 1100px;
        `}
      >
        {categories.map((category, i) => (
          <motion.div
            onMouseEnter={() => setHoveredCategory(category.title)}
            // onMouseLeave={() => setHoveredCategory("")}
            onClick={() => navigate("/shop")}
            key={category.title}
            variants={variants}
            initial={{ borderRadius: "10px" }}
            animate={category.title === hoveredCategory ? 
              'hoveredAnimation' : 'default'
            }
            transition={{ duration: 0.2 }}
            css={css`
              align-items: center;
              background: ${tokens.color.primary};
              border: 4px solid ${tokens.color.accentWeak};
              border-right: 0;
              display: flex;
              flex-direction: column;
              margin-right: -4px;
              padding: ${tokens.spacing.xxl};
              position: relative;
              border: 4px solid ${tokens.color.accentWeak};
            `}
          >
            <AnimatePresence>
              {category.title === hoveredCategory && (
                <HoveredCard
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <HoveredIconContainer
                    last={i === (categories.length - 1) ? 1 : undefined}
                    first={i === 0 ? 1 : undefined}
                    iconName={category.icon}
                    animate={{
                      backgroundPosition: [
                        "0% 0%", 
                        "0% 100%"
                      ]
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  >
                    <Icon
                      name={category.icon}
                      color={tokens.color.accentWeak}
                      filled
                      isClipPath
                      // style={{
                      //   transform: "rotate(25deg)",
                      //   position: "absolute"
                      // }}
                      height={600}
                      width={600}
                    />
                  </HoveredIconContainer>
                  <p css={css`
                    color: ${tokens.color.contrastLight};
                    font-size: ${tokens.font.fontSize.lg};
                    font-weight: ${tokens.font.fontWeight.medium};
                    letter-spacing: 2px;
                    z-index: 1;`
                  }>
                    SHOP
                  </p>
                </HoveredCard>
              )}
            </AnimatePresence>
            <Icon
              name={category.icon}
              color={tokens.color.accentStrong}
              filled
              height={200}
              width={200}
            />
            <h4 css={css`
              background: ${tokens.color.primary};
              font-size: ${tokens.font.fontSize.lg};
              font-weight: ${tokens.font.fontWeight.medium};
              margin-top: -26px;
              margin-bottom: 16px;
              text-transform: uppercase;
            `}>
              {category.title}
            </h4>
            <p
              css={css`
                color: ${tokens.color.contrastLightWeak};
                font-size: ${tokens.font.fontSize.sm};
              `}
            >
              {category.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}