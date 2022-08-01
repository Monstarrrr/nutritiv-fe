/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../Helpers/styleTokens';
import { css } from '@emotion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ContentContainer = styled.div`
  left: 0;
  margin: 0 auto;
  max-width: ${tokens.maxWidth.xl};
  position: absolute;
  right: 0;
  top: ${tokens.navHeight.xl};
`
const VideoContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 400px;
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
      <ContentContainer>
        <h2>
          Homepage
        </h2>
      </ContentContainer>
      <VideoContainer>
        <video width="100%" height="100%" autoPlay loop muted playsInline>
          <source src="/video_iceberg.webm" type="video/webm" />
        </video>
      </VideoContainer>

      <div 
        css={css`
          position: absolute;
          bottom: 0;
        `}
        id="contact"
      >
        Contact
      </div>
      
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