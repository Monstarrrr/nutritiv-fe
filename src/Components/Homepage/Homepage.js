/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
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

const data = [
  { name: "Image 1", link: "/image1" },
  { name: "Image 2", link: "/image2" },
  { name: "Image 3", link: "/image3" },
  { name: "Image 4", link: "/image4" },
  { name: "Image 5", link: "/image5" },
  { name: "Image 6", link: "/image6" },
  { name: "Image 7", link: "/image7" },
  { name: "Image 8", link: "/image8" },
  { name: "Image 9", link: "/image9" },
  { name: "Image 10", link: "/image10" },
  { name: "Image 11", link: "/image11" },
]

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