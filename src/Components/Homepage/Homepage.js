/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { mediaQueries, tokens } from '../../Helpers/styleTokens';
import { useLocation, useNavigate } from 'react-router-dom';
import { NutriButton } from '../NutriButton';
import { css } from '@emotion/react';

const HomepageContentContainer = styled.div`
  margin: 0 auto;
  max-width: ${tokens.maxWidth.xl};
  min-height: calc(100vh - ${tokens.navHeight.lg}); // temp
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
  top: 500px;
  z-index: 0;
  ${mediaQueries({
    top: ["380px", "420px", "470px", "500px"],
    left: ["-45%", "-40%", "-10%", "0",],
    right: ["-45%", "-40%", "-10%", "0",]
  })}
`

const ViewHeightWrapper = styled.div`
  height: 1150px;
`

const FirstBlock = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`

const Video = styled(motion.video)`
  height: 100%;
  width: 100%;
`

export const Homepage = () => {
  const videoRef= useRef();
  const location = useLocation();
  const [icebergShadow, setIcebergShadow] = useState(false)
  
  const handleIcebergButtonEnter = () => {
    setIcebergShadow(true)
    videoRef.current.playbackRate = 2;
  }
  const handleIcebergButtonLeave = () => {
    setIcebergShadow(false)
    videoRef.current.playbackRate = 0.8;
  }
  
  const icebergVariants = {
    shadow: {
      filter: `blur(0.7px) opacity(0.65) drop-shadow(0 0 4px ${tokens.color.accentStrong}`
    },
    default: {
      filter: `blur(0.7px) opacity(0.65) drop-shadow(0 0 1px ${tokens.color.transparent}`
    },
    transition: {
      duration: 0.2,
    }
  }

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
        <ViewHeightWrapper>
          <FirstBlock>
            <h2
              css={css`
                margin-bottom: 0;
                margin-top: 114px;
                text-transform: uppercase;
                ${mediaQueries({
                  fontSize: ["64px", "74px", "94px", "104px", "112px"],
                  letterSpacing: ["4px", "8px", "12px", "14px", "14px"]
                })};
              `}
            >
              Nutritiv
            </h2>
            <h3
              css={css`
                font-weight: ${tokens.font.fontWeight.regular};
                line-height: 1.65;
                margin: ${tokens.spacing.sm} 0 0;
                text-transform: uppercase;
                letter-spacing: 4px;
                ${mediaQueries({
                  fontSize: ["14px", "20px", "20px", "20px", "20px"],
                })};
              `}
            >
              Get&nbsp;
              <span style={{fontWeight: tokens.font.fontWeight.bold}}>
                superformant
              </span>
              <br/>
              with our&nbsp;
              <span style={{fontWeight: tokens.font.fontWeight.bold}}>
                superments
              </span>
            </h3>
            <div
              onMouseEnter={() => handleIcebergButtonEnter()}
              onMouseLeave={() => handleIcebergButtonLeave()}
              style={{
                borderRadius: tokens.borderRadius.default,
                marginTop: "20px",
              }}
            >
              <NutriButton 
                label="Shop Now"
                type="filled"
                to="/shop"
              />
            </div>
          </FirstBlock>
        </ViewHeightWrapper>
      </HomepageContentContainer>
      <VideoContainer id="iceberg-container">
        <Video
          variants={icebergVariants}
          animate={
            icebergShadow ? "shadow" : "default" 
          }
          autoPlay
          id="iceberg-video"
          loop
          muted
          playsInline
          ref={videoRef}
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