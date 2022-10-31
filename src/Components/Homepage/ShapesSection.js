/** @jsxImportSource @emotion/react */
import React, { forwardRef, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { tokens } from '../../Helpers/styleTokens';
import { Icon } from '../Icons/Icon';
import { NutriButton } from '../NutriButton';
import { SectionTitle } from './Homepage';

const SectionContent = styled.div`
  margin-top: ${tokens.spacing.max};
  perspective: 2000px;
  perspective-origin: center;
  position: relative;
`
const Card = styled(motion.div)`
  background: ${tokens.color.primary};
  background: radial-gradient(circle, rgb(1, 53, 74) 0%, ${tokens.color.primary} 100%);
  border-radius: ${tokens.borderRadius.xl};
  box-shadow: ${tokens.color.accentWeak} 0px 0px 10px 2px;
  height: 300px;
  position: relative;
  transform: rotateX(20deg) rotateY(0deg);
  transform-style: preserve-3d;
  width: 812px;
  z-index: -1;
  &:before {
    background: #051255;
    border-radius: ${tokens.borderRadius.xl};
    content: "";
    position: absolute;
    inset: 0;
    transform: translateZ(-84px);
  }
  &:after {
    background: #0512558f;
    border-radius: ${tokens.borderRadius.xl};
    content: "";
    position: absolute;
    inset: 0;
    transform: translateZ(-160px);
  }
`
const CardContent = styled.div`
  align-items: center;
  display: flex;
  position: absolute;
  inset: 0;
  transform: rotateX(20deg) rotateY(0deg);
`
const CardSupermentContainer = styled.div`
  position: relative;
  width: 270px;
`
const CardSuperment = styled.div`
  background: transparent;
  position: absolute;
  left: 0px;
  height: 300px;
  width: 270px;
  bottom: 50%;
  transform: translateY(50%);
`
const CardDescription = styled.div``
const CardButton = styled.div``
const ShapesSwitch = styled.div``

const variants = {
  active: "transform: rotateX(50deg)",
  default: "transform: rotateX(20deg)",
}

const shapes = [
  {
    name: 'Capsule',
    stats: [
      { name: "Strength",   value: 5 },
      { name: "Duration",   value: 3 },
      { name: "Peak Speed", value: 5 }
    ],
    description: "For those who want the highest performance available, at the cost of a shorter duration of the effects.",
  }, 
  {
    name: 'Gummy',
    stats: [
      { name: "Strength",   value: 4 },
      { name: "Duration",   value: 5 },
      { name: "Peak Speed", value: 3 }    
    ],
    description: "For those who want lasting effects, at the cost of strength and the time it takes to set in.",
  }, 
];
export const ShapesSection = forwardRef(({props}, ref) => {
  const [focusedShape, setFocusedShape] = useState(null);
  const [selectedShape, setSelectedShape] = useState(shapes[0]);

  const [active, setActive] = useState(false);
  
  useEffect(() => {
    setActive(true)
    const timer = setTimeout(() => {
      setActive(false);
    }, 200)
    
    return () => clearTimeout(timer);
  }, [selectedShape]);
  
  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        margin-bottom: 40vh; // temp
      `}
    >
      <SectionTitle>
          Shapes
      </SectionTitle>
      
      <ShapesSwitch>
        <ul
          css={css`
            align-items: center;
            background: ${tokens.color.accentWeak};
            border-radius: ${tokens.borderRadius.lg};
            box-shadow: 0px 0px 10px 1px ${tokens.color.contrastDark};
            display: flex;
            padding: 4px;
            width: fit-content;
          `}
        >
          {shapes && shapes.map(shape => (
            <li
              css={css`
                align-items: center;
                cursor: pointer;
                display: flex;
                height: auto;
                justify-content: center;
                list-style: none;
                outline: none;
                text-transform: uppercase;
                padding: ${tokens.spacing.md} ${tokens.spacing.xxl};
                position: relative;
              `}
              key={shape.name}
              onClick={() => setSelectedShape(shape)}
              onMouseEnter={() => setFocusedShape(shape.name)}
              onMouseLeave={() => setFocusedShape("")}
            >
              <span
                css={css`
                  bottom: 0;
                  color: ${shape.name === selectedShape.name ? 
                    tokens.color.contrastDark : tokens.color.contrastLight
                  };
                  left: '4px';
                  font-size: ${tokens.font.fontSize.xs};
                  font-weight: ${tokens.font.fontWeight.medium};
                  position: 'absolute';
                  right: 0;
                  top: '6px';
                  user-select: 'none';
                  z-index: 2;
                `}
              >
                {shape.name}
              </span>
              {focusedShape === shape.name ? (
                <AnimatePresence>
                  <motion.div
                    style={{
                      background: tokens.color.primaryTransparent,
                      borderRadius: tokens.borderRadius.lg,
                      bottom: 0,
                      height: "100%",
                      left: 0,
                      position: "absolute",
                      right: 0,
                      width: "100%",
                      zIndex: 0,
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
              {selectedShape.name === shape.name ? (
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
            </li>
          ))}
        </ul>
      </ShapesSwitch>
      
      <SectionContent>
        <Card />
        <CardContent>
          <CardSupermentContainer>
            <CardSuperment>
              <div
                ref={ref.capsuleWaterViewHomepage}
                style={{ 
                  display: selectedShape.name === "Capsule" ? "inline-block" : "none", 
                  height: "300px", 
                  width: "270px"
                }}
              />
              <div
                ref={ref.gummyPiViewHomepage}
                style={{
                  display: selectedShape.name === "Gummy" ? "inline-block" : "none", 
                  height: "300px", 
                  width: "270px"
                }}
              />
            </CardSuperment>
          </CardSupermentContainer>
          
          <CardDescription
            css={css`
              padding-left: 20px;
              text-align: left;
              user-select: none;
              width: 270px;
            `}
          >
            <h4
              ref={ref.shapesScrollRef}
              css={css`
                margin-top: 0;
                margin-bottom: ${tokens.spacing.xl};
                font-size: ${tokens.font.fontSize.lg};
                font-weight: ${tokens.font.fontWeight.medium};
              `}
            >
              {selectedShape && selectedShape.name}
            </h4>
            <div
              css={css`
                align-items: left;
                display: flex;
                font-weight: ${tokens.font.fontWeight.light};
                flex-direction: column;
                position: relative;
                > div {
                  align-items: center;
                  display: flex;
                  margin-bottom: ${tokens.spacing.sm};
                  &:nth-last-of-type(1) {
                    margin-bottom: 0;
                  }
                }
                &:before {
                  content: "";
                  background-color: ${tokens.color.accentStrong};
                  bottom: 0;
                  position: absolute;
                  top: 0;
                  width: 2px;
                  left: -24px;
                  height: 50%;
                  transform: translateY(50%);
                  border-radius: 20px;
                }
              `}
            >
              {selectedShape && selectedShape.stats.map((stat, i) => (
                <div
                  css={css`
                    display: flex;
                    font-weight: ${tokens.font.fontWeight.regular};
                  `}
                  key={stat.name}
                >
                  <label css={css`margin-right: ${tokens.spacing.md};`}>
                    {stat.name}
                  </label>
                  <div>
                    <AnimatePresence exitBeforeEnter>
                      {[...Array(stat.value)].map((_, i) => 
                        <Icon
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 * i }}
                          color={tokens.color.accentStrong}
                          filled
                          height={20}
                          key={i}
                          name="beaker"
                          style={{
                            marginLeft: "5px"
                          }}
                          width={20}
                        />
                      )}
                      {[...Array(5 - stat.value)].map((_, i) => 
                        <Icon
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.5 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: (0.2 * i) + (0.2 * stat.value) }}
                          color={tokens.color.accentStrong}
                          height={20}
                          key={i}
                          name="beaker"
                          style={{
                            marginLeft: "5px"
                          }}
                          strokeWidth={2}
                          width={20}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
            <div
              css={css`
                margin-top: ${tokens.spacing.xl};
                font-weight: ${tokens.font.fontWeight.medium};
              `}
            >
              {selectedShape.description}  
            </div>
          </CardDescription>
          
          <CardButton
            css={css`
              width: 270px;
            `}
          >
            <NutriButton 
              label={selectedShape.name === "Capsule" ? "Shop Capsules" : "Shop Gummies"}
              type="filled"
            />
          </CardButton>
        </CardContent>
      </SectionContent>
    </div>
  )
})