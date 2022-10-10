import styled from '@emotion/styled'
import React from 'react'
import { SectionTitle } from './Homepage'

const Container = styled.div`
  margin-bottom: 200px; // temp
`
const Email = styled.div``
const Address = styled.div``

export const ContactSection = () => {
  return (
    <Container>
      <SectionTitle>
          Contact
      </SectionTitle>
      <div>
        <Email>
          contact@nutritivshop.com
        </Email>
        <Address>
          58 Howard St, San Francisco, CA 941
        </Address>
      </div>
    </Container>
  )
}