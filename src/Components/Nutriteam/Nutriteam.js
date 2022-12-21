/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef } from 'react'
import { mediaQueries, mediaQuery, tokens } from '../../Helpers/styleTokens';
import { currentYear } from '../Footer/Footer';
import { SectionTitle } from '../Homepage/Homepage';

const Test = styled.div`
  display: inline-block; 
  height: 300px;
  width: 270px;
`

const Description = styled.p`
  font-size: ${tokens.font.fontSize.sm};
  max-width: 450px;
  ${mediaQuery[2]} {
    font-size: ${tokens.font.fontSize.md};
  }
`

const Illustration = styled.img`
  opacity: 0.92;
  max-width: 800px;
  padding-top: ${tokens.spacing.xxl};
  width: 90%;
  ${mediaQuery[2]} {
    padding-top: 0;
  }
`

const AboutUs = forwardRef((props, ref) => {
  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        max-width: 100vw;
        /* min-height: calc(100vh - 105px); */
        padding: 0 ${tokens.spacing.lg};
        text-align: center;
        ${mediaQueries({
          minHeight: [
            "calc(100vh - 72px)", 
            "calc(100vh - 72px)", 
            "calc(100vh - 100px)"
          ]
        })}
      `}
    >
      {/* Debugging 3D Models */}
      {/* <div
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
        <Test ref={ref.capsuleWaterView} />
      </div> */}

      <SectionTitle
        css={css`
          margin-top: 100px;
          margin-bottom: 38px;
        `}
      >
        The Nutriteam
      </SectionTitle>
      <Description>
          Our team is a group of passionate scientists and designers from around the world.
          <br /> 
          We all come from similar yet different backgrounds and gathered to make what is today known as the only superments company.
          <br/> 
          Since {currentYear + 20} we've kept evolving out range of products and will continue doing so for many years to come.
      </Description>
      <Illustration 
        alt="nutriteam illustration"
        src="/nutriteam.png"
      />
    </div>
  )
});

export default AboutUs;