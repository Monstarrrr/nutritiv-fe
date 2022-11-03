/** @jsxImportSource @emotion/react */
import React, { forwardRef, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaQuery, tokens } from '../../Helpers/styleTokens';
import { Icon } from '../Icons/Icon';
import { NutriButton } from '../NutriButton';
import { SectionTitle } from './Homepage';

// SECTION
const Section = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 40vh; // temp
`
const SectionContent = styled.div`
  margin-top: ${tokens.spacing.max};
  perspective: 2000px;
  perspective-origin: center;
  position: relative;
`

// SWITCH
const SwitchWrapper = styled.div`
  display: none;
  ${mediaQuery[2]} {
    align-items: center;
    background: ${tokens.color.accentWeak};
    border-radius: ${tokens.borderRadius.lg};
    box-shadow: 0px 0px 10px 1px ${tokens.color.contrastDark};
    padding: 4px;
    width: fit-content;
    display: flex;
  }
`
const ShapeContainer = styled.li`
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
`
const ShapeLabel = styled.span`
  bottom: 0;
  color: ${props => props.active ? tokens.color.contrastDark : tokens.color.contrastLight};
  left: '4px';
  font-size: ${tokens.font.fontSize.xs};
  font-weight: ${tokens.font.fontWeight.medium};
  position: 'absolute';
  right: 0;
  top: '6px';
  user-select: 'none';
  z-index: 2;
`
const FocusedShape = styled(motion.div)`
  background: ${tokens.color.primaryTransparent};
  border-radius: ${tokens.borderRadius.lg};
  height: 100%;
  width: 100%;
  z-index: 0;
`

// CARD
const Card = styled(motion.div)`
  display: none;
  ${mediaQuery[2]} {
    background: ${tokens.color.primary};
    background: radial-gradient(circle, rgb(1, 53, 74) 0%, ${tokens.color.primary} 100%);
    border-radius: ${tokens.borderRadius.xl};
    box-shadow: ${tokens.color.accentWeak} 0px 0px 10px 2px;
    display: block;
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
  }
`
const CardContent = styled.div`
  align-items: center;
  display: flex;
  position: absolute;
  inset: 0;
  transform: rotateX(20deg) rotateY(0deg);
  flex-direction: column;
  ${mediaQuery[2]} {
    flex-direction: row;
  }
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
const StatsContainer = styled.div`
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
    display: none;
    ${mediaQuery[2]} {
      content: "";
      background-color: ${tokens.color.accentStrong};
      bottom: 0;
      display: inline-block;
      position: absolute;
      top: 0;
      width: 2px;
      left: -24px;
      height: 50%;
      transform: translateY(50%);
      border-radius: 20px;
    }
  }
`
const CardDescription = styled.div``
const CardButton = styled.div``
const ShapesSwitch = styled.div``

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
  
  // const [active, setActive] = useState(false);
  
  // useEffect(() => {
  //   setActive(true)
  //   const timer = setTimeout(() => {
  //     setActive(false);
  //   }, 200)
    
  //   return () => clearTimeout(timer);
  // }, [selectedShape]);
  
  return (
    <Section>
      <SectionTitle>
          Shapes
      </SectionTitle>
      
      <ShapesSwitch>
        <SwitchWrapper>
          {shapes && shapes.map(shape => (
            <ShapeContainer
              key={shape.name}
              onClick={() => setSelectedShape(shape)}
              onMouseEnter={() => setFocusedShape(shape.name)}
              onMouseLeave={() => setFocusedShape("")}
            >
              <ShapeLabel active={shape.name === selectedShape.name ? 1 : undefined}>
                {shape.name}
              </ShapeLabel>
              {focusedShape === shape.name ? (
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
            </ShapeContainer>
          ))}
        </SwitchWrapper>
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
                ref={ref.gummyFolderViewHomepage}
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
            <StatsContainer>
              {selectedShape && selectedShape.stats.map(stat => (
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
                    {[...Array(stat.value)].map((_, i) => 
                      <Icon
                        animate={{ opacity: 1 }}
                        color={tokens.color.accentStrong}
                        filled
                        height={20}
                        initial={{ opacity: 0 }}
                        key={i}
                        name="beaker"
                        transition={{ duration: 0.2 * i }}
                        style={{
                          marginLeft: "5px"
                        }}
                        width={20}
                      />
                    )}
                    {[...Array(5 - stat.value)].map((_, i) => 
                      <Icon
                        animate={{ opacity: 0.5 }}
                        color={tokens.color.accentStrong}
                        height={20}
                        initial={{ opacity: 0 }}
                        key={i}
                        name="beaker"
                        transition={{ duration: (0.2 * i) + (0.2 * stat.value) }}
                        style={{
                          marginLeft: "5px"
                        }}
                        strokeWidth={2}
                        width={20}
                      />
                    )}
                  </div>
                </div>
              ))}
            </StatsContainer>
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
    </Section>
  )
})