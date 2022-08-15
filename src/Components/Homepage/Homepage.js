/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { tokens } from '../../Helpers/styleTokens';
import { useLocation } from 'react-router-dom';
import { NutriButton } from '../NutriButton';

const HomepageContentContainer = styled.div`
  margin: 0 auto;
  max-width: ${tokens.maxWidth.xl};
  min-height: 100vh;
  overflow: auto;
  padding-top: ${tokens.navHeight.lg};
  position: relative;
  text-align: center;
  z-index: 1;
`
const VideoContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100vh - 650px);
  z-index: 0;
`

const Video = styled(motion.video)`
  filter: blur(1px) opacity(0.75);
`

export const Homepage = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash
    // Check if there is a hash and if an element with that id exists
    const el = hash && document.getElementById(hash.slice(1))
    if (el) {
      el.scrollIntoView({behavior: "smooth"})
    }
  }, [location.hash])
  
  return (
    <>
      <HomepageContentContainer>
        <h2 
          style={{
            fontSize: "88px",
            letterSpacing: "14px",
            marginTop: "120px",
            marginBottom: 0,
            textTransform: "uppercase",
          }}
        >
          Nutritiv
        </h2>
        <h3
          style={{
            fontSize: tokens.font.fontSize.md,
            fontWeight: tokens.font.fontWeight.regular,
            letterSpacing: '4px',
            lineHeight: "1.65",
            textTransform: "uppercase",
          }}
        >
          Get&nbsp;
          <span style={{fontWeight: tokens.font.fontWeight.medium}}>superformant</span>
          <br/>
          with our&nbsp;
          <span style={{fontWeight: tokens.font.fontWeight.medium}}>superments</span>
        </h3>
        <NutriButton 
          label="Shop Now"
          style={{
            marginTop: "20px",
          }}
          type="filled"
        />
      </HomepageContentContainer>
      <VideoContainer
        id="iceberg-container"
      >
        <Video
          autoPlay
          id="iceberg-video"
          loop
          muted
          playsInline
          height="100%"
          width="100%"
        >
          <source src="/video_iceberg.webm" type="video/webm" />
        </Video>
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