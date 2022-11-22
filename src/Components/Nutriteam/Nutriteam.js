/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef } from 'react'

const Test = styled.div`
  display: inline-block; 
  height: 300px;
  width: 270px;
`

const AboutUs = forwardRef((props, ref) => {
  return (
    <div>
      <div
        css={css`display: flex; flex-direction: column;`}
      >
        <Test ref={ref.gummySolvalitisViewHomepage} />
        <Test ref={ref.gummyNodemodulesView} />
        <Test ref={ref.gummyAmethystExtractView} />
        <Test ref={ref.gummyAbsoriteView} />
        <Test ref={ref.gummyBaguettoidsView} />
        <Test ref={ref.gummyBicepstineView} />
        <Test ref={ref.gummyJumpamineView} />
        <Test ref={ref.gummyLumositeView} />
        <Test ref={ref.gummyMagmaliteView} />
        <Test ref={ref.gummyNotavirusiteView} />
        <Test ref={ref.gummyNucleateView} />
        <Test ref={ref.gummyTitaniumView} />
        <Test ref={ref.gummySerylView} />
        <Test ref={ref.gummyWolveriteView} />
      </div>
      <h2>
        The team
      </h2>
      <h2>
        The team
      </h2>
      <h2>
        The team
      </h2>
      <h2>
        The team
      </h2>
      <h2>
        The team
      </h2>
      <h2>
        The team
      </h2>
      <h2>
        The team
      </h2>
      <h2>
        The team
      </h2>
    </div>
  )
});

export default AboutUs;