/** @jsxImportSource @emotion/react */
import { motion } from 'framer-motion';
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { mediaQueries, tokens } from '../../Helpers/styleTokens'
import { SectionTitle } from './Homepage'

const Container = styled.div`
  max-width: none;
  overflow: hidden;
  position: relative;
  & > * {
    margin: 0 auto;
  }
`
const BottomGradient = styled.div`
  background: ${tokens.color.accentTransparent};
  bottom: -160px;
  filter: blur(370px);
  position: absolute;
  max-width: none;
  height: 200px;
  width: 100%;
`
const Email = styled.div``
const Address = styled.div``

export const ContactSection = () => {
  return (
    <Container>
      <SectionTitle>
          Contact
      </SectionTitle>
      <div
        css={css`
          margin: ${tokens.spacing.max} auto;
          padding: 0 ${tokens.spacing.lg};
          font-size: ${tokens.font.fontSize.md};
        `}
      >
        <Email>
          contact.nutriteam@gmail.com
        </Email>
        <Address>
          Champ de Mars, 5 Av. Anatole France, 75007 Paris
        </Address>
      </div>
      {/* <ExcitingSvg /> */}
      <div 
        css={css`
          display: flex;
          justify-content: center;
          padding-top: 40px;
          position: relative;
          z-index: -1;
          & > img {
            ${mediaQueries({
              marginBottom: ["-717px", "-690px", "-660px", "-645px"]
            })}
          }
        `}
      >
        <motion.img 
          alt="earth-wireframe"
          animate={{ rotate: 360 }}
          css={css`
            opacity: 0.6;
            position: absolute;
            z-index: 1;
          `}
          src="/earth-wireframe.png"
          transition={{ ease: "linear", duration: 200, repeat: Infinity }}
        />
        <motion.img 
          alt="earth-center"
          animate={{ rotate: -360 }}
          css={css`
            opacity: 0.4;
            position: absolute;
            z-index: 0;
          `}
          src="/earth-center.png" 
          transition={{ ease: "linear", duration: 400, repeat: Infinity }}
        /> 
        <img 
          alt="earth-center"
          css={css`visibility: hidden;`}
          src="/earth-center.png" 
        /> 
      </div>
      <BottomGradient />
    </Container>
  )
}