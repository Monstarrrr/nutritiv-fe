/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { forwardRef, useEffect, useState } from 'react'
import { scrollToElement } from '../../Helpers/scrollToElement'
import { breakpoints, mediaQueries, mediaQuery, tokens } from '../../Helpers/styleTokens'
import useWindowDimensions from '../../Helpers/useWindowDimensions'
import { Icon } from '../Icons/Icon'
import { motion } from 'framer-motion';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 32vw;
  margin-bottom: 40vh;
  position: relative;
`
const ArrowSide = styled.div``

const bubbles = [
  // LEFT //
  {
    shape: "M71.1,-40.3C84.4,-17.9,82.2,14.1,67.7,37.7C53.3,61.3,26.7,76.4,2.1,75.2C-22.4,73.9,-44.8,56.4,-58.5,33.2C-72.2,10,-77.3,-18.8,-66.1,-39.9C-54.9,-61.1,-27.4,-74.7,0.7,-75.1C28.9,-75.5,57.7,-62.8,71.1,-40.3Z",
    x: "21%",
    y: "3%",
    scale: "0.26",
    opacity: 0.4,
  },
  {
    shape: "M60.3,-33.1C74.2,-10.8,78.8,18.6,67.1,41.6C55.5,64.5,27.8,80.9,2.2,79.6C-23.4,78.4,-46.9,59.5,-59.8,35.8C-72.8,12.1,-75.4,-16.4,-63.6,-37.5C-51.9,-58.6,-26,-72.1,-1.4,-71.4C23.2,-70.6,46.5,-55.4,60.3,-33.1Z",
    x: "5%",
    y: "30%",
    scale: "0.5",
    opacity: 0.52,
  },
  {
    shape: "M71.1,-40.3C84.4,-17.9,82.2,14.1,67.7,37.7C53.3,61.3,26.7,76.4,2.1,75.2C-22.4,73.9,-44.8,56.4,-58.5,33.2C-72.2,10,-77.3,-18.8,-66.1,-39.9C-54.9,-61.1,-27.4,-74.7,0.7,-75.1C28.9,-75.5,57.7,-62.8,71.1,-40.3Z",
    x: "18%",
    y: "40%",
    scale: "0.20",
    opacity: 0.58,
  },
  {
    shape: "M71.1,-40.3C84.4,-17.9,82.2,14.1,67.7,37.7C53.3,61.3,26.7,76.4,2.1,75.2C-22.4,73.9,-44.8,56.4,-58.5,33.2C-72.2,10,-77.3,-18.8,-66.1,-39.9C-54.9,-61.1,-27.4,-74.7,0.7,-75.1C28.9,-75.5,57.7,-62.8,71.1,-40.3Z",
    x: "10%",
    y: "60%",
    scale: "0.4",
    opacity: 0.8,
  },
  
  // RIGHT //
  {
    shape: "M71.1,-40.3C84.4,-17.9,82.2,14.1,67.7,37.7C53.3,61.3,26.7,76.4,2.1,75.2C-22.4,73.9,-44.8,56.4,-58.5,33.2C-72.2,10,-77.3,-18.8,-66.1,-39.9C-54.9,-61.1,-27.4,-74.7,0.7,-75.1C28.9,-75.5,57.7,-62.8,71.1,-40.3Z",
    x: "82%",
    y: "9%",
    scale: "0.4",
    opacity: 0.42,
  },
  {
    shape: "M71.1,-40.3C84.4,-17.9,82.2,14.1,67.7,37.7C53.3,61.3,26.7,76.4,2.1,75.2C-22.4,73.9,-44.8,56.4,-58.5,33.2C-72.2,10,-77.3,-18.8,-66.1,-39.9C-54.9,-61.1,-27.4,-74.7,0.7,-75.1C28.9,-75.5,57.7,-62.8,71.1,-40.3Z",
    x: "83%",
    y: "26%",
    scale: "0.1",
    opacity: 0.56,
  },
  {
    shape: "M71.1,-40.3C84.4,-17.9,82.2,14.1,67.7,37.7C53.3,61.3,26.7,76.4,2.1,75.2C-22.4,73.9,-44.8,56.4,-58.5,33.2C-72.2,10,-77.3,-18.8,-66.1,-39.9C-54.9,-61.1,-27.4,-74.7,0.7,-75.1C28.9,-75.5,57.7,-62.8,71.1,-40.3Z",
    x: "98%",
    y: "30%",
    scale: "0.16",
    opacity: 0.62,
  },
  {
    shape: "M71.1,-40.3C84.4,-17.9,82.2,14.1,67.7,37.7C53.3,61.3,26.7,76.4,2.1,75.2C-22.4,73.9,-44.8,56.4,-58.5,33.2C-72.2,10,-77.3,-18.8,-66.1,-39.9C-54.9,-61.1,-27.4,-74.7,0.7,-75.1C28.9,-75.5,57.7,-62.8,71.1,-40.3Z",
    x: "79%",
    y: "55%",
    scale: "0.3",
    opacity: 0.75,
  },
  {
    shape: "M71.1,-40.3C84.4,-17.9,82.2,14.1,67.7,37.7C53.3,61.3,26.7,76.4,2.1,75.2C-22.4,73.9,-44.8,56.4,-58.5,33.2C-72.2,10,-77.3,-18.8,-66.1,-39.9C-54.9,-61.1,-27.4,-74.7,0.7,-75.1C28.9,-75.5,57.7,-62.8,71.1,-40.3Z",
    x: "90%",
    y: "80%",
    scale: "0.5",
    opacity: 1,
  },
]

const Path = styled.path`
  transform: ${props => `translate(${props.x}, ${props.y}) scale(${props.scale});`};
  opacity: ${props => `${props.opacity};`};
