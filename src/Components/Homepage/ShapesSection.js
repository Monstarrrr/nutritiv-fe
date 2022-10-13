/** @jsxImportSource @emotion/react */
import React, { forwardRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { tokens } from '../../Helpers/styleTokens';
import { Icon } from '../Icons/Icon';
import { NutriButton } from '../NutriButton';
import { SectionTitle } from './Homepage';

const SectionContent = styled.div``
const Card = styled.div``
const CardContent = styled.div``
const CardSuperment = styled.div``
const CardDescription = styled.div``
const CardButton = styled.div``
const ShapesSwitch = styled.div``

const capsulesStats = [
  { name: "Strength",   value: 5 },
  { name: "Duration",   value: 3 },
  { name: "Peak Speed", value: 5 }
]
const gummiesStats = [
  { name: "Strength",   value: 5 },
  { name: "Duration",   value: 3 },
  { name: "Peak Speed", value: 5 }
]
const shapes = ['Capsule', 'Gummy'];

export const ShapesSection = forwardRef(({props}, ref) => {
  const [focusedShape, setFocusedShape] = useState(null);
  const [selectedShape, setSelectedShape] = useState(shapes[0]);
  
  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        padding-right: 6px;
        margin-bottom: 300px; // temp
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
          {shapes.map(shape => (
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
              key={shape}
              onClick={() => setSelectedShape(shape)}
              onMouseEnter={() => setFocusedShape(shape)}
              onMouseLeave={() => setFocusedShape("")}
            >
              <span
                css={css`
                  bottom: 0;
                  color: ${shape === selectedShape ? 
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
                {shape}
              </span>
              {/* {focusedShape === shape ? (
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
                />) : null
              }
              {selectedShape === shape ? (
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
                />) : null
              } */}
            </li>
          ))}
        </ul>
      </ShapesSwitch>
      
      <SectionContent
        css={css`
          margin-top: ${tokens.spacing.max};
          /* perspective: 2000px;
          perspective-origin: center; */
          position: relative;
        `}
        ref={ref.shapesScrollRef}
      >
        <Card
          css={css`
            background: ${tokens.color.primary};
            background: radial-gradient(circle, ${tokens.color.secondaryTransparent} 0%, ${tokens.color.primary} 100%);
            border-radius: ${tokens.borderRadius.xl};
            box-shadow: ${tokens.color.accentWeak} 0px 0px 10px 2px;
            height: 300px;
            position: relative;
            /* transform: rotateX(27deg) rotateY(0deg);
            transform-style: preserve-3d; */
            width: 812px;
            z-index: -1;
            /* &:before {
              background: #072564;
              border-radius: ${tokens.borderRadius.xl};
              content: "";
              position: absolute;
              inset: 0;
              transform: translateZ(-190px);
            }
            &:after {
              background: #051255;
              border-radius: ${tokens.borderRadius.xl};
              content: "";
              position: absolute;
              inset: 0;
              transform: translateZ(-380px);
            } */
          `}
        />
        
        <CardContent
          css={css`
            align-items: center;
            display: flex;
            position: absolute;
            inset: 0;
          `}
        >
          <CardSuperment
            css={css`
              position: relative;
              width: 270px;
            `}
          >
            <div
              css={css`
                background: transparent;
                position: absolute;
                left: 0px;
                height: 300px;
                width: 270px;
                bottom: 50%;
                transform: translateY(50%);
              `}
            >
              {/* <Canvas shadows>
                <Scene 
                  type="pill"
                  homepageCard
                />
              </Canvas> */}
              {/* <div
                ref={ref.gummyPiViewHomepage}
                style={{ 
                  display: "inline-block", 
                  height: "300px", 
                  width: "270px"
                }}
              /> */}
              <div
                ref={ref.capsuleWaterViewHomepage}
                style={{ 
                  display: "inline-block", 
                  height: "300px", 
                  width: "270px"
                }}
              />
            </div>
          </CardSuperment>
          
          <CardDescription
            css={css`
              padding-left: 20px;
              text-align: left;
              width: 270px;
            `}
          >
            <h4
              css={css`
                margin-top: 0;
                margin-bottom: ${tokens.spacing.xl};
                font-size: ${tokens.font.fontSize.lg};
                font-weight: ${tokens.font.fontWeight.medium};
              `}
            >
              Gummy
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
              {capsulesStats.map((stat, i) => (
                <div
                  css={css`
                    display: flex;
                    font-weight: ${tokens.font.fontWeight.regular};
                  `}
                  key={i}
                >
                  <label css={css`margin-right: ${tokens.spacing.md};`}>
                    {stat.name}
                  </label>
                  <div>
                    {[...Array(stat.value)].map((_, i) => 
                      <Icon
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
                        color={tokens.color.accentStrong}
                        height={20}
                        key={i}
                        name="beaker"
                        style={{
                          marginLeft: "5px",
                          opacity: 0.5
                        }}
                        strokeWidth={2}
                        width={20}
                      />
                    )}
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
              Gummies are great for those who want the highest performance available.
            </div>
          </CardDescription>
          
          <CardButton
            css={css`
              width: 270px;
            `}
          >
            <NutriButton 
              label="Shop Gummies"
              type="filled"
            />
          </CardButton>
        </CardContent>
      </SectionContent>
    </div>
  )
})