/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react'
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { tokens } from '../../Helpers/styleTokens';
import { Icon } from '../Icons/Icon';
import { NutriButton } from '../NutriButton';

const SectionTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 52px;
`
const SectionContent = styled.div``
const Card = styled.div``
const CardContent = styled.div``
const CardSuperment = styled.div``
const CardDescription = styled.div``
const CardButton = styled.div``
const ShapesSwitch = styled.div``

const pillsStats = [
  { name: "Strength",   value: 5 },
  { name: "Duration",   value: 3 },
  { name: "Peak Speed", value: 5 }
]
const gummiesStats = [
  { name: "Strength",   value: 5 },
  { name: "Duration",   value: 3 },
  { name: "Peak Speed", value: 5 }
]

export const ShapesSection = forwardRef((props, ref) => {
  console.log('# ref :', ref)
  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        padding-right: 6px;
        margin-bottom: 600px; // temp
        margin-top: calc(40vh - 7vw);
      `}
    >
      <SectionTitle>
          Shapes
      </SectionTitle>
      
      <ShapesSwitch>
        <div>
        
        </div>
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
            background: #191c38;
            border-radius: ${tokens.borderRadius.xl};
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
              <div 
                ref={ref.canvasView2} 
                style={{ 
                  display: "inline-block", 
                  height: "300px", 
                  width: "300px" 
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
              Capsule
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
                  &:nth-last-child(1) {
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
              {pillsStats.map((stat, i) => (
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
              Capsules are a great shape to do certain stuff lorem ipsum.
            </div>
          </CardDescription>
          
          <CardButton
            css={css`
              width: 270px;
            `}
          >
            <NutriButton 
              label="Shop Pills"
              type="filled"
            />
          </CardButton>
        </CardContent>
      </SectionContent>
    </div>
  )
})