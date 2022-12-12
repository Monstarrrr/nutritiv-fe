/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { tokens } from '../../Helpers/styleTokens'
import { Icon } from '../Icons/Icon'
import { SectionTitle } from './Homepage'

const GradientBackground = styled.div``
const Comment = styled.p`
  margin-top: ${tokens.spacing.lg};
`
const ReviewerName = styled.h4`
  font-size: ${tokens.font.fontSize.md};
`
const Rating = styled.div``

const reviewers = [
  {
    name: "Emily D",
    comment: "C'est sympas mais pourquoi il y a une dent sur la page d'accueil?",
    rating: 4,
    link: "/reviewer-1.jpg"
  },
  {
    name: "Monsieur Yoann D.",
    comment: "Mhm. Ok. Mais il est où le code ?",
    rating: 1,
    link: "/reviewer-2.jpg"
  },
  {
    name: "Monstar",
    comment: "Un design inégalé, une expérience utilisateur digne des plus grand noms de la codification, ce site coche toutes les cases.",
    rating: 5,
    link: "/reviewer-3.jpg"
  },
];

export const ReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const goPrevious = () => {
    setActiveIndex(prevActiveIndex => (
      prevActiveIndex === 0 ? (reviewers.length - 1) : prevActiveIndex - 1
    ))
  }
  const goNext = () => {
    setActiveIndex(prevActiveIndex => (
      prevActiveIndex === (reviewers.length - 1) ? 0 : prevActiveIndex + 1
    ))
  }

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
        {reviewers.map((reviewer, i) => (
          i === activeIndex && (
            <img 
              alt={reviewer.name}
              src={reviewer.link}
              key={i}
              css={css`
                box-shadow: 0 0 14px 0px #000;
                border: 6px solid ${tokens.color.accentWeak};
                border-radius: 999px;
                height: 180px; // temp
                position: relative;
                left: 50%;
                transform: translate(-50%);
              `}
            />
          )
        ))}
        <div 
          css={css`
            display: flex;
            justify-content: space-between;
          `}>
          <button
            onClick={goPrevious}
            css={css`
              height: 40px;
              width: 40px; 
            `}
          >
            btn1
          </button>
          <pre>
            {JSON.stringify(activeIndex, null, 2)}
          </pre>
          <button
            onClick={goNext}
            css={css`
              height: 40px;
              width: 40px; 
            `}
          >
            btn2
          </button>
        </div>
      </div>
      {reviewers.map((reviewer, i) => (
        i === activeIndex && (
          <React.Fragment key={i}>
            <ReviewerName>
              {reviewer.name}
            </ReviewerName>
            <Comment>
              <Icon 
                color={tokens.color.secondary}
                name="quote"
                filled
                height={40}
                width={40}
              />
              {reviewer.comment}
              <Icon 
                color={tokens.color.secondary}
                name="quote"
                filled
                height={40}
                width={40}
                style={{ transform: "rotate(180deg)" }}
              />
            </Comment>
            <Rating>
              {[...Array(reviewer.rating)].map((_, i) => (
                <Icon
                  color={tokens.color.secondary}
                  filled
                  height={20}
                  key={i}
                  name="star"
                  width={20}
                />
              ))}
              {[...Array(5 - reviewer.rating)].map((_, i) => (
                <Icon
                  color={tokens.color.secondary}
                  height={20}
                  key={i}
                  name="star"
                  strokeWidth={2}
                  width={20}
                />
              ))}
            </Rating>
          </React.Fragment>
        )
      ))}
    </div>
  )
}