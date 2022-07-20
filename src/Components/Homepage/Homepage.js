/** @jsxImportSource @emotion/react */
import React from 'react';
import { motion } from 'framer-motion';
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import NutriButton from '../Button/NutriButton';

export const Homepage = () => {
  
  const Wrapper = styled(motion.div)`
    background-image: linear-gradient(
      180deg, 
      rgba(20,122,165,1) 0px,  
      rgba(20,122,165,1) 650px, 
      rgba(2,0,71,1) 1250px
    );
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  `
  
  return (
    <Wrapper
      initial={{
        "background-position": "100% 0px",
      }}
      exit={{
        "background-position": "100% -1250px",
      }}
      transition={{ duration: 1 }}
    >
      <div
        css={css`
          position: absolute;
          left: 0;
          right: 0;
          top: 400px;
        `}
      >
        <video width="100%" height="100%" autoPlay loop muted playsInline>
          <source src="/video_iceberg.webm" type="video/webm" />
        </video>
      </div>
      
      <NutriButton label="Hey" type="hallow" rounded />
      
      {/* <video autoPlay loop width="1080" height="1080">
        <source src="/test.webm" type="video/webm" />
        <source src="video.mov" type="video/quicktime" />
        Couldn't load the video on your device.
      </video> */}
      
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
    </Wrapper>
  )
}