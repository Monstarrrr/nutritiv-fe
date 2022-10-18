/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { css } from '@emotion/react';
import { tokens } from '../../Helpers/styleTokens';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { NutriButton } from '../NutriButton';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { SectionTitle } from './Homepage';
import { Icon } from '../Icons/Icon';

const categories = [
  {
    icon: "brain",
    title: "Mental",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
  },
  {
    icon: "arrowsUp",
    title: "Growth",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
  },
  {
    icon: "armor",
    title: "Resistance",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
  },
  {
    icon: "plusSign",
    title: "Unique",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
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
  background: linear-gradient(0deg, ${tokens.color.accentWeak} 43%, ${tokens.color.accentStrong} 50%, ${tokens.color.accentWeak} 57%);
  background-size: 250% 250%;
  clip-path: ${props => props.iconname && `url(#svg-path-${props.iconname})`};
  display: flex;
  justify-content: center;
  height: 230%;
  inset: 0;
  overflow: hidden;
  position: absolute;
  left: -268px;
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
    default: { borderRadius: "20px" },
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
          /* background: ${tokens.color.accentWeak}; */
          border-radius: ${tokens.borderRadius.max};
          display: flex;
          height: 400px;
          margin: ${tokens.spacing.xxl} auto;
          margin-bottom: 300px; // temp
          justify-content: space-between;
        `}
      >
        {categories.map((category, i) => (
          <motion.div
            onMouseEnter={() => setHoveredCategory(category.title)}
            onMouseLeave={() => setHoveredCategory("")}
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
              border-radius: 20px;
              display: flex;
              flex-direction: column;
              margin: 0 20px;
              /* margin-right: -4px; */
              padding: ${tokens.spacing.xxl};
              position: relative;
              width: 200px;
            `}
          >
            <AnimatePresence>
              <AnimateSharedLayout>
                {category.title === hoveredCategory ? (
                  <HoveredCard
                    initial={{ opacity: 0, borderRadius: 0 }}
                    animate={{ opacity: 1, borderRadius: "20px" }}
                    exit={{ opacity: 0, borderRadius: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HoveredIconContainer
                      last={i === (categories.length - 1) ? 1 : undefined}
                      first={i === 0 ? 1 : undefined}
                      iconname={category.icon}
                      animate={{
                        backgroundPosition: [
                          "0% -70%", 
                          "0% -145%"
                        ],
                      }}
                      transition={{
                        backgroundPosition: {
                          duration: 0.9,
                          ease: "easeOut",
                        },
                      }}
                    >
                      <Icon
                        name={category.icon}
                        color={tokens.color.accentWeak}
                        filled
                        isClipPath
                        height={600}
                        width={600}
                      />
                    </HoveredIconContainer>
                    <motion.div
                      layoutId="search-icon"
                    >
                      <Icon 
                        color={tokens.color.accentStrong}
                        name="search"
                        filled
                        height={65}
                        width={65}
                        style={{
                          filter: "drop-shadow(0px 0px 10px rgb(21 241 255 / 0.4))",
                          zIndex: 2,
                        }}
                      />
                    </motion.div>
                  </HoveredCard>
                ) : (
                  <>
                    <motion.div
                      layoutId="search-icon"
                      css={css`
                        position: absolute;
                        right: 10px;
                        top: 10px;
                      `}
                    >
                      <Icon
                        name="search"
                        color={tokens.color.accentWeak}
                        filled
                        height={30}
                        width={30}
                      />
                    </motion.div>
                    <div css={css`height: 100px;`}>
                      <Icon
                        name={category.icon}
                        color={tokens.color.accentStrong}
                        filled
                        height={120}
                        width={120}
                      />
                      <h4 css={css`
                        background: ${tokens.color.primary};
                        font-size: ${tokens.font.fontSize.lg};
                        font-weight: ${tokens.font.fontWeight.medium};
                        margin-bottom: 16px;
                        position: relative;
                        text-transform: uppercase;
                        top: -73px;
                      `}>
                        {category.title}
                      </h4>
                    </div>
                    <p
                      css={css`
                        color: ${tokens.color.contrastLightWeak};
                        font-size: ${tokens.font.fontSize.sm};
                        padding-top: ${tokens.spacing.xxl};
                      `}
                    >
                      {category.description}
                    </p>
                  </>
                )}
              </AnimateSharedLayout>
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}