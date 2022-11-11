/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { scrollToElement } from '../../Helpers/scrollToElement'
import { breakpoints, mediaQueries, mediaQuery, tokens } from '../../Helpers/styleTokens'
import useWindowDimensions from '../../Helpers/useWindowDimensions'
import { Icon } from '../Icons/Icon'
import { motion, useSpring, useTransform, useViewportScroll } from 'framer-motion';
import { useScroll } from '@react-three/drei'

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
    speed: 0.35,
  },
  {
    shape: "M60.3,-33.1C74.2,-10.8,78.8,18.6,67.1,41.6C55.5,64.5,27.8,80.9,2.2,79.6C-23.4,78.4,-46.9,59.5,-59.8,35.8C-72.8,12.1,-75.4,-16.4,-63.6,-37.5C-51.9,-58.6,-26,-72.1,-1.4,-71.4C23.2,-70.6,46.5,-55.4,60.3,-33.1Z",
    x: "5%",
    y: "30%",
    scale: "0.5",
    opacity: 0.52,
    speed: 0.5,
  },
  {
    shape: "M57.3,-19.8C66.2,9,60,41.5,38.9,57.8C17.7,74.2,-18.3,74.5,-41.4,57.5C-64.6,40.5,-75,6.4,-65.9,-22.5C-56.9,-51.4,-28.4,-75.1,-2.1,-74.4C24.2,-73.7,48.3,-48.6,57.3,-19.8Z",
    x: "18%",
    y: "40%",
    scale: "0.20",
    opacity: 0.58,
    speed: 0.3,
  },
  {
    shape: "M57.3,-19C65.6,6.7,57.5,37.4,37.8,51.6C18.1,65.9,-13.3,63.7,-37.3,47.3C-61.2,30.8,-77.8,0.1,-70.3,-24.6C-62.9,-49.2,-31.4,-67.8,-3.5,-66.6C24.5,-65.5,49.1,-44.7,57.3,-19Z",
    x: "10%",
    y: "60%",
    scale: "0.4",
    opacity: 0.8,
    speed: 0.2,
  },
  {
    shape: "M68.6,-25.6C76.4,1.8,61.6,33.1,38.3,49.2C15.1,65.3,-16.7,66.1,-38.8,50.7C-60.8,35.3,-73.1,3.8,-65,-24C-56.9,-51.8,-28.5,-75.8,1,-76.1C30.4,-76.4,60.8,-53,68.6,-25.6Z",
    x: "14%",
    y: "69%",
    scale: "0.18",
    opacity: 0.9,
    speed: -0.5,
  },
  
  // RIGHT //
  {
    shape: "M66.3,-20.5C74.5,3.7,61.8,35.7,38.3,52.7C14.9,69.8,-19.4,71.9,-42.1,55.9C-64.7,40,-75.6,5.9,-66.6,-19.3C-57.7,-44.6,-28.8,-61,0.1,-61C29,-61.1,58.1,-44.7,66.3,-20.5Z",
    x: "82%",
    y: "9%",
    scale: "0.4",
    opacity: 0.42,
    speed: 0.8,
  },
  {
    shape: "M55.9,-20.3C63.6,5.6,55,34.7,33.8,51.2C12.6,67.6,-21.1,71.5,-44.3,55.8C-67.5,40.2,-80.3,5,-71.1,-22.9C-62,-50.7,-31,-71.3,-3.5,-70.1C24.1,-69,48.1,-46.2,55.9,-20.3Z",
    x: "83%",
    y: "26%",
    scale: "0.1",
    opacity: 0.56,
    speed: 0.25,
  },
  {
    shape: "M67.3,-20.9C76,4.8,64,38.3,40.1,55.8C16.2,73.4,-19.8,75,-41,59C-62.2,43,-68.6,9.3,-59.4,-17.3C-50.1,-43.9,-25,-63.4,2.1,-64.1C29.3,-64.8,58.6,-46.7,67.3,-20.9Z",
    x: "98%",
    y: "30%",
    scale: "0.16",
    opacity: 0.62,
    speed: 0.4,
  },
  {
    shape: "M57.6,-16.5C66.9,10,61.5,43.5,41.8,57.9C22.1,72.3,-11.7,67.5,-35,50.1C-58.3,32.7,-71,2.8,-63.4,-21.4C-55.8,-45.5,-27.9,-63.8,-1.9,-63.2C24.1,-62.6,48.3,-43.1,57.6,-16.5Z",
    x: "79%",
    y: "55%",
    scale: "0.3",
    opacity: 0.75,
    speed: 0.15,
  },
  {
    shape: "M58.6,-22.7C66.1,4.3,55.8,33.5,34.6,49.3C13.4,65.1,-18.7,67.5,-38.6,53.1C-58.4,38.7,-66,7.4,-57.5,-20.8C-49,-49.1,-24.5,-74.3,0.5,-74.4C25.5,-74.6,51,-49.7,58.6,-22.7Z",
    x: "90%",
    y: "80%",
    scale: "0.5",
    opacity: 1,
    speed: 0.1,
  },
]

const Path = styled.path`
  transform: ${props => `translate(${props.x}, ${props.y}) scale(${props.scale});`};
  opacity: ${props => `${props.opacity};`};
`

const Bubble = ({ bubble }) => {
  const { scrollYProgress } = useViewportScroll();
  const yTransform = useTransform(
    scrollYProgress, 
    [0, 0.4], 
    [200, -200 * bubble.speed]
  );
  const y = useSpring(yTransform, {
    stiffness: 300, damping: 100
  })
  
  return (
    <motion.g
      style={{ y }}
    >
      <Path 
        d={bubble.shape}
        fill="url(#bubble-gradient)"
        x={bubble.x}
        y={bubble.y}
        opacity={bubble.opacity}
        scale={bubble.scale}
      />
    </motion.g>
  );
}

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
        height="250%" 
        // viewBox="0 0 2000 2000"
        style={{ 
          // marginTop: "calc(32vw + 150px)",
          position: "absolute",
          opacity: 0.6,
          zIndex: 0,
        }}
      >
        {bubbles.map((bubble, i) => (
          <Bubble 
            key={i} 
            bubble={bubble}
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