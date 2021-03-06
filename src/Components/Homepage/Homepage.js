/** @jsxImportSource @emotion/react */
import React from 'react';
import { GradientBackground } from '../GradientBackground';
import styled from '@emotion/styled';
import { tokens } from '../../Helpers/styleTokens';

export const Homepage = () => {
  
  // Styles
  const ContentContainer = styled.div`
    left: 0;
    margin: 0 auto;
    max-width: ${tokens.maxWidth.xl};
    position: absolute;
    right: 0;
    top: ${tokens.navHeight};
  `
  const VideoContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 400px;
  `
  
  return (
    <>
      <ContentContainer>
        <h2>
          Homepage
        </h2>

      </ContentContainer>
      
      <GradientBackground
        firstColor="secondary"
        secondColor="primary"
        initial={{
          "backgroundPosition": "100% 0px",
        }}
        exit={{
          "backgroundPosition": "100% -1250px",
        }}
        transition={{ duration: 0.5 }}
      />
      <VideoContainer>
        <video width="100%" height="100%" autoPlay loop muted playsInline>
          <source src="/video_iceberg.webm" type="video/webm" />
        </video>
      </VideoContainer>
      
      {/* temp
        <video autoPlay loop width="1080" height="1080">
          <source src="/test.webm" type="video/webm" />
          <source src="video.mov" type="video/quicktime" />
          Couldn't load the video on your device.
        </video> 
      */}
      
      {/* THREE JS TESTING */}
      {/* <div style={{
          background: "transparent", 
          height: "500px", 
          width: "500px"
      }}>
        <Canvas shadows>
          <Scene type="pill" />
        </Canvas>
      </div> */}
    </>
  )
}