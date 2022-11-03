/** @jsxImportSource @emotion/react */
import { forwardRef } from 'react'
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
      <SectionTitle
        css={css`
          font-size: 32px;
        `}
      >
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
          max-width: 400px;
          margin: 0 auto;
          padding: 22px 24px;
          ${mediaQueries({
            fontSize: [
              tokens.font.fontSize.xs, 
              tokens.font.fontSize.sm,
            ]
          })}
        `}
      >
        Through a complex process, we at Nutritiv are able to rearange sets of molecules in a specific ways in relation to how they interact with the human body and pack them into a digestible format, ready for human consumption.
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
          src="machine.png" 
        />
      </div>
    </Container>
  )
})