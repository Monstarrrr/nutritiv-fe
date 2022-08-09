/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../Helpers/styleTokens';
import { useLocation } from 'react-router-dom';

const HomepageContentContainer = styled.div`
  margin: 0 auto;
  max-width: ${tokens.maxWidth.xl};
  overflow: auto;
  padding-top: ${tokens.navHeight.xl};
`
const VideoContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 400px;
  z-index: 0;
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
        <h2>
          Homepage
        </h2>
        <h2>
          Homepage
        </h2>
        <h2>
          Homepage
        </h2>
        <h2>
          Homepage
        </h2>
        <h2>
          Homepage
        </h2>
        <h2>
          Homepage
        </h2>
        <h2>
          Homepage
        </h2>
        <h2>
          Homepage
        </h2>
      </HomepageContentContainer>
      <VideoContainer
        id="iceberg-container"
      >
        <video
          autoPlay
          id="iceberg-video"
          loop
          muted
          playsInline
          height="100%"
          width="100%"
        >
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