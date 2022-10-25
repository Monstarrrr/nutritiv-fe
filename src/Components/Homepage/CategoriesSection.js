/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react';
import { breakpoints, mediaQueries, mediaQuery, tokens } from '../../Helpers/styleTokens';
import { AnimatePresence, AnimateSharedLayout, motion, useAnimation } from 'framer-motion';
import { NutriButton } from '../NutriButton';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { SectionTitle } from './Homepage';
import { Icon } from '../Icons/Icon';
import useWindowDimensions from '../../Helpers/useWindowDimensions';
import { ClickAwayListener } from '@mui/material';

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

const Datalines = styled(motion.img)`
  filter: brightness(1.5);
  height: 300px;
  position: absolute;
  ${mediaQueries({
    top: ["190px", "212px", "262px", "275px"],
  })}
`

const SideGradient = styled.div`
  background: ${tokens.color.accentTransparent};
  border-radius: 999px;
  filter: blur(370px);
  height: 210%;
  left: ${props => props.left ? "-598px" : "initial"};
  right: ${props => props.left ? "initial" : "-598px"};
  position: absolute;
  top: -100%;
  width: 650px;
`

export const CategoriesSection = () => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState("");
  const [isMobile, setIsMobile] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const datalinesAnimationLeft = useAnimation();
  const datalinesAnimationRight = useAnimation();
  
  const variants = {
    default: { borderRadius: "20px" },
    hoveredAnimation: { borderRadius: "25px" }
  }
  const { width } = useWindowDimensions();
  
  async function startDatalinesAnimationLeft() {
    await datalinesAnimationLeft.start({ left: "-20px" })
    await datalinesAnimationLeft.start({ left: "0px" })
    datalinesAnimationLeft.start({
      transition: {
        ease: "easeInOut",
        duration: 0.2,
      }
    })
  }
  async function startDatalinesAnimationRight() {
    await datalinesAnimationRight.start({ right: "-20px" })
    await datalinesAnimationRight.start({ right: "0px" })
    datalinesAnimationRight.start({
      transition: {
        ease: "easeInOut",
        duration: 0.2,
      }
    })
  }
  
  const handleGoPrevious = () => {
    startDatalinesAnimationLeft();
    startDatalinesAnimationRight();
    setActiveIndex(prevActiveIndex => (
      prevActiveIndex === 0 ? (categories.length - 1) : prevActiveIndex - 1
    ))
  }
  const handleGoNext = () => {
    startDatalinesAnimationLeft();
    startDatalinesAnimationRight();
    setActiveIndex(prevActiveIndex => (
      prevActiveIndex === (categories.length - 1) ? 0 : prevActiveIndex + 1
    ))
  }
  
  useEffect(() => {
    if(width < breakpoints[3]) {
      setIsMobile(true);  
    } else {
      setIsMobile(false);  
    }
  }, [width]);
  
  return (
    <div
      css={css`
        max-width: none;
        position: relative;
      `}
    >
      <SideGradient left={1} />
      <SideGradient />
      <Datalines
        alt="datalines"
        animate={datalinesAnimationLeft}
        src="datalines-left.png"
        initial={{ left: 0 }}
        />
      <Datalines
        alt="datalines"
        animate={datalinesAnimationRight}
        initial={{ right: 0 }}
        src="datalines-right.png"
      />
      <div 
        css={css`
          display: flex; 
          flex-direction: column;
          margin: 0 auto;
        `}
      >
        <SectionTitle>
            Categories
        </SectionTitle>
        <div
          css={css`
            border-radius: ${tokens.borderRadius.max};
            display: flex;
            flex-direction: column;
            margin: ${tokens.spacing.xxl} auto;
            margin-bottom: 300px; // temp
            justify-content: space-between;
            ${mediaQuery[2]} {
              flex-direction: row;
            }
          `}
        >
          <AnimatePresence exitBeforeEnter>
            {categories.map((category, i) => (
              (i === activeIndex || !isMobile) && (
                <motion.div
                  key={category.title}
                  onMouseEnter={() => (
                    setHoveredCategory(category.title)
                  )}
                  // onMouseLeave={() => setHoveredCategory("")}
                  onClick={() => (
                    isMobile ? (
                      hoveredCategory === category.title ? (
                        navigate("/shop")
                      ) : (
                        setHoveredCategory(category.title)
                      )
                    ) : (
                      navigate("/shop")
                    )
                  )}
                  variants={variants}
                  initial={{ borderRadius: "20px" }}
                  animate={category.title === hoveredCategory ? 
                    'hoveredAnimation' : 'default'
                  }
                  transition={{ duration: 0.2 }}
                  css={css`
                    align-items: center;
                    background: ${tokens.color.primary};
                    background: radial-gradient(circle, rgb(4, 58, 81) 0%, rgb(2, 0, 71) 100%);
                    border: 4px solid ${tokens.color.accentWeak};
                    border-radius: 20px;
                    display: flex;
                    height: 328px;
                    overflow: hidden;
                    flex-direction: column;
                    margin: 0 20px;
                    /* margin-right: -4px; */
                    padding: ${tokens.spacing.xxl};
                    position: relative;
                    width: 200px;
                  `}
                >
                  <AnimateSharedLayout>
                    {category.title === hoveredCategory ? (
                      <ClickAwayListener 
                        onClickAway={() => setHoveredCategory("")}
                      >
                        <HoveredCard
                          initial={{ opacity: 0, borderRadius: "10px", boxShadow: `0 0 10px 0 inset ${tokens.color.secondary}` }}
                          animate={{ opacity: 1, borderRadius: "20px", boxShadow: `0 0 20px 0 inset ${tokens.color.secondary}` }}
                          transition={{ 
                            duration: 0.2,
                            boxShadow: {
                              duration: 0.4,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }
                          }}
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
                              animate={{ 
                                filter: "drop-shadow(0px 0px 10px rgb(21 241 255 / 0.7))"
                              }}
                              initial={{ 
                                filter: "drop-shadow(0px 0px 4px rgb(21 241 255 / 0.4))" 
                              }}
                              color={tokens.color.accentStrong}
                              name="search"
                              filled
                              transition={{
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 0.4,
                              }}
                              height={65}
                              width={65}
                              style={{
                                transformBox: "fill-box", // svg origin
                                originX: "50%",
                                originY: "50%",
                                zIndex: 2,
                              }}
                            />
                          </motion.div>
                        </HoveredCard>
                      </ClickAwayListener>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, borderRadius: 0 }}
                        animate={{ opacity: 1, borderRadius: "20px" }}
                        exit={{ 
                          opacity: 0, 
                          borderRadius: 0, 
                          transition: { 
                            duration: 0.2 
                          } 
                        }}
                      >
                        <motion.div
                          layoutId="search-icon"
                          css={css`
                            position: absolute;
                            right: 10px;
                            top: 10px;
                            z-index: 2;
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
                        <div 
                          css={css`
                            height: 86px; 
                            overflow: hidden;
                          `}
                        >
                          <Icon
                            name={category.icon}
                            color={tokens.color.accentStrong}
                            filled
                            height={120}
                            width={120}
                          />
                        </div>
                        <h4 css={css`
                          font-size: ${tokens.font.fontSize.lg};
                          font-weight: ${tokens.font.fontWeight.medium};
                          margin-bottom: 0;
                          margin-top: 0;
                          position: relative;
                          text-transform: uppercase;
                          z-index: 0;
                        `}>
                          {category.title}
                        </h4>
                        <p
                          css={css`
                            color: ${tokens.color.contrastLightWeak};
                            font-size: ${tokens.font.fontSize.sm};
                            padding-top: ${tokens.spacing.xxl};
                            margin: 0;
                          `}
                        >
                          {category.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimateSharedLayout>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          {isMobile && (
            <>
              <button onClick={handleGoPrevious}>previous</button>
              <button onClick={handleGoNext}>next</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}