`

export const ArrowSection = forwardRef((props, ref) => {
  const [fillDelay, setFillDelay] = useState(false)
  const [arrowHovered, setArrowHovered] = useState(false)
  const { width } = useWindowDimensions();

  useEffect(() => {
    if(arrowHovered) {
      const timer = setTimeout(() => {
        setFillDelay(true);
      }, 200)
      return () => clearTimeout(timer);
    } else {
      setFillDelay(false);
    }
  }, [arrowHovered]);
  
  const textVariants = {
    "onscreen": {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <Container>

      {/* BUBBLES */}
      <svg 
        style={{width:0, height:0, position: "absolute"}} 
        aria-hidden="true" 
        focusable="false"
      >
        <defs>
          <radialGradient id="bubble-gradient" cx="23%" cy="44%" r="100%" fx="36%" fy="18%">
            <stop offset="0%" stopColor={tokens.color.secondary} />
            <stop offset="50%" stopColor={tokens.color.secondaryTransparent} />
            <stop offset="100%" stopColor={tokens.color.primaryTransparent} />
          </radialGradient>
        </defs>
      </svg>
      
      <svg 
        width="100%" 
        height="100%" 
        // viewBox="0 0 2000 2000"
        style={{ 
          marginTop: "calc(32vw + 150px)",
          position: "absolute",
          opacity: 0.6,
          zIndex: 0,
        }}
      >
        {bubbles.map((bubble, i) => (
          <Path 
            d={bubble.shape}
            fill="url(#bubble-gradient)" 
            key={i}
            x={bubble.x}
            y={bubble.y}
            opacity={bubble.opacity}
            scale={bubble.scale}
          />
        ))}
      </svg>
      
      {/* CONTENT */}
      <motion.h4
        css={css`
          margin-right: 20px;
          margin-left: 20px;
          font-size: ${tokens.font.fontSize.md};
          font-weight: ${tokens.font.fontWeight.bold};
          line-height: 1.5;
          z-index: 1;
          ${mediaQueries({
            paddingRight: [
              "0px", "0px", "0px", "26px"
            ],
            marginTop: [
              "98vw", "80vw", "74vw", "32vw"
            ],
            marginRight: [
              "50px", "20px", "20px", "20px"
            ],
            marginLeft: [
              "50px", "20px", "20px", "20px"
            ],
            maxWidth: [
              "480px",
            ]
          })}
        `}
        initial={{ 
          opacity: 0, 
          y: -30,
        }}
        transition={{
          duration: 0.4
        }}
        ref={ref.discoverScrollRef}
        variants={textVariants}
        viewport={{ once: true, amount: 0.4 }}
        whileInView="onscreen"
      >
        The human body uses only 20% of its molecules potential.<br/>
        Our superments are exclusive supplements which unlock their hidden potential.<br/>
      </motion.h4>
      <ArrowSide
        css={css`
          margin-top: 7vw;
          z-index: 1;
          ${mediaQueries({
            paddingRight: [
              "0px", "0px", "0px", "12px"
            ],
            marginTop: [
              "14vw", "8vw", "6vw", "7vw"
            ]
          })}
        `}
      >
        <motion.div
          onClick={() => scrollToElement(ref.shapesScrollRef)}
          onMouseEnter={() => setArrowHovered(true)}
          onMouseLeave={() => setArrowHovered(false)}
          css={css`
            border-radius: 999px;
            border: 2px solid ${tokens.color.accentWeak};
            cursor: pointer;
            padding: 8px;
            padding-bottom: 4px;
            transition: all ease .2s;
            &:hover {
              ${mediaQuery[2]} {
                box-shadow: 0 0 10px -1px ${tokens.color.accentStrong};
                border: 2px solid ${tokens.color.accentStrong};
              }
            }
          `}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.1}}
          variants={textVariants}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="onscreen"
        >
          <Icon
            name="arrowDown"
            color={tokens.color.contrastLight}
            resizeDefault="-1 0 25 25"
            strokeWidth={2}
            height={25}
            width={25}
          />
        </motion.div>
        {width > breakpoints[2] && (
          <Icon
            name="wave"
            color={tokens.color.contrastLight}
            filled={fillDelay}
            hovered={arrowHovered}
            resizeDefault="0 0 65 70"
            resizeFilled="0 0 65 70"
            strokeWidth={2}
            style={{ paddingTop: "20px" }}
            height={35}
            width={35}
          />
        )}
      </ArrowSide>
    </Container>
  )
})