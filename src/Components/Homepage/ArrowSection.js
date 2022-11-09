/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { forwardRef, useEffect, useState } from 'react'
import { scrollToElement } from '../../Helpers/scrollToElement'
import { breakpoints, mediaQueries, mediaQuery, tokens } from '../../Helpers/styleTokens'
import useWindowDimensions from '../../Helpers/useWindowDimensions'
import { Icon } from '../Icons/Icon'
import { motion } from 'framer-motion';

const ArrowSide = styled.div``

export const ArrowSection = forwardRef((props, ref) => {
  const [fillDelay, setFillDelay] = useState(false)
  const [arrowHovered, setArrowHovered] = useState(false)
  const { width } = useWindowDimensions();

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
  
  const textVariants = {
    "onscreen": {
      opacity: 1,
      y: 0,
    },
  }

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
      <motion.h4
        css={css`
          margin-right: 20px;
          margin-left: 20px;
          font-size: ${tokens.font.fontSize.md};
          font-weight: ${tokens.font.fontWeight.bold};
          line-height: 1.5;
          ${mediaQueries({
            paddingRight: [
              "0px", "0px", "0px", "26px"
            ],
            marginTop: [
              "98vw", "80vw", "74vw", "32vw"
            ],
            marginRight: [
              "50px", "20px", "20px", "20px"
            ],
            marginLeft: [
              "50px", "20px", "20px", "20px"
            ],
            maxWidth: [
              "480px",
            ]
          })}
        `}
        initial={{ 
          opacity: 0, 
          y: -30,
        }}
        transition={{
          duration: 0.4
        }}
        ref={ref.discoverScrollRef}
        variants={textVariants}
        viewport={{ once: false, amount: 0.4 }}
        whileInView="onscreen"
      >
        The human body uses only 20% of its molecules potential.<br/>
        Our superments are exclusive supplements which unlock their hidden potential.<br/>
      </motion.h4>
      <ArrowSide
        css={css`
          margin-top: 7vw;
          ${mediaQueries({
            paddingRight: [
              "0px", "0px", "0px", "12px"
            ],
            marginTop: [
              "14vw", "8vw", "6vw", "7vw"
            ]
          })}
        `}
      >
        <motion.div
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
              ${mediaQuery[2]} {
                box-shadow: 0 0 10px -1px ${tokens.color.accentStrong};
                border: 2px solid ${tokens.color.accentStrong};
              }
            }
          `}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.1}}
          variants={textVariants}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="onscreen"
        >
          <Icon
            name="arrowDown"
            color={tokens.color.contrastLight}
            resizeDefault="-1 0 25 25"
            strokeWidth={2}
            height={25}
            width={25}
          />
        </motion.div>
        {width > breakpoints[2] && (
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
        )}
      </ArrowSide>
    </div>
  )
})