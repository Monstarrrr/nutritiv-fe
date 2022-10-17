import { forwardRef, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { breakpoints, mediaQueries, tokens } from '../../Helpers/styleTokens';
import { useLocation } from 'react-router-dom';
import useWindowDimensions from '../../Helpers/useWindowDimensions';
import CanvasDefaultList from '../3D/CanvasDefaultList';
import { osName, isIOS } from "react-device-detect";
import { ShapesSection } from './ShapesSection';
import { IcebergSection } from './IcebergSection';
import { ArrowSection } from './ArrowSection';
import { CategoriesSection } from './CategoriesSection';
import { ReviewsSection } from './ReviewsSection';
import { ContactSection } from './ContactSection';
import { MachineSection } from './MachineSection';

const HomepageContentContainer = styled.div`
  margin: 0 auto;
  max-width: none;
  min-height: calc(100vh - ${tokens.navHeight.lg}); // temp
  overflow: auto;
  overflow-x: hidden;
  padding-top: ${tokens.navHeight.lg};
  position: relative;
  text-align: center;
  z-index: 1;
`
const ViewHeightWrapper = styled.div`
  margin: 0 auto;
  max-width: none;
  > div {
    margin-left: auto;
    margin-right: auto;
  }
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
const ImageContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 0;
  ${mediaQueries({
    // top: ["380px", "420px", "213px", "200px", "180px"],
    // left: ["-45%", "-40%", "-14%", "0",],
    // right: ["-45%", "-40%", "-17%", "-2%",]
    top: ["380px", "420px", "470px", "500px"],
    left: ["-45%", "-40%", "-10%", "0",],
    right: ["-45%", "-40%", "-10%", "0",]
  })}
`

export const SectionTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 68px;
`

const Video = styled(motion.video)`
  height: 100%;
  width: 100%;
`

const Homepage = forwardRef((props, ref) => {
  // Drei Canvas Refs //
  const refsNames = require("../../Helpers/canvasRefs.json");
  const refs = Object.fromEntries(refsNames.map((prop) => [prop, ref[prop]]));

  const videoRef = useRef();
  const discoverScrollRef = useRef(null);
  
  const icebergSectionRefs = { videoRef, discoverScrollRef };
  const shapesScrollRef = useRef(null);
  const shapesSectionRefs = { ...refs, shapesScrollRef };
  const arrowSectionRefs = { ...refs, shapesScrollRef, discoverScrollRef };
  
  const location = useLocation();
  const [icebergShadow, setIcebergShadow] = useState(false);
  const [isAppleDevice, setIsAppleDevice] = useState(true);
  
  const { width } = useWindowDimensions();
  
  useEffect(() => {
    if (osName === "Mac OS" || isIOS) {
      setIsAppleDevice(true);
    } else {
      setIsAppleDevice(false);
    }
  }, []); // temp -> add globaly to App.js
  
  useEffect(() => {
    if(width > breakpoints[2]) {
      videoRef.current && videoRef.current.play();
    } else {
      videoRef.current && videoRef.current.pause();
    }
  }, [width]);
  
  const icebergVariants = {
    shadow: {
      filter: `drop-shadow(0 0 4px ${tokens.color.accentStrong}`
    },
    default: {
      filter: `drop-shadow(0 0 1px ${tokens.color.transparent}`
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
  }, [location.hash]);
  
  return (
    <>
      <HomepageContentContainer>
        <ViewHeightWrapper>
          
          {/* NUTRITIV */}
          <IcebergSection 
            ref={icebergSectionRefs}
            setIcebergShadow={setIcebergShadow}
          />
          
          {/* EXPLANATION */}
          <ArrowSection ref={arrowSectionRefs}/>
          
          {/* SHAPES */}
          <ShapesSection ref={shapesSectionRefs}/>

          {/* CATEGORIES */}
          <CategoriesSection />

          {/* MACHINE */}
          <MachineSection />

          {/* REVIEWS */}
          <ReviewsSection />

          {/* CONTACT */}
          <ContactSection />

        </ViewHeightWrapper>
      </HomepageContentContainer>
      
      {isAppleDevice ? (
        <ImageContainer className="iceberg-container">
          <motion.img 
            animate={
              icebergShadow ? "shadow" : "default" 
            }
            alt="iceberg" 
            id='iceberg-image'
            src="https://nutritiv.s3.eu-west-3.amazonaws.com/assets/image-iceberg.png"
            style={{height: "100%", width: "100%"}} 
            variants={icebergVariants}
          />
        </ImageContainer>
      ) : (
        <VideoContainer className="iceberg-container">
          <Video
            animate={
              icebergShadow ? "shadow" : "default" 
            }
            autoPlay={true}
            id="iceberg-video"
            loop
            muted
            playsInline
            preload="auto"
            ref={videoRef}
            variants={icebergVariants}
            height="100%"
            width="100%"
          >
            <source src="https://nutritiv.s3.eu-west-3.amazonaws.com/assets/video_iceberg.mov" type='video/mp4; codecs="hvc1"'></source>
            <source src="https://nutritiv.s3.eu-west-3.amazonaws.com/assets/video_iceberg.webm" type="video/webm" />
          </Video>
        </VideoContainer>
      )}
    </>
  )
});

export default Homepage;