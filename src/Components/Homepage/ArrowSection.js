/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { forwardRef, useEffect, useState } from 'react'
import { scrollToElement } from '../../Helpers/scrollToElement'
import { mediaQueries, tokens } from '../../Helpers/styleTokens'
import { Icon } from '../Icons/Icon'

const ArrowSide = styled.div``

export const ArrowSection = forwardRef((props, ref) => {
  const [fillDelay, setFillDelay] = useState(false)
  const [arrowHovered, setArrowHovered] = useState(false)
  
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
  
  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        margin-top: 32vw;
        margin-bottom: 40vh;
      `}
    >
      <h4
        css={css`
          margin-right: 20px;
          margin-left: 20px;
          font-size: ${tokens.font.fontSize.md};
          font-weight: ${tokens.font.fontWeight.bold};
          line-height: 1.5;
          ${mediaQueries({
            paddingRight: [
              "8px", "10px", "15px", "26px"
            ],
            marginTop: [
              "98vw", "80vw", "44vw", "32vw"
            ],
            maxWidth: [
              "480px",
            ]
          })}
        `}
        ref={ref.discoverScrollRef}
      >
        The human body uses only 20% of its molecules potential.<br/>
        Our superments are exclusive supplements which unlock their hidden potential.<br/>
      </h4>
      <ArrowSide
        css={css`
          margin-top: 7vw;
          ${mediaQueries({
            paddingRight: [
              "8px", "8px", "10px", "12px"
            ],
            marginTop: [
              "14vw", "8vw", "6vw", "7vw"
            ]
          })}
        `}
      >
        <div
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
              box-shadow: 0 0 10px -1px ${tokens.color.accentStrong};
              border: 2px solid ${tokens.color.accentStrong};
            }
          `}
        >
          <Icon
            name="arrowDown"
            color={tokens.color.contrastLight}
            resizeDefault="-1 0 25 25"
            strokeWidth={2}
            height={25}
            width={25}
          />
        </div>
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
      </ArrowSide>
    </div>
  )
})