/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: none;
  width: 100%;
  > img {
    max-width: none;
    width: 100%;
  }
`

export const MachineSection = () => {
  return (
    <Container>
      <img alt="machine" src="machine.png" />
    </Container>
  )
}