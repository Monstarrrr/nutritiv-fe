/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, { forwardRef, useState } from 'react'
import { scrollToElement } from '../../Helpers/scrollToElement';
import { breakpoints, mediaQueries, mediaQuery, tokens } from '../../Helpers/styleTokens'
import useWindowDimensions from '../../Helpers/useWindowDimensions';
import { NutriButton } from '../NutriButton';

const PillButton = styled(motion.button)`
  background: ${tokens.color.accentStrong};
  border: none;
  border-radius: ${tokens.borderRadius.default};
  /* box-shadow: 0 0 6px ${tokens.color.accentStrong}; */
  box-shadow: 0 0 0 2px aqua;
  color: ${tokens.color.contrastDark};
  cursor: pointer;
  font-weight: ${tokens.font.fontWeight.medium};
  outline: none;
  overflow: hidden;
  transition: all .2s ease;
  padding: ${tokens.spacing.sm} ${tokens.spacing.xl};
  position: relative;
  font-size: ${tokens.font.fontSize.sm};
  ${mediaQuery[1]} {
    padding: calc(${tokens.spacing.xl} / 2) ${tokens.spacing.xxl};
  }
  &:before {
    background: #085e63;
    content: "";
    height: 100%;
    position: absolute;
    top: 0;
    transition: all ease .2s;
    width: 50%;
  }
  &:hover {
    box-shadow: 0 0 6px ${tokens.color.accentStrong};
    &:before {
      transform: translateX(200%);
      transition: all ease .2s;
    }
    > span {
      opacity: 1;
      transition: all ease .2s;
    }
    div {
      &::before, &::after {
        transform: translateX(128px);
        transition: all ease .2s;
      }
    }
  }
  > span {
    opacity: 0;
    transition: all ease .2s;
  }
`

const BubblesWrapper = styled.div`
  height: 0;
  width: 0;
`
const BubbleGlobal = css`
  background: #085e63;
  border-radius: 999px;
  content: "";
  position: absolute;
`
const BubblesA = styled.div`
  &::before {
    ${BubbleGlobal}
    height: 9px;
    width: 9px;
    left: 63px;
    top: 27px;
    transition: all ease .2s;
  }
  &::after {
    ${BubbleGlobal}
    height: 10px;
    width: 10px;
    left: 55px;
    top: 9px;
    transition: all ease .2s;
  }
`
const BubblesB = styled.div`
  &::before {
    ${BubbleGlobal}
    height: 7px;
    width: 7px;
    left: 19px;
    top: 21px;
    transition: all ease .2s;
  }
  &::after {
    ${BubbleGlobal}
    height: 6px;
    width: 6px;
    left: 12px;
    top: 10px;
    transition: all ease .2s;
  }
`
const BubblesC = styled.div`
  &::before {
    ${BubbleGlobal}
    height: 8px;
    width: 8px;
    left: 32px;
    top: 15px;
    transition: all ease .2s;
  }
  &::after {
    ${BubbleGlobal}
    height: 11px;
    width: 11px;
    left: 42px;
    top: 20px;
    transition: all ease .2s;
  }
`

export const IcebergSection = forwardRef((props, ref) => {
  const { setIcebergShadow } = props;
  const { width } = useWindowDimensions();
  
  const handleIcebergButtonEnter = () => {
    if(width > breakpoints[2]) {
      setIcebergShadow(true)
      ref.videoRef.current.playbackRate = 2;
    }
  }
  const handleIcebergButtonLeave = () => {
    if(width > breakpoints[2]) {
      setIcebergShadow(false)
      ref.videoRef.current.playbackRate = 0.8;
    }
  }

  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
      `}
    >
      <h2
        css={css`
          margin-bottom: 0;
          text-transform: uppercase;
          ${mediaQueries({
            fontSize: ["64px", "74px", "94px", "104px", "112px"],
            letterSpacing: ["4px", "8px", "12px", "14px", "14px"],
            marginTop: ["59px", "72px", "94px", "114px"],
          })};
        `}
      >
        Nutritiv
      </h2>
      <h3
        css={css`
          font-weight: ${tokens.font.fontWeight.regular};
          line-height: 1.65;
          margin: ${tokens.spacing.sm} 0 0;
          text-transform: uppercase;
          letter-spacing: 4px;
          ${mediaQueries({
            fontSize: ["14px", "20px", "20px", "20px", "20px"],
          })};
        `}
      >
        Get&nbsp;
        <span style={{fontWeight: tokens.font.fontWeight.bold}}>
          superformant
        </span>
        <br/>
        with our&nbsp;
        <span style={{fontWeight: tokens.font.fontWeight.bold}}>
          superments
        </span>
      </h3>
      <div
        onMouseEnter={() => handleIcebergButtonEnter()}
        onMouseLeave={() => handleIcebergButtonLeave()}
        style={{
          borderRadius: tokens.borderRadius.default,
          marginTop: "20px",
        }}
      >
        <PillButton 
          onClick={() => scrollToElement(ref.discoverScrollRef)}
        >
          <BubblesWrapper>
            <BubblesA />
            <BubblesB />
            <BubblesC />
          </BubblesWrapper>
          <span>
            Discover !
          </span>
        </PillButton>
      </div>
    </div>
  )
})