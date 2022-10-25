/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react'
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaQueries } from '../../Helpers/styleTokens';
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
      </SectionTitle>
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