/** @jsxImportSource @emotion/react */
import React, { forwardRef, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { breakpoints, mediaQuery, tokens } from '../../Helpers/styleTokens';
import { Icon } from '../Icons/Icon';
import { NutriButton } from '../NutriButton';
import { ScrollRef, SectionTitle } from './Homepage';
import useWindowDimensions from '../../Helpers/useWindowDimensions';


// SECTION
const Section = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 40vh; // temp
  position: relative;
`
const SectionContent = styled.div`
  z-index: 0;
  ${mediaQuery[2]} {
    margin-top: ${tokens.spacing.max};
    perspective: 2000px;
    perspective-origin: center;
    position: relative;  
  }
`

// SWITCH
const ShapesSwitch = styled.div`
  position: relative;
  top: 238px;
  width: 248px;
  z-index: 1;
  ${mediaQuery[2]} {
    top: 0px;
  }
`
const SwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  ${mediaQuery[2]} {
    align-items: center;
    background: ${tokens.color.accentWeak};
    border-radius: ${tokens.borderRadius.lg};
    box-shadow: 0px 0px 10px 1px ${tokens.color.contrastDark};
    justify-content: initial;
    padding: 4px;
    width: fit-content;
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
  padding: 8px 28px;
  position: relative;
  ${mediaQuery[2]} {
    padding: ${tokens.spacing.md} ${tokens.spacing.xxl};
  }
`
const ShapeLabel = styled.span`
  bottom: 0;
  color: ${props => props.active ? tokens.color.contrastDark : tokens.color.contrastLight};
  left: '4px';
  font-size: ${tokens.font.fontSize.xs};
  font-weight: ${tokens.font.fontWeight.medium};
  opacity: ${props => props.active ? 1 : 0.5};
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
  flex-direction: column;
  inset: 0;
  margin-bottom: 30px;
  position: relative;
  ${mediaQuery[2]} {
    flex-direction: row;
    margin-bottom: 0;
    position: absolute;
    transform: rotateX(20deg) rotateY(0deg);
  }
`

const CardSupermentContainer = styled.div`
  background: radial-gradient(circle, ${tokens.color.primary} 0%, ${tokens.color.secondaryTransparent} 100%);
  border-top-left-radius: 999px;
  border-top-right-radius: 999px;
  position: relative;
  width: 248px;
  ${mediaQuery[2]} {
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    width: 270px;
  }
`
const CardSuperment = styled.div`
  background: transparent;
  height: 250px;
  position: relative;
  margin: auto;
  width: 222px;
  ${mediaQuery[2]} {
    bottom: 50%;
    height: 300px;
    left: 0px;
    position: absolute;
    transform: translateY(50%);
    width: 270px;
  }
`
const SupermentAll = css`
  position: relative;
  height: 270px;
  width: 222px;
  ${mediaQuery[2]} {
    height: 300px;
    width: 270px;
  }
`
const SupermentA = styled(motion.div)`
  display: ${props => props.type === "Capsule" ? "inline-block" : "none"};
  top: -70px;
  ${SupermentAll};
  ${mediaQuery[2]} {
    top: -78px;
  }
  `
const SupermentB = styled.div` 
  display: ${props => props.type === "Gummy" ? "inline-block" : "none"};
  top: -54px;
  ${SupermentAll};
  ${mediaQuery[2]} {
    top: -62px;
  }
`

const CardInfo = styled.div`
  text-align: center;
  width: 270px;
  ${mediaQuery[2]} {  
    padding-left: 20px;
    text-align: left;
    user-select: none;
    width: 270px;
  }
`
const CardTitle = styled(motion.h4)`
  display: none;
  ${mediaQuery[2]} {
    display: inline-block;
    margin-top: 0;
    margin-bottom: ${tokens.spacing.xl};
    font-size: ${tokens.font.fontSize.lg};
    font-weight: ${tokens.font.fontWeight.medium};
  }
`
const StatsContainer = styled.div`
  align-items: center;
  background: radial-gradient(circle, rgb(0, 28, 71) 0%, ${tokens.color.secondaryTransparent} 100%);
  border-bottom-left-radius: 999px;
  border-bottom-right-radius: 999px;
  box-shadow: 0 0 100px -20px black;
  display: flex;
  font-weight: ${tokens.font.fontWeight.light};
  margin: 0 auto;
  padding-bottom: 38px;
  position: relative;
  flex-direction: column;
  width: 252px;
  
  ${mediaQuery[2]} {
    align-items: start;
    background: transparent;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    box-shadow: none;
    padding-bottom: 0px;
    width: auto;
  }
  > div {
    align-items: center;
    display: flex;
    margin-bottom: ${tokens.spacing.sm};
    ${mediaQuery[2]} {
      flex-direction: row;
    }
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
const StatContainer = styled.div`
  display: flex;
  font-weight: ${tokens.font.fontWeight.regular};
  flex-direction: column;
  margin-bottom: 0;
  margin-top: 16px;
  ${mediaQuery[2]} {
    margin-bottom: 0;
    margin-top: 0;  
  }
`
const StatLabel = styled.div`
  margin-right: 0;
  margin-bottom: 6px;
  ${mediaQuery[2]} {
    margin-right: ${tokens.spacing.md};
  }
`
const CardDescription = styled(motion.div)`
  margin-bottom: ${tokens.spacing.xl};
  margin-top: ${tokens.spacing.xl};
  font-weight: ${tokens.font.fontWeight.medium};
  ${mediaQuery[2]} {
    margin-bottom: 0;
  }
`
const CardButton = styled.div``

const shapes = [
  {
    name: 'Capsule',
    stats: [
      { name: "Strength",   value: 5 },
      { name: "Duration",   value: 3 },
      { name: "Peak Speed", value: 5 }
    ],
    description: "For those who want the highest performance available, at the cost of a shorter duration of the effect.",
  }, 
  {
    name: 'Gummy',
    stats: [
      { name: "Strength",   value: 4 },
      { name: "Duration",   value: 5 },
      { name: "Peak Speed", value: 3 }    
    ],
    description: "For those who want a lasting effect, at the cost of its strength and the time it takes for it to set in.",
  }, 
];

export const ShapesSection = forwardRef(({props}, ref) => {
  const [focusedShape, setFocusedShape] = useState(null);
  const [selectedShape, setSelectedShape] = useState(shapes[0]);
  const [isMobile, setIsMobile] = useState(true);
  const { width } = useWindowDimensions();
  
  useEffect(() => {
    if(width > breakpoints[2]) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [width]);
  
  const handleSelectedShape = (shape) => {
    const timer = setTimeout(() => {
      setSelectedShape(prevState => ({...prevState, ...shape}));  
    }, 1)
    
    setSelectedShape(prevState => (
      {
        ...prevState,
        name: shape.name,
        stats: [
          {...prevState.stats[0], value: null},
          {...prevState.stats[1], value: null},
          {...prevState.stats[2], value: null},
        ]
      }
    ))

    return () => clearTimeout(timer)
  }

  const titleAnimation = {
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    },
    hide: {
      opacity: 0,
      x: -20,
    }
  }
  
  return (
    <Section>
      <ScrollRef ref={ref.shapesScrollRef}/>
      <SectionTitle>
          Shapes
      </SectionTitle>
      
      <ShapesSwitch>
        <SwitchWrapper>
          {shapes && shapes.map(shape => (
            <ShapeContainer
              key={shape.name}
              onClick={() => handleSelectedShape(shape)}
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
                      borderTopLeftRadius: isMobile ? (
                        selectedShape.name === "Capsule" ? tokens.borderRadius.lg : 0
                      ) : (
                        tokens.borderRadius.lg
                      ),
                      borderTopRightRadius: isMobile ? (
                        selectedShape.name === "Gummy" ? tokens.borderRadius.lg : 0
                      ) : (
                        tokens.borderRadius.lg
                      ),
                      bottom: 0,
                      boxShadow: isMobile ? `0 0 8px -1px ${tokens.color.accentStrong}` : "none",
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
              <SupermentA
                ref={ref.capsuleWaterViewHomepage}
                type={selectedShape.name} 
                />
              <SupermentB
                ref={ref.gummyPiViewHomepage}
                type={selectedShape.name} 
              />
            </CardSuperment>
          </CardSupermentContainer>
          
          <CardInfo>
            <AnimatePresence exitBeforeEnter>
              {selectedShape && (
                <CardTitle 
                  animate={{opacity: 1, x: 0}}
                  initial={{opacity: 0, x: -12}}
                  exit={{opacity: 0, x: 12}}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  key={selectedShape.name}
                >
                  {selectedShape.name}
                </CardTitle>
              )}
            </AnimatePresence>
            <StatsContainer>
              {selectedShape && selectedShape.stats.map(stat => (
                <StatContainer key={stat.name}>
                  <StatLabel>
                    {stat.name}
                  </StatLabel>
                  <div style={{height: "24px"}}>
                    {stat.value && [...Array(stat.value)].map((_, i) => 
                      <Icon
                        animate={{ opacity: 1 }}
                        color={tokens.color.accentStrong}
                        filled
                        height={20}
                        initial={{ opacity: 0 }}
                        key={i}
                        name="beaker"
                        transition={{ duration: 0.25 * i }}
                        style={{
                          marginLeft: "5px"
                        }}
                        width={20}
                      />
                    )}
                    {stat.value && [...Array(5 - stat.value)].map((_, i) => 
                      <Icon
                        animate={{ opacity: 0.5 }}
                        color={tokens.color.accentStrong}
                        height={20}
                        initial={{ opacity: 0 }}
                        key={i}
                        name="beaker"
                        transition={{ duration: (0.25 * i) + (0.25 * stat.value) }}
                        style={{
                          marginLeft: "5px"
                        }}
                        strokeWidth={2}
                        width={20}
                      />
                    )}
                  </div>
                </StatContainer>
              ))}
            </StatsContainer>
            <AnimatePresence exitBeforeEnter>
              {selectedShape.description && (
                <CardDescription
                  animate={{opacity: 1, x: 0, y: 0}}
                  initial={{
                    opacity: 0, 
                    x: isMobile ? 0 : -6,
                    y: isMobile ? -6 : 0,
                  }}
                  exit={{
                    opacity: 0, 
                    x: isMobile ? 0 : 6,
                    y: isMobile ? 6 : 0
                  }}
                  transition={{
                    duration: isMobile ? 0.24 : 0.3,
                    ease: "easeOut",
                  }}
                  key={selectedShape.description}
                >
                  {selectedShape.description}  
                </CardDescription>
              )}
            </AnimatePresence>
          </CardInfo>
          
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