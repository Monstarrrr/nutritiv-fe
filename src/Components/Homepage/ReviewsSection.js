/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { tokens } from '../../Helpers/styleTokens'
import { Icon } from '../Icons/Icon'
import { SectionTitle } from './Homepage'

const GradientBackground = styled.div``
const Comment = styled.p`
  margin-top: ${tokens.spacing.max};
`
const ReviewerName = styled.h4``
const Rating = styled.div``

export const ReviewsSection = () => {
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
          Reviews
      </SectionTitle>
      <div
        css={css`
          align-items: center;
          display: grid;
          width: 1100px;
          & > * {
            grid-row: 1;
            grid-column: 1;
          }
        `}
      >
        <GradientBackground
          css={css`
            background: linear-gradient(
              90deg, 
              ${tokens.color.transparent} 0%, 
              ${tokens.color.secondary} 50%, 
              ${tokens.color.transparent} 100%
            );
            height: 100%;
            max-height: 150px;
            width: 100%;
          `}
        >
        </GradientBackground>
        <img 
          alt="reviewer" 
          css={css`
            height: 180px; // temp
          `}
        />
        <div 
          css={css`
            display: flex;
            justify-content: space-between;
          `}>
          <button
            css={css`
              height: 40px;
              width: 40px; 
            `}
          >
            btn1
          </button>
          <button
            css={css`
              height: 40px;
              width: 40px; 
            `}
          >
            btn2
          </button>
        </div>
      </div>
      <Comment>
        Lorem Ipsum stuff blabla this is my review hello hi comment ça va. Super working with this person i'm just generating random words.
      </Comment>
      <ReviewerName>
        Emily
      </ReviewerName>
      <Rating>
        <Icon
          color={tokens.color.accentStrong}
          filled
          height={20}
          name="beaker"
          width={20}
        />
      </Rating>
    </div>
  )
}