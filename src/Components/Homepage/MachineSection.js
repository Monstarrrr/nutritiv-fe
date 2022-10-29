/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react'
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaQueries, tokens } from '../../Helpers/styleTokens';
import { SectionTitle } from './Homepage';

const Container = styled.div`
  margin-bottom: 40vh;
  max-width: none;
  width: 100%;
  & > h2 {
    max-width: none;
  }
`

export const MachineSection = forwardRef((props, ref) => {
  return (
    <Container>
      <SectionTitle>
        Manufacturing
        <span
          css={css`
            display: block;
            max-width: none;
            padding: 0px 12px;
            ${mediaQueries({
              fontSize: [
                tokens.font.fontSize.xs, 
                tokens.font.fontSize.sm, 
                tokens.font.fontSize.md, 
                tokens.font.fontSize.lg, 
              ],
            })}
          `}
        >
          the future of complements
        </span>
      </SectionTitle>
      <span
        css={css`
          color: #c5c5c5;
          display: block;
          font-size: 14px;
          max-width: none;
          padding: 22px 24px;
        `}
      >
        We are lorem ipsum du stuff et tout là something some words sample textsomething some words sample text
      </span>
      <div
        css={css`
          display: flex;
          justify-content: center;
          max-width: none;
        `}
      >
        <img 
          alt="machine" 
          css={css`
            max-width: none;
            width: 100%;
            ${mediaQueries({
              width: [
                "220vw", "180vw", "150vw", "130vw", "100vw"
              ]
            })}
          `}
          ref={ref.machineScrollRef}
          src="machine.png" 
        />
      </div>
    </Container>
  )
})