import { motion } from 'framer-motion';
import styled from '@emotion/styled'
import { tokens } from '../Helpers/styleTokens';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Background = styled(motion.div)`
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
    firstColor, secondColor, initial, exit, transition 
  } = props;

  const location = useLocation();
  const [homepage, setHomepage] = useState(false)
  
  const variants = {
    homepage: { 
      backgroundImage: "linear-gradient(180deg, rgba(20,122,165,1) 0px, rgba(20,122,165,1) 650px, rgba(2,0,71,1) 1250px)",
      transition: { 
        duration: 1 
      }
    },
    default: {
      backgroundImage: "linear-gradient(180deg, rgba(20,122,165,1) 0px, rgba(20,122,165,1) 0px, rgba(2,0,71,1) 0px)",
      transition: { 
        duration: 1
      } 
    }
  };
  
  useEffect(() => {
    setHomepage(location.pathname === "/welcome")
  }, [location.pathname]);
  
  console.log('# homepage :', homepage)
  
  return (
    <Background
      variants={variants}
      initial={false}
      animate={homepage ? 'homepage' : 'default'}
    />
  )
}