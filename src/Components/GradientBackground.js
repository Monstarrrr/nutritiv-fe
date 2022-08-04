import { motion } from 'framer-motion';
import styled from '@emotion/styled'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StyledBackground = styled(motion.div)`
  background-size: 100% 100%;
  bottom: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const GradientBackground = ({ ...props }) => {
  const { 
    firstColor, secondColor, initial, duration 
  } = props;
  
  const minimized = useSelector(state => state.modals.mobileNavMenu);
  const location = useLocation();
  const [homepage, setHomepage] = useState(false)
  
  const variants = {
    homepage: { 
      backgroundImage: `linear-gradient(180deg, ${firstColor} 0px, ${firstColor} 600px, ${secondColor} 1100px)`,
      transition: {
        duration: duration,
        ease: "easeOut"
      }
    },
    default: {
      backgroundImage: `linear-gradient(180deg, ${firstColor} 0px, ${firstColor} 0px, ${secondColor} 0px)`,
      transition: {
        duration: duration,
        ease: "easeOut"
      }
    },
    minimized: {
      backgroundImage: `linear-gradient(180deg, ${firstColor} 0px, ${firstColor} 0px, ${firstColor} 0px)`,
      transition: {
        duration: duration,
        ease: "easeOut"
      }
    }
  };
  
  useEffect(() => {
    setHomepage(location.pathname === "/welcome" && location.hash !== "menu")
  }, [location.hash, location.pathname]);
  
  return (
    <StyledBackground
      id="gradient-background"
      variants={variants}
      initial={initial}
      animate={homepage ? 'homepage' : 'default'}
    />
  )
}