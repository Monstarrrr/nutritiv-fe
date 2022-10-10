/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { forwardRef, useState } from 'react'
import { scrollToElement } from '../../Helpers/scrollToElement';
import { breakpoints, mediaQueries, tokens } from '../../Helpers/styleTokens'
import useWindowDimensions from '../../Helpers/useWindowDimensions';
import { NutriButton } from '../NutriButton';

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
      
      {/* <div ref={refs.canvasView1} style={{ display: "inline-block", height: "100px", width: "100px" }} /> 
      <div ref={refs.canvasView2} style={{ display: "inline-block", height: "100px", width: "100px" }} />  */}
      
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
        <NutriButton 
          label="Discover"
          type="filled"
          onClick={() => scrollToElement(ref.discoverScrollRef)}
        />
      </div>
    </div>
  )
